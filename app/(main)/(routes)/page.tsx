"use client";

import { useEffect, useMemo } from "react";
import { DogsList } from "@/components/dogs-list";
import { Pagination, Progress } from "@nextui-org/react";
import { useDogsStore } from "@/store/dogs-store";
import { useFilterStore } from "@/store/filters-store";
import Filters from "@/components/filters";

export default function Home() {
  const fetchDogs = useDogsStore((state) => state.fetchDogs);
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
      <h1 className=" lg:text-5xl text-3xl font-semibold text-left w-full mt-4 mb-16">
        Help a Lucky Dog Find a New{" "}
        <span className=" relative text-secondary">
          <svg
            aria-hidden="true"
            width="159"
            height="11"
            viewBox="0 0 159 11"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -bottom-7 left-0 h-[0.58em] w-full fill-secondary/50"
            preserveAspectRatio="none"
          >
            <g clip-path="url(#clip0_6_2645)">
              <path d="M34.6052 2.23986C49.7085 1.91769 64.8201 1.71057 79.9316 1.61852C95.0431 1.52647 110.015 1.55716 125.052 1.7029C133.595 1.78728 142.145 1.90234 150.688 2.05576L151.847 0.483237C132.345 0.797741 112.851 1.18895 93.3577 1.65688C73.864 2.1248 54.3702 2.66943 34.8765 3.29844C23.9334 3.6513 12.9985 4.0195 2.05538 4.41838C1.41409 4.4414 0.452148 4.59481 0.0903915 5.1778C-0.246699 5.72243 0.378152 6.00625 0.896121 5.99091C21.212 5.50764 41.5443 5.46162 61.8685 5.8605C82.1926 6.25939 102.5 7.11085 122.783 8.39955C134.179 9.12062 145.566 9.98742 156.936 10.9923C157.553 11.046 158.572 10.7622 158.901 10.2329C159.263 9.65757 158.589 9.45813 158.096 9.41978C137.862 7.63247 117.579 6.2824 97.2794 5.37724C76.98 4.47208 56.6477 4.0195 36.3235 4.01183C24.9036 4.01183 13.4836 4.14223 2.06361 4.41838L0.904343 5.99091C20.3898 5.27752 39.8836 4.64851 59.3773 4.08854C78.871 3.53623 98.3647 3.05297 117.858 2.65409C128.802 2.43163 139.753 2.22452 150.696 2.04809C151.337 2.04042 152.307 1.86399 152.661 1.28868C153.015 0.713362 152.365 0.483237 151.855 0.475566C136.736 0.214757 121.632 0.0536689 106.521 0.0153147C91.4091 -0.0230396 76.4374 0.0459981 61.3998 0.237769C52.8574 0.345161 44.3068 0.490907 35.7645 0.675008C35.1232 0.69035 34.153 0.859108 33.7995 1.43442C33.4624 1.97905 34.0872 2.26287 34.6052 2.24753V2.23986Z"></path>
            </g>
            <defs>
              <clipPath id="clip0_6_2645">
                <rect width="159" height="11"></rect>
              </clipPath>
            </defs>
          </svg>
          Loving Home!
        </span>
      </h1>
      <Filters />

      {loading ? (
        <Progress
          size="sm"
          isIndeterminate
          aria-label="Loading..."
          className="max-w-md"
          color="warning"
        />
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
