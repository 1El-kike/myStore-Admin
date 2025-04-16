import React, { useEffect, useState } from "react";
import { FcOk } from "react-icons/fc";
import { Button, Modal, Spinner, Toast } from "flowbite-react";
import { HiExclamation } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

interface Type {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export const ProccesSend: React.FC<Type> = ({ isLoading, error, success }) => {
  const [openModal, setOpenModal] = useState<null | boolean>(true);
const [errors, setError] = useState<string | null>(error);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1); // Redirige a la página anterior
  };

  useEffect(() => {
  setOpenModal(success)
  }, [success])
  
  useEffect(() => {
    let timeoutId: any;
    if (error ) {
      setError(error)
      // Cierra automáticamente después de 5 segundos
      timeoutId = setTimeout(() => {
        setError(null)
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [error, setError]);
 
const handleSuccess = ()=>{
  setOpenModal(false)
 // window.location.reload()
}
  return (
    <div className="z-50 ">
      {isLoading && (
        <div className="fixed bottom-10 right-5">
          <Spinner
            color="purple"
            size="xl"
            aria-label="Extra large spinner example"
          />
        </div>
      )}
      {errors && (
        <div className="fixed top-10 right-10">
          <Toast className="animate-appearance-in " key={`${error}-${Date.now()}`}>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
              <HiExclamation className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{errors}</div>
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
                  <Button color="gray" onClick={handleSuccess }>
                    Keep Here
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
