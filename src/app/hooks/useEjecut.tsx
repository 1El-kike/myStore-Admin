/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { port } from "../../config/env";
import axios from "axios";
import { useAuth } from "../module/auth/core/Auth";

export interface DataUseEjecut {
    data: null | any,
    isLoadingData?: boolean,
    errors?: null | any ,
}
interface UseEjecutProps {
    url: string;
    submit?:boolean
  }

export const useEjecut = ({ url,submit } :UseEjecutProps ) => {
  const [state, setState] = useState<DataUseEjecut>({
    data: null,
    isLoadingData: true,
    errors: null ,
  });

  const { data, isLoadingData, errors } = state;
  
  const { auth } = useAuth(); 


  const getFetch = async () => {
    try {
      const response = await axios.get(port + url, {
        headers: {
          Authorization: `Bearer ${auth?.api_token}` // O de cookies/contexto
        }
      });
      setState({
        data:response.data,
        isLoadingData: false,
        errors: null,
      });
    } catch (error) {
      setState({
        data: null,
        isLoadingData: false,
        errors: error,
      });
    }
  };

  useEffect(() => {
    if (!url) return;
    getFetch();
    if (submit) {
      getFetch()
    }
  }, [url,submit ]);

  return {
    data,
    isLoadingData,
    errors,
  };
};