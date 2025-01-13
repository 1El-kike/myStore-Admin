import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  useDisclosure,
  useDraggable,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

interface TypeModal {
  title: string;
  text: string;
  children: any;
  onActionChange: ()=> void;
  className: string;
  onClick:()=> void;
  component?:any;
}

export const Modal_Component = ({
  title,
  text,
  children,
  onActionChange,
  className,
  onClick,
  component
}: any) => {
  const [isaction, setisaction] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const targetRef = React.useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

  return (
    <>
      <div
        className={className}
        onClick={() => {
          onOpen();
          onClick();
        }}
      >
        <Modal
          ref={targetRef}
          className="h-80 relative overflow-hidden flex justify-center"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader {...moveProps} className="flex flex-col gap-1">
                  {title}
                </ModalHeader>
                <ModalBody className="m-auto  flex justify-center">
                  <div className="absolute blur-3xl aspect-[700/500]  -z-40 inset-0">
                    <div className="w-full h-full bg-gradient-to-tl from-violet-500 to-teal-500 clip-modal  "></div>
                  </div>
                  <img
                    src="/store-logo/logoShop.jpg"
                    className="w-full opacity-10 absolute inset-0 blur-sm  -z-30 aspect-auto"
                    alt=""
                  />
                  <p className="text-center">{text}</p>
                  {component}
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    className=" relative inline-flex items-center justify-center px-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-purple-200 "
                    onPress={onClose}
                  >
                    <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                      Discard
                    </span>
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      onClose();
                      onActionChange(true);
                    }}
                  >
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        {children}
      </div>
    </>
  );
};
