"use client";

import { useMemo } from "react";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import { useFilterStore } from "@/store/filters-store";
import { BsArrowDown, BsArrowUp, BsXCircleFill } from "react-icons/bs";
import SearchBarBreeds from "./searchbar-breeds";

export default function Filters() {
  const { selectedOrder, setSelectedOrder, selectedSortBy, setSelectedSortBy } =
    useFilterStore();

  const selectedOrderValue = useMemo(
    () => Array.from(selectedOrder).join(", ").replaceAll("_", " "),
    [selectedOrder]
  );

  const selectedSortedByValue = useMemo(
    () => Array.from(selectedSortBy).join(", ").replaceAll("_", " "),
    [selectedSortBy]
  );

  return (
    <div className=" flex flex-col gap-4 mt-6 mb-8">
      <div className=" flex flex-col lg:flex-row w-full gap-4 lg:gap-24 items-start ">
        <div className=" flex gap-2 w-full items-center">
          {/* Search bar to filter by breed */}
          <SearchBarBreeds />
        </div>
        <div className=" w-full flex flex-row lg:flex-row-reverse gap-2 items-center justify-start relative">
          <div className=" flex flex-row-reverse gap-2 lg:flex-row">
            {/* Order By*/}
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
                variant="flat"
                color="warning"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedOrder}
                onSelectionChange={setSelectedOrder}
              >
                <DropdownItem key="asc">
                  {selectedSortedByValue === "name" || "breed"
                    ? "A-Z"
                    : "Younger Age"}
                </DropdownItem>
                <DropdownItem key="desc">
                  {selectedSortedByValue === "name" || "breed"
                    ? "Z-A"
                    : "Older Age"}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {/* More Filters */}
            <Dropdown showArrow>
              <DropdownTrigger>
                <Button variant="bordered" className="capitalize w-28">
                  {selectedSortedByValue
                    ? selectedSortedByValue
                    : "More Filters"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                color="warning"
                aria-label="Single selection example"
                variant="flat"
                selectionMode="single"
                selectedKeys={selectedSortBy}
                onSelectionChange={setSelectedSortBy}
                defaultValue="breed"
              >
                <DropdownItem key="name">Name</DropdownItem>
                <DropdownItem key="age">Age</DropdownItem>
                <DropdownItem key="breed">Breed</DropdownItem>
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
