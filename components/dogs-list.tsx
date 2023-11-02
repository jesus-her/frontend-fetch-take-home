import { Dog } from "@/app/types";
import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  Image,
  Skeleton,
} from "@nextui-org/react";

import { BsGeoFill, BsHeartFill } from "react-icons/bs";
import { MatchedDogModal } from "./matched-dog-modal";
import { useDogsStore } from "@/store/dogs-store";

export function DogsList({ dogs }: { dogs: Dog[] }) {
  const loading = useDogsStore((state) => state.loading);
  const likedDogs = useDogsStore((state) => state.likedDogs);
  const locations = useDogsStore((state) => state.locations);
  const matchedDog = useDogsStore((state) => state.matchedDog);
  const toggleFavorite = useDogsStore((state) => state.toggleFavorite);
  const matchedModalOpen = useDogsStore((state) => state.matchedModalOpen);
  const setMatchedModalOpen = useDogsStore(
    (state) => state.setMatchedModalOpen
  );

  const handleCloseModal = () => {
    setMatchedModalOpen(!matchedModalOpen);
  };

  return (
    <div
      className="gap-2 my-6  grid grid-cols-1 sm:grid-cols-2
     lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 relative "
    >
      <MatchedDogModal
        isOpen={matchedModalOpen}
        onClose={handleCloseModal}
        matchedDog={matchedDog}
      />

      {dogs.map((dog: Dog) => (
        <Card
          shadow="sm"
          key={dog.id}
          isPressable={loading ? false : true}
          isDisabled={loading}
          onPress={() => toggleFavorite(dog.id)}
        >
          <Skeleton isLoaded={!loading} className=" w-full h-full shadow-none">
            <CardBody>
              <Image
                isBlurred
                src={dog.img}
                radius="sm"
                width="100%"
                height="100%"
                alt={dog.name}
                className="w-full object-cover h-[240px]"
              />
              <div
                className=" overflow-hidden w-full flex  justify-between
               items-center my-2"
              >
                <h2 className=" font-bold text-xl">{dog.name}</h2>

                <p className="text-default-500">{dog.age} years</p>
              </div>
              <b className=" opacity-50 font-medium w-full">{dog.breed}</b>

              <BsHeartFill
                className={`${
                  likedDogs.includes(dog.id)
                    ? "text-red-500"
                    : "text-black/80 dark:text-white/80"
                } text-2xl z-10 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 absolute top-4 right-4`}
              />
            </CardBody>
          </Skeleton>
          <Skeleton isLoaded={!loading} className=" w-full">
            <CardFooter className="text-small justify-between mb-4">
              {locations
                .filter((location) => location?.zip_code === dog?.zip_code)
                .map((location, index) => (
                  <Chip
                    key={index}
                    startContent={<BsGeoFill />}
                    variant="flat"
                    color="success"
                  >
                    <h2 className="font-semibold text-[12px]">
                      {location.city}, {location.state}
                    </h2>
                  </Chip>
                ))}
            </CardFooter>
          </Skeleton>
        </Card>
      ))}
    </div>
  );
}
