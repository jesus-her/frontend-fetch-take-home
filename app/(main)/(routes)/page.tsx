"use client";

import { useEffect, useMemo, useState } from "react";
import { DogsList } from "@/components/dogs-list";
import { Pagination, Skeleton, Spinner } from "@nextui-org/react";
import { useDogsStore } from "@/store/dogs-store";
import { useFilterStore } from "@/store/filters-store";
import Filters from "@/components/filters";

export default function Home() {
  const filterBreed = useFilterStore((state) => state.filterBreed);
  const fetchDogBreeds = useFilterStore((state) => state.fetchDogBreeds);

  const fetchDogs = useDogsStore((state) => state.fetchDogs);
  const dogs = useDogsStore((state) => state.dogs);
  const loading = useDogsStore((state) => state.loading);
  const currentPage = useDogsStore((state) => state.currentPage);
  const totalResults = useDogsStore((state) => state.totalResults);
  const resultsPeerPage = useDogsStore((state) => state.resultsPeerPage);

  const setCurrentPage = useDogsStore((state) => state.setCurrentPage);
  const {
    selectedOrder,
    setSelectedOrder,
    selectedSortBy,
    setSelectedSortBy,
    selectedBreed,
  } = useFilterStore();

  const [queryParams, setQueryParams] = useState("breed:asc");

  const selectedSortedByValue = useMemo(
    () => Array.from(selectedSortBy).join(", ").replaceAll("_", " "),
    [selectedSortBy]
  );
  const selectedOrderValue = useMemo(
    () => Array.from(selectedOrder).join(", ").replaceAll("_", " "),
    [selectedOrder]
  );

  const selectedBreedValue = useMemo(
    () => Array.from(selectedBreed).join(", ").replaceAll("_", " "),
    [selectedBreed]
  );

  const customQueryParams = useMemo(() => {
    return selectedSortedByValue && selectedOrderValue
      ? `${selectedSortedByValue}:${selectedOrderValue}`
      : "breed:asc";
  }, [selectedSortedByValue, selectedOrderValue]);

  const customBreedQueryParams = useMemo(() => {
    return selectedBreedValue ? `&breeds=${selectedBreedValue}` : "";
  }, [selectedBreedValue]);

  useEffect(() => {
    fetchDogs(customQueryParams.concat(customBreedQueryParams));
  }, [currentPage, resultsPeerPage, customQueryParams, customBreedQueryParams]);

  // const filteredDogs = useMemo(() => {
  //   return filterBreed !== null && filterBreed.length > 0
  //     ? dogs.filter((dog) =>
  //         dog.breed.toLowerCase().includes(filterBreed.toLowerCase())
  //       )
  //     : dogs;
  // }, [dogs, filterBreed]);

  // const sortedDogs = useMemo(() => {
  //   const orderFactor = selectedOrder.has("asc")
  //     ? 1
  //     : selectedOrder.has("desc")
  //     ? -1
  //     : 0;
  //   return selectedSortBy.has("name")
  //     ? filteredDogs.toSorted(
  //         (a, b) => a.name.localeCompare(b.name) * orderFactor
  //       )
  //     : selectedSortBy.has("age")
  //     ? filteredDogs.toSorted((a, b) => (a.age - b.age) * orderFactor)
  //     : filteredDogs;
  // }, [filteredDogs, selectedSortBy, selectedOrder]);

  // const chihuahuaDogs = dogs.filter((dog) => dog.breed === "Chihuahua");

  if (loading) {
    return (
      <section className=" w-full h-full flex flex-1 px-12 py-48 flex-col items-center justify-center ">
        <Spinner size="lg" label="Loading..." color="warning" />
      </section>
    );
  }

  return (
    <section>
      <Filters />

      <DogsList dogs={dogs} />

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
