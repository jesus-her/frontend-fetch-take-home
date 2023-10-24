import { Dog } from "@/app/types";
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Confetti from "./confetti";

export function MatchedDogModal({
  isOpen,
  onClose,
  matchedDog,
}: {
  isOpen: boolean;
  onClose: () => void;
  matchedDog: Dog | undefined;
}) {
  return (
    <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
      <ModalContent className=" items-center">
        {(onClose) => (
          <>
            <Confetti />

            <ModalHeader className=" gap-1 text-2xl text-center">
              <h1>
                Congratulations! your new best friend is{" "}
                <span className=" text-secondary">{matchedDog?.name} </span>
                🥳
              </h1>
            </ModalHeader>
            <ModalBody className=" w-full flex flex-col items-center">
              <Image
                src={matchedDog?.img}
                isBlurred
                width={200}
                height={200}
                alt="matched dog"
              />
              <div className=" flex justify-between items-center opacity-50 gap-12">
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
