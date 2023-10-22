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
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              🎉 {matchedDog?.name} 🎉
            </ModalHeader>
            <ModalBody>
              <Image
                src={matchedDog?.img}
                isBlurred
                width={200}
                height={200}
                alt="matched dog"
              />
              {matchedDog?.breed}
            </ModalBody>
            <ModalFooter>
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
