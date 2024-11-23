import { useFormContext } from "react-hook-form";
import { Loading } from "./Loading";
import { FormComponentSubmit } from "../interface/formComponentProp";

export const Submit: React.FC<FormComponentSubmit> = ({isLoading,success,error})=> {

  const { formState: { errors }  } = useFormContext();


  return (
    <div className="flex mb-44 w-full justify-between">
      <div>
        <button type="button" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-purple-200 ">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
            Discard
          </span>
        </button>
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Schedule
        </button>
        <button
          type="submit"
         
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Add Product
        </button>
         <Loading  isLoading = {isLoading} success={success} error={error}/> 
      </div>
    </div>
  );
};
