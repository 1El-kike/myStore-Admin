import React, { useState } from "react";
import { FcOk } from "react-icons/fc";
import { Button, Modal, Spinner, Toast } from "flowbite-react";
import { HiExclamation } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

interface Type {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export const Loading: React.FC<Type> = ({ isLoading, error, success }) => {
  const [openModal, setOpenModal] = useState<null | boolean>(isLoading);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/"); // Redirige a la página principal
  };

 

  return (
    <div className=" ">
      {isLoading && (
        <div className="fixed bottom-10 right-5">
          <Spinner
            color="purple"
            size="xl"
            aria-label="Extra large spinner example"
          />
        </div>
      )}
      {error && (
        <div className="fixed top-10 right-10">
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
              <HiExclamation className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{error}</div>
            <Toast.Toggle />
          </Toast>
        </div>
      )}
      {success && (
        <>
         
          <Modal
            show={openModal as boolean}
            size="md"
            onClose={() => setOpenModal(false)}
            popup
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <FcOk className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Data were successfully aggregated. What you want to do next
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="success" onClick={handleClick}>
                    {"Back to top"}
                  </Button>
                  <Button color="gray" onClick={() => setOpenModal(false)}>
                    Keep adding
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  );
};
