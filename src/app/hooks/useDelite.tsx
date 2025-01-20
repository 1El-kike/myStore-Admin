/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAuth } from "../module/core/AuthContext";
import { useNavigate } from "react-router-dom";
import { port } from "../../config/env";

export interface messageUseEjecut {
    message: null | any,
    isLoadingmessage?: boolean,
    errors?: null | any ,
}
interface UseDeleteProps {
    url: string;
    id:number | null;
  }

export const useDelite = ( ) => {
  const [state, setState] = useState<messageUseEjecut>({
    message: null,
    isLoadingmessage: true,
    errors: null ,
  });

  const { user } = useAuth(); 

   const redirect = useNavigate()
   

  const { message, isLoadingmessage, errors } = state;

  const DeliteFetch = async ({url,id}:UseDeleteProps) => {

  

    try {
      const fullUrl = `/${url}${id}`;
      const response = await fetch(port + url + id,{
        method:"DELETE",
        headers: {
            "Authorization": `Bearer ${user?.token}`,
           },
      });
      const message = await response.json();
      setState({
        message,
        isLoadingmessage: false,
        errors: null,
      });
      redirect(fullUrl, {
        state: {datos: message },
    });
    } catch (error) {
      setState({
        message: null,
        isLoadingmessage: false,
        errors: error,
      });
    }
  };

 
  return {
    DeliteFetch,
    message,
    isLoadingmessage,
    errors,
  };
};