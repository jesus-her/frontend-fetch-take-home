"use client";

import { useMemo, useState } from "react";

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
import { BsXCircleFill } from "react-icons/bs";

export default function Filters() {
  const setFilterBreed = useFilterStore((state) => state.setFilterBreed);

  const currentPage = useDogsStore((state) => state.currentPage);
  const totalResults = useDogsStore((state) => state.totalResults);
  const setCurrentPage = useDogsStore((state) => state.setCurrentPage);

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
    <div className=" flex flex-col items-center gap-4 border border-yellow-400  ">
      <div className=" flex flex-col lg:flex-row w-full gap-4 border-2 border-t-green-600 items-center justify-center">
        <Input
          className="max-w-[420px] "
          placeholder="Filter By Breed"
          onChange={(e) => {
            setFilterBreed(e.target.value);
          }}
        />
        <div className=" w-fit flex gap-2 px-6 items-center border border-b-purple-800">
          {/* Filter  */}
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" className="capitalize">
                {selectedSortedByValue ? selectedSortedByValue : "More Filters"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Single selection example"
              variant="flat"
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
          {/* Order  */}
          <Dropdown>
            <DropdownTrigger>
              <Button
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
          {selectedSortedByValue && (
            <Button
              size="sm"
              color="danger"
              variant="flat"
              startContent={<BsXCircleFill />}
              onClick={() => setSelectedSortBy(new Set([""]))}
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>
      <Pagination
        total={totalResults}
        color="secondary"
        page={currentPage}
        onChange={setCurrentPage}
      />
    </div>
  );
}
