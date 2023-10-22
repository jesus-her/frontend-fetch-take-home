"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
} from "@nextui-org/react";

import { useDogsStore } from "@/store/dogs-store";
import { useFilterStore } from "@/store/filters-store";
import {
  BsArrowDown,
  BsArrowUp,
  BsSearch,
  BsXCircleFill,
} from "react-icons/bs";

export default function Filters() {
  const {
    selectedOrder,
    setSelectedOrder,
    selectedSortBy,
    setSelectedSortBy,
    selectedBreed,
    setSelectedBreed,
    availableBreeds,
    fetchDogBreeds,
    setFilterBreed,
  } = useFilterStore();

  const selectedOrderValue = useMemo(
    () => Array.from(selectedOrder).join(", ").replaceAll("_", " "),
    [selectedOrder]
  );

  const selectedSortedByValue = useMemo(
    () => Array.from(selectedSortBy).join(", ").replaceAll("_", " "),
    [selectedSortBy]
  );
  const selectedBreedValue = useMemo(
    () => Array.from(selectedBreed).join(", ").replaceAll("_", " "),
    [selectedBreed]
  );

  const selectedBreedArray = Array.from(selectedBreed);
  const selectedBreedString = selectedBreedArray.join(", ");

  const displayText =
    selectedBreedString.length > 15
      ? `${selectedBreedString.substring(0, 15)}...`
      : selectedBreedString;

  const selectedBreedTrim =
    selectedBreedValue !== "" ? displayText : "Select a Breed";

  const [searchTerm, setSearchTerm] = useState("");

  // Filtra la lista de razas en función del término de búsqueda
  const filteredBreeds = availableBreeds.filter((breed) =>
    breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchDogBreeds();
  }, []);

  return (
    <div className=" flex flex-col items-center gap-4 mt-6 mb-8">
      <div className=" flex flex-col lg:flex-row w-full gap-4 lg:gap-24 items-center justify-center">
        <div className=" flex gap-2 w-full items-center">
          {/* <Input
            className="max-w-[520px] "
            placeholder="Filter By Breed"
            // onChange={(e) => {
            //   setFilterBreed(e.target.value);
            // }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          /> */}
          <Input
            label="Search By Breed"
            isClearable
            radius="lg"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focused=true]:bg-default-200/50",
                "dark:group-data-[focused=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="Type to search..."
            startContent={
              <BsSearch className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
          <p className=" text-xs opacity-80"> or </p>
          {/* Breeds */}
          {availableBreeds && (
            <Dropdown shouldBlockScroll={true} showArrow>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  color="warning"
                  className="capitalize px-8 line-clamp-1"
                >
                  {selectedBreedTrim}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                variant="light"
                color="warning"
                // disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedBreed}
                onSelectionChange={setSelectedBreed}
                className="overflow-y-scroll max-h-96"
              >
                {availableBreeds?.map((breed: string) => (
                  <DropdownItem key={breed}>{breed}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
        <div className=" w-full flex flex-row lg:flex-row-reverse gap-2 items-center justify-start relative">
          <div className=" flex flex-row-reverse gap-2 lg:flex-row">
            {/* Order  */}
            <Dropdown showArrow>
              <DropdownTrigger>
                <Button
                  endContent={
                    selectedOrderValue === "asc" ? (
                      <BsArrowUp />
                    ) : (
                      <BsArrowDown />
                    )
                  }
                  isDisabled={!selectedSortedByValue}
                  variant="bordered"
                  className="capitalize"
                >
                  Order By
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                variant="shadow"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedOrder}
                onSelectionChange={setSelectedOrder}
              >
                <DropdownItem key="asc">
                  {selectedSortedByValue === "name" ? "A-Z" : "Younger Age"}
                </DropdownItem>
                <DropdownItem key="desc">
                  {selectedSortedByValue === "name" ? "Z-A" : "Older Age"}
                </DropdownItem>
                {/* <DropdownItem key="desc">Desc</DropdownItem> */}
              </DropdownMenu>
            </Dropdown>
            {/* Filter  */}
            <Dropdown showArrow>
              <DropdownTrigger>
                <Button variant="bordered" className="capitalize w-28">
                  {selectedSortedByValue
                    ? selectedSortedByValue
                    : "More Filters"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                variant="shadow"
                // disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedSortBy}
                onSelectionChange={setSelectedSortBy}
              >
                <DropdownItem key="name">Name</DropdownItem>
                {/* <DropdownItem key="breed">Breed</DropdownItem> */}
                <DropdownItem key="age">Age</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {selectedSortedByValue && (
            <Button
              size="sm"
              color="danger"
              variant="flat"
              startContent={<BsXCircleFill />}
              onClick={() => setSelectedSortBy(new Set([""]))}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      {/* <Pagination
        total={totalResults}
        color="secondary"
        page={currentPage}
        onChange={setCurrentPage}
      /> */}
    </div>
  );
}
