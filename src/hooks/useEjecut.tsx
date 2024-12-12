/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { port } from "../config/env";

interface Data {
    data: null | any,
    isLoading: boolean,
    errors: null | any ,
}
interface UseEjecutProps {
    url: string;
  }

export const useEjecut = ({ url } :UseEjecutProps ) => {
  const [state, setState] = useState<Data>({
    data: null,
    isLoading: true,
    errors: null ,
  });

  const { data, isLoading, errors } = state;

  const getFetch = async () => {
    try {
      const response = await fetch(port + url);
      const data = await response.json();
      setState({
        data,
        isLoading: false,
        errors: null,
      });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        errors: error,
      });
    }
  };

  useEffect(() => {
    if (!url) return;
    getFetch();
  }, [url]);

  return {
    data,
    isLoading,
    errors,
  };
};