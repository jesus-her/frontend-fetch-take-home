import { Dog, Location } from "@/app/types";
import { create } from "zustand";
import { useFilterStore } from "./filters-store";

interface State {
  // loading
  loading: boolean;
  // all dogs
  dogs: Dog[];
  fetchDogs: (params: string) => Promise<void>;

  // liked dogs ids
  likedDogs: string[];
  myLikedDogs: Dog[];
  toggleFavorite: (dogId: string) => void;
  fetchLikedDogs: () => Promise<void>;

  // zip_codes
  locations: Location[];
  postLocations: (zipCodesArr: string[]) => Promise<void>;
  // matched dog
  matchedDog: Dog | undefined; // Perro coincidente
  handleMatch: () => Promise<void>; // Función para encontrar un "match"
  matchedModalOpen: boolean;
  setMatchedModalOpen: (value: boolean) => void;

  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalResults: number;
  resultsPeerPage: number;
  setTotalResults: (results: number) => void;
}

export const useDogsStore = create<State>((set, get) => {
  //   const router = useRouter();

  return {
    loading: false,
    dogs: [],
    likedDogs: [],
    locations: [],
    myLikedDogs: [],
    resultsPeerPage: 25,
    matchedModalOpen: false,
    setMatchedModalOpen: (isOpen: boolean) => set({ matchedModalOpen: isOpen }),
    toggleFavorite: (dogId: string) => {
      set((state) => {
        if (state.likedDogs.includes(dogId)) {
          return { likedDogs: state.likedDogs.filter((id) => id !== dogId) };
        } else {
          return { likedDogs: [...state.likedDogs, dogId] };
        }
      });
    },

    currentPage: 1,
    totalResults: 25,
    // setCurrentPage: (page) => set({ currentPage: page }),
    setCurrentPage: (page) => {
      set({ currentPage: page });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    setTotalResults: (results) => set({ totalResults: results }),
    fetchDogs: async (params) => {
      set({ loading: true });
      try {
        const response = await fetch(
          `https://frontend-take-home-service.fetch.com/dogs/search?size=${
            get().resultsPeerPage
          }&from=${
            (get().currentPage - 1) * get().resultsPeerPage
          }&sort=${params}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          set({ loading: false });

          set({ totalResults: Math.round(data.total / get().resultsPeerPage) });

          const postResponse = await fetch(
            "https://frontend-take-home-service.fetch.com/dogs",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(data.resultIds),
            }
          );

          if (postResponse.ok) {
            const dogDetails = await postResponse.json();
            set({ dogs: dogDetails });
            const zipCodes = dogDetails.map(
              (dog: { zip_code: string }) => dog.zip_code
            );
            const locationsResponse = await fetch(
              "https://frontend-take-home-service.fetch.com/locations",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(zipCodes),
              }
            );

            const locationsData = await locationsResponse.json();
            set({ locations: locationsData });

            set({ loading: false });
          } else {
            console.error("Error en la solicitud POST /dogs");
            set({ loading: false });
          }
        } else {
          window.location.replace("/login");
        }
      } catch (error) {
        console.error(error);
      }
    },

    //likes dogs
    fetchLikedDogs: async () => {
      set({ loading: true });
      try {
        const postResponse = await fetch(
          "https://frontend-take-home-service.fetch.com/dogs",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(get().likedDogs), // Usamos la lista de perros favoritos
          }
        );

        if (postResponse.ok) {
          const dogDetails = await postResponse.json();
          set({ myLikedDogs: dogDetails });
          set({ loading: false });
        } else {
          console.error("Error en la solicitud POST /dogs");
          set({ loading: false });
          window.location.replace("/login");

          // set({ isSessionExpired: true });
        }
      } catch (error) {
        console.log(error);
      }
    },

    //matched dog
    matchedDog: undefined,
    handleMatch: async () => {
      try {
        const response = await fetch(
          "https://frontend-take-home-service.fetch.com/dogs/match",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(get().likedDogs), // Usamos la lista de perros favoritos
          }
        );

        if (response.ok) {
          const data = await response.json();

          // Realizar una solicitud POST para obtener detalles del perro coincidente
          const postResponse = await fetch(
            "https://frontend-take-home-service.fetch.com/dogs",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify([data.match]), // Envía un array con un solo ID de perro
            }
          );

          if (postResponse.ok) {
            const dogDetails = await postResponse.json();
            set({ matchedDog: dogDetails[0], matchedModalOpen: true });
            // handleOpen();
            // Puedes agregar más lógica aquí si es necesario
          } else {
            // window.location.replace("/login");

            // Manejar errores de la solicitud POST
            throw new Error("Error en la solicitud POST /dogs");
          }
        } else {
          window.location.replace("/login");

          // Manejar errores de inicio de sesión
          throw new Error("Error en la solicitud POST /dogs/match");
        }
      } catch (error) {
        // window.location.replace("/login");

        // Manejar errores de conexión
        console.error(error);
      }
    },
    postLocations: async (zipCodesArr: string[]) => {
      console.log("ZIPSSS:", zipCodesArr);

      set({ loading: true });
      try {
        const postResponse = await fetch(
          "https://frontend-take-home-service.fetch.com/locations",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(zipCodesArr),
          }
        );

        if (postResponse.ok) {
          const locations = await postResponse.json();
          // set({ myLikedDogs: dogDetails });
          console.log(locations);

          set({ loading: false });
        } else {
          console.error("Error en la solicitud POST /dogs");
          set({ loading: false });
          window.location.replace("/login");

          // set({ isSessionExpired: true });
        }
      } catch (error) {
        console.log(error);
      }
    },
  };
});
