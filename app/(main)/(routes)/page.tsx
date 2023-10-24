"use client";

import { useEffect, useMemo } from "react";
import { DogsList } from "@/components/dogs-list";
import { Pagination, Spinner } from "@nextui-org/react";
import { useDogsStore } from "@/store/dogs-store";
import { useFilterStore } from "@/store/filters-store";
import Filters from "@/components/filters";

export default function Home() {
  const fetchDogs = useDogsStore((state) => state.fetchDogs);
  // const postLocations = useDogsStore((state) => state.postLocations);
  const dogs = useDogsStore((state) => state.dogs);
  const loading = useDogsStore((state) => state.loading);
  const currentPage = useDogsStore((state) => state.currentPage);
  const totalResults = useDogsStore((state) => state.totalResults);
  const resultsPeerPage = useDogsStore((state) => state.resultsPeerPage);

  const setCurrentPage = useDogsStore((state) => state.setCurrentPage);
  const { selectedOrder, selectedSortBy, selectedBreed } = useFilterStore();

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

  // if (loading) {
  //   return (
  //     <section className=" w-full h-full flex flex-1 px-12 py-48 flex-col items-center justify-center ">
  //       <Spinner size="lg" label="Loading..." color="warning" />
  //     </section>
  //   );
  // }

  return (
    <section>
      <h1 className=" lg:text-5xl text-3xl font-semibold text-left w-full mt-4 mb-8">
        Help a lucky dog find a new loving home 🐾
      </h1>
      <Filters />

      {loading ? (
        <p className=" text-xs opacity-70">Loading ...</p>
      ) : (
        <p className=" text-xs opacity-70">
          About {totalResults * resultsPeerPage} results found
        </p>
      )}

      <DogsList dogs={dogs} />

      <div className="w-full flex items-center justify-center">
        <Pagination
          showControls
          isCompact
          total={totalResults}
          page={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </section>
  );
}
