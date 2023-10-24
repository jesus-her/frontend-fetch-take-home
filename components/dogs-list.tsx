import { Dog } from "@/app/types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Skeleton,
} from "@nextui-org/react";

import { BsHeartFill } from "react-icons/bs";
import { MatchedDogModal } from "./matched-dog-modal";
import { useDogsStore } from "@/store/dogs-store";

export function DogsList({ dogs }: { dogs: Dog[] }) {
  const loading = useDogsStore((state) => state.loading);
  const resultsPeerPage = useDogsStore((state) => state.resultsPeerPage);
  const likedDogs = useDogsStore((state) => state.likedDogs);
  const matchedDog = useDogsStore((state) => state.matchedDog);
  const toggleFavorite = useDogsStore((state) => state.toggleFavorite);
  const handleMatch = useDogsStore((state) => state.handleMatch);
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
          <Skeleton isLoaded={!loading} className=" w-full shadow-none">
            <CardBody>
              <Image
                isBlurred
                src={dog.img}
                // shadow="sm"
                radius="sm"
                width="100%"
                height="100%"
                alt={dog.name}
                className="w-full object-cover h-[240px] "
              />

              <h2 className=" font-bold text-xl mt-2">{dog.name}</h2>

              {/* <h2>{dog.zip_code}</h2> */}
              <BsHeartFill
                className={`${
                  likedDogs.includes(dog.id)
                    ? "text-red-500"
                    : "text-black/80 dark:text-white/80"
                } text-2xl z-10 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 absolute top-4 right-4`}
              />

              {/* <Button
                isIconOnly
                disabled
                className=" z-10 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 absolute top-3 right-3"
                radius="full"
                variant="light"
                onPress={() => toggleFavorite(dog.id)}
              >
                <BsHeartFill
                  className={`${
                    likedDogs.includes(dog.id)
                      ? "text-red-500"
                      : "text-black/80 dark:text-white/80"
                  } text-2xl`}
                />
              </Button> */}
            </CardBody>
          </Skeleton>
          <Skeleton isLoaded={!loading} className=" w-full">
            <CardFooter className="text-small justify-between">
              <b className=" opacity-50">{dog.breed}</b>

              <p className="text-default-500">{dog.age} years</p>
            </CardFooter>
          </Skeleton>
        </Card>
      ))}
    </div>
  );
}
