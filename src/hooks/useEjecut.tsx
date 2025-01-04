/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { port } from "../config/env";

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

  const getFetch = async () => {
    try {
      const response = await fetch(port + url);
      const data = await response.json();
      setState({
        data,
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