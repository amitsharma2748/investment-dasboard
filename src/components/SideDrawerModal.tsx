import {
  Button,
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Portal,
} from "@chakra-ui/react"; // Use @chakra-ui/react
import { ForwardedRef, ReactNode, forwardRef } from "react";

type SideModalPropsType = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  children: ReactNode;
};

const SideModal = forwardRef(
  (
    { title, isOpen, onClose, onSave, children }: SideModalPropsType,
    ref: ForwardedRef<HTMLDivElement>
  ) => { 

    return (
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose} 
      >
        <Portal>
          <DrawerOverlay />
          <DrawerContent ref={ref}>
            <DrawerHeader>{title}</DrawerHeader>
            <DrawerBody>{children}</DrawerBody>
            <DrawerFooter>
              <Button variant="outline" onClick={onClose} mr={3}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={onSave}>
                Save
              </Button>
            </DrawerFooter>
            <CloseButton
              size="sm"
              onClick={onClose}
              position="absolute"
              top="8px"
              right="8px"
            /> {/* Replaced DrawerCloseTrigger */}
          </DrawerContent>
        </Portal>
      </Drawer>
    );
  }
);

SideModal.displayName = "SideModal";

export default SideModal;