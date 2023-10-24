import { Dog } from "@/app/types";
import {
  Button,
  Chip,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Confetti from "./confetti";
import { useDogsStore } from "@/store/dogs-store";
import { BsGeoFill } from "react-icons/bs";

export function MatchedDogModal({
  isOpen,
  onClose,
  matchedDog,
}: {
  isOpen: boolean;
  onClose: () => void;
  matchedDog: Dog | undefined;
}) {
  const locations = useDogsStore((state) => state.locations);
  return (
    <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
      <ModalContent className=" items-center">
        {(onClose) => (
          <>
            <Confetti />

            <ModalHeader className=" gap-1 text-2xl max-w-xs text-center ">
              <h1>
                Congratulations! your new best friend is{" "}
                <span className=" text-secondary">{matchedDog?.name} </span>
                🥳
              </h1>
            </ModalHeader>
            <ModalBody className=" w-full flex flex-col items-center">
              {locations
                .filter(
                  (location) => location?.zip_code === matchedDog?.zip_code
                )
                .map((location, index) => (
                  <Chip
                    startContent={<BsGeoFill />}
                    variant="flat"
                    color="success"
                  >
                    <h2 key={index} className="font-semibold text-xs">
                      {location.county}, {location.city}, {location.state}{" "}
                      {location.zip_code}
                    </h2>
                  </Chip>
                ))}
              <Image
                src={matchedDog?.img}
                isBlurred
                width={250}
                height={250}
                alt="matched dog"
                className=" aspect-square object-cover"
              />
              <div className=" flex justify-between items-center opacity-70 gap-12">
                <p>{matchedDog?.breed}</p>
                <p>{matchedDog?.age} years</p>
              </div>
            </ModalBody>
            <ModalFooter className=" self-end flex">
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
