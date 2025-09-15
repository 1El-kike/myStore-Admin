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
import { PUBLIC_URL } from "../../../config/env";

interface Background {
  opacity: string;
  from: string;
  to: string;
}
interface TypeModal {
  title: string;
  children: React.ReactNode;
  onDiscardChange?: () => any
  onActionChange?: (is: any) => any;
  className: string;
  onClick?: () => void;
  component?: any;
  // background:Background;
  footer?: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full"
  scroll?: undefined | "normal" | "inside" | "outside"
  isAlert?: 'yes' | 'no';
}

export const Modal_Component = ({
  title,
  children,
  //background,
  onActionChange,
  className,
  onClick,
  footer,
  scroll = undefined,
  component,
  onDiscardChange,
  size = 'md',
  isAlert
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
          className="overflow-hidden relative"
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
                <ModalBody className="flex justify-start m-auto w-full">
                  <div className="-z-40 absolute blur-3xl inset-0">
                    <div className={`w-full h-full opacity-30 bg-gradient-to-tl from-teal-500 to-rose-600 clip-modal `}></div>
                  </div>
                  <div className="w-full absolute">
                    {/*  <img
                      src={`${PUBLIC_URL}store-logo/logoShop.jpg`}
                      className="-z-50 aspect-auto blur-sm inset-0 opacity-10"
                      alt=""
                    /> */}
                  </div>
                  {component}
                </ModalBody>
                <ModalFooter className="flex flex-col">
                  {isAlert == 'no' && footer}
                  {(
                    <>
                      <div className="flex justify-end w-full">

                        <Button
                          color="danger"
                          className="bg-gradient-to-br justify-center rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-4 focus:ring-purple-200 font-medium from-purple-500 group group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white inline-flex items-center mb-2 me-2 overflow-hidden px-0.5 relative to-pink-500"
                          onPress={() => {
                            onClose()
                            onDiscardChange && onDiscardChange()
                          }}
                        >
                          <span className="bg-white rounded-md duration-75 ease-in group-hover:bg-opacity-0 px-5 py-2 relative transition-all">
                            Discard
                          </span>
                        </Button>
                        <Button
                          color="primary"
                          onPress={() => {
                            if (onActionChange) {
                              const isValid = onActionChange(onClose); // Pasamos la función de cierre
                              if (isValid) {
                                onClose();
                              }
                            }
                          }}
                        >
                          Action
                        </Button>
                      </div>
                    </>
                  )}
                  {isAlert == 'yes' && footer}
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
