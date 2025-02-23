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
  children: React.ReactNode;
  onDiscardChange?:()=> any
  onActionChange?: (is:any) => any;
  className: string;
  onClick?: () => void;
  component?: any;
  footer?:React.ReactNode
  size? : 'xs'| 'sm'| 'md'|'lg'| "xl"| "2xl"| "3xl" | "4xl" | "5xl" | "full"
  scroll?:  undefined | "normal" | "inside" | "outside"
}

export const Modal_Component = ({
  title,
  children,
  onActionChange,
  className,
  onClick,
  footer,
  scroll = undefined,
  component,
  onDiscardChange,
  size = 'md'
}: TypeModal) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const targetRef = React.useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

  return (
    <>
      <div
      className={className}
        onClick={() => {
          onOpen();
         onClick && onClick();
        }}
      >
        <Modal
          ref={targetRef}
          backdrop="blur"
          size={size}
          className="relative overflow-hidden"
          isOpen={isOpen}
          scrollBehavior={scroll}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader {...moveProps} className="flex flex-col gap-1">
                  {title}
                </ModalHeader>
                <ModalBody className="m-auto w-full   flex justify-start">
                <div className="absolute blur-3xl -z-40 inset-0">
                    <div className="w-full h-full opacity-50 bg-gradient-to-tl from-violet-500 to-teal-500 clip-modal  "></div>
                  </div>
                  <div className="w-full absolute">

                  <img
                    src="/store-logo/logoShop.jpg"
                    className=" opacity-10 inset-0 blur-sm  -z-30 aspect-auto"
                    alt=""
                    />
                    </div>
                  {component}
                </ModalBody>
                <ModalFooter>
                  {!footer ? (
                    <>
                      <Button
                        color="danger"
                        className=" relative inline-flex items-center justify-center px-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-purple-200 "
                        onPress={() => {
                          onClose()
                          onDiscardChange &&  onDiscardChange()
                        }}
                      >
                        <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                          Discard
                        </span>
                      </Button>
                      <Button
                        color="primary"
                        onPress={() => {
                          onClose();
                         onActionChange && onActionChange(true) ;
                        }}
                      >
                        Action
                      </Button>
                    </>
                  ) : (
                    footer
                  )}
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
