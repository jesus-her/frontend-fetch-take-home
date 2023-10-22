import { Dog } from "@/app/types";
import { create } from "zustand";

interface FilterState {
  filterBreed: string | null;
  setFilterBreed: (value: string | null) => void;

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

  selectedOrder: new Set(["asc"]),
  setSelectedOrder: (value: any) => set({ selectedOrder: value }),

  selectedSortBy: new Set(["name"]),
  setSelectedSortBy: (value: any) => set({ selectedSortBy: value }),
}));
