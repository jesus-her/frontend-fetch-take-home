"use client";

import { useEffect, useMemo, useState } from "react";
import { DogsList } from "@/components/dogs-list";
import { Pagination } from "@nextui-org/react";
import { useDogsStore } from "@/store/dogs-store";
import { useFilterStore } from "@/store/filters-store";
import Filters from "@/components/filters";

export default function Home() {
  const filterBreed = useFilterStore((state) => state.filterBreed);

  const fetchDogs = useDogsStore((state) => state.fetchDogs);
  const dogs = useDogsStore((state) => state.dogs);
  const currentPage = useDogsStore((state) => state.currentPage);
  const totalResults = useDogsStore((state) => state.totalResults);
  const resultsPeerPage = useDogsStore((state) => state.resultsPeerPage);

  const setCurrentPage = useDogsStore((state) => state.setCurrentPage);

  useEffect(() => {
    fetchDogs();
  }, [currentPage, resultsPeerPage]); // Actualiza la llamada a la API cuando cambian currentPage o resultsPerPage

  const { selectedOrder, setSelectedOrder, selectedSortBy, setSelectedSortBy } =
    useFilterStore();

  const filteredDogs = useMemo(() => {
    return filterBreed !== null && filterBreed.length > 0
      ? dogs.filter((dog) =>
          dog.breed.toLowerCase().includes(filterBreed.toLowerCase())
        )
      : dogs;
  }, [dogs, filterBreed]);

  const sortedDogs = useMemo(() => {
    const orderFactor = selectedOrder.has("asc")
      ? 1
      : selectedOrder.has("desc")
      ? -1
      : 0;
    return selectedSortBy.has("name")
      ? filteredDogs.toSorted(
          (a, b) => a.name.localeCompare(b.name) * orderFactor
        )
      : selectedSortBy.has("age")
      ? filteredDogs.toSorted((a, b) => (a.age - b.age) * orderFactor)
      : filteredDogs;
  }, [filteredDogs, selectedSortBy, selectedOrder]);

  console.log(dogs);

  return (
    <section>
      <Filters />

      <DogsList dogs={sortedDogs} />

      <div className="w-full flex items-center justify-center">
        <Pagination
          total={totalResults}
          page={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </section>
  );
}
