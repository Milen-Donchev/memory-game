import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

const ConfirmResetModal = (props) => {
  const { isOpen, onClose, onConfirm } = props;

  const ref = useRef();

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={ref} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="md" fontWeight="bold">
            Reset game
          </AlertDialogHeader>

          <AlertDialogBody fontSize="sm">
            Are you sure you want to reset the game. Your progress will be lost!
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button size="sm" ref={ref} onClick={onClose}>
              Cancel
            </Button>
            <Button size="sm" colorScheme="red" onClick={onConfirm} ml={3}>
              Reset
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmResetModal;
