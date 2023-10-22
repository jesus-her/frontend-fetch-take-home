import { Dog } from "@/app/types";
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
    myLikedDogs: [],
    resultsPeerPage: 10,
    matchedModalOpen: false,
    setMatchedModalOpen: (isOpen: boolean) => set({ matchedModalOpen: isOpen }),
    toggleFavorite: (dogId: string) => {
      set((state) => {
        if (state.likedDogs.includes(dogId)) {
          // Si el perro ya está en favoritos, quítalo
          return { likedDogs: state.likedDogs.filter((id) => id !== dogId) };
        } else {
          // Si el perro no está en favoritos, agrégalo
          return { likedDogs: [...state.likedDogs, dogId] };
        }
      });
    },

    currentPage: 1,
    totalResults: 25,
    // setCurrentPage: (page) => set({ currentPage: page }),
    setCurrentPage: (page) => {
      set({ currentPage: page });

      // Realiza un desplazamiento suave hacia la parte superior después de actualizar currentPage
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    setTotalResults: (results) => set({ totalResults: results }),
    fetchDogs: async (params) => {
      set({ loading: true });
      try {
        // Realizar la solicitud para obtener los datos de los perros desde la API
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

          set({ totalResults: data.total / get().resultsPeerPage });

          // Realizar una solicitud POST para obtener detalles de perros (esto es opcional)
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
            set({ loading: false });
          } else {
            console.error("Error en la solicitud POST /dogs");
            set({ loading: false });
          }
        } else {
          // Manejar errores de la solicitud GET
          window.location.replace("/login");
        }
      } catch (error) {
        // Manejar errores de conexión
        console.error(error);
        // router.push("/login");
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
  };
});
