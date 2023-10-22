import { Dog } from "@/app/types";
import { create } from "zustand";

interface FilterState {
  filterBreed: string | null;
  setFilterBreed: (value: string | null) => void;

  // filter Breeds on select
  availableBreeds: string[];
  selectedBreed: Set<string>;
  setSelectedBreed: (value: any) => void;
  fetchDogBreeds: () => Promise<void>;

  // filter order
  selectedOrder: Set<string>;
  setSelectedOrder: (value: any) => void;

  // filter sortedBy
  selectedSortBy: Set<string>;
  setSelectedSortBy: (value: any) => void;

  //   // by breed
  //   sortByBreed: boolean;
  //   setSortByBreed: (value: boolean) => void;

  //   // by name
  //   sortByName: boolean;
  //   setSortByName: (value: boolean) => void;

  //   // by age
  //   sortByAge: boolean;
  //   setSortByAge: (value: boolean) => void;

  filteredDogs: Dog[];
  setFilteredDogs: (dogs: Dog[]) => void;
  sortedDogs: Dog[];
  setSortedDogs: (dogs: Dog[]) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  filterBreed: null,
  setFilterBreed: (value) => set({ filterBreed: value }),
  availableBreeds: [],

  //   // by breed
  //   sortByBreed: false,
  //   setSortByBreed: (value) => set({ sortByBreed: value }),

  //   // by name
  //   sortByName: false,
  //   setSortByName: (value) => set({ sortByName: value }),

  //   //by age
  //   sortByAge: false,
  //   setSortByAge: (value) => set({ sortByAge: value }),

  filteredDogs: [],
  setFilteredDogs: (dogs) => set({ filteredDogs: dogs }),

  sortedDogs: [],
  setSortedDogs: (dogs) => set({ sortedDogs: dogs }),

  selectedBreed: new Set([""]),
  setSelectedBreed: (value: any) => set({ selectedBreed: value }),

  selectedOrder: new Set(["asc"]),
  setSelectedOrder: (value: any) => set({ selectedOrder: value }),

  selectedSortBy: new Set([""]),
  setSelectedSortBy: (value: any) => set({ selectedSortBy: value }),

  fetchDogBreeds: async () => {
    // set({ loading: true });
    try {
      const postResponse = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs/breeds",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (postResponse.ok) {
        const dogBreeds = await postResponse.json();
        // console.log("BREEED", dogBreeds);

        set({ availableBreeds: dogBreeds });
        // set({ loading: false });
      } else {
        console.error("Error en la solicitud POST /dogs");
        // set({ loading: false });

        // set({ isSessionExpired: true });
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
