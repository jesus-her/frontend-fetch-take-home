import { useMemo, useState } from "react";
import { Button, Input, Listbox, ListboxItem } from "@nextui-org/react";
import { useFilterStore } from "@/store/filters-store";
import { BsSearch, BsXCircleFill } from "react-icons/bs";

export default function SearchBarBreeds() {
  const { selectedBreed, setSelectedBreed, availableBreeds } = useFilterStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>(availableBreeds);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const selectedBreedValue = useMemo(
    () => Array.from(selectedBreed).join(", ").replaceAll("_", " "),
    [selectedBreed]
  );

  const handleSearch = (e: any) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredResults = availableBreeds.filter((breed) =>
      breed.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(filteredResults);
    setIsDropdownVisible(true);
  };

  const handleBlur = () => {
    setIsDropdownVisible(false);
  };

  return (
    <div className="relative flex flex-col gap-2 w-full">
      <Input
        isDisabled={!availableBreeds}
        label="Search By Breed"
        radius="lg"
        className="relative"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Type to search..."
        startContent={
          <BsSearch className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
        onFocus={() => setIsDropdownVisible(true)} // Mostrar la lista cuando el input obtiene el foco
        onBlur={handleBlur} // Ocultar la lista cuando el input pierde el foco
      />

      {isDropdownVisible && (
        <div
          onFocus={() => setIsDropdownVisible(true)}
          className="w-full border-small px-1 py-2 rounded-small h-fit
           max-h-[26rem] shadow-md overflow-y-scroll absolute top-16 z-[99]
            dark:bg-black bg-white border-default-200 dark:border-default-100"
        >
          <Listbox
            aria-label="Single selection example"
            variant="flat"
            color="warning"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedBreed}
            onSelectionChange={(selected) => {
              setSelectedBreed(selected);
              setIsDropdownVisible(false); // Ocultar la lista cuando se selecciona un elemento
            }}
          >
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <ListboxItem key={result}>{result}</ListboxItem>
              ))
            ) : (
              <ListboxItem isReadOnly color="danger" key="not-found">
                No results found.
              </ListboxItem>
            )}
          </Listbox>
        </div>
      )}
      <div className={` ${selectedBreedValue ? "block" : "hidden"}`}>
        {selectedBreedValue && (
          <Button
            size="sm"
            color="warning"
            variant="flat"
            endContent={<BsXCircleFill />}
            onClick={() => setSelectedBreed(new Set([""]))}
          >
            {selectedBreedValue}
          </Button>
        )}
      </div>
    </div>
  );
}
