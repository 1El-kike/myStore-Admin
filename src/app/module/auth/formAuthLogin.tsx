import React from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaDiscord, FaGoogle } from "react-icons/fa6";
import { Submit } from "../widgets/Submit";
import { SignWithAuthCreated } from "./signWithAuthCreated";

interface FormAuths {
  input_iphone: string;
  password_input: string;
}

export const FormAuthLogin: React.FC<FormAuths> = ({
  input_iphone,
  password_input,
}) => {
  const { error, isLoading, onSubmit, success } = useAuth();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();



  return (
    <div className="w-full flex relative justify-end items-center h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full  lg:mx-28 z-10 max-w-lg rounded-3xl border py-5 backdrop-blur-lg px-8"
      >
        <SignWithAuthCreated sign="Sign in" link="/auth/registration" title="Sign Up" />
        <div key={input_iphone} className="w-full relative  mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
            htmlFor={`grid-first-${input_iphone}`}
          >
            {input_iphone}
          </label>
          <input
            className={`appearance-none block w-full bg-gray-50 text-gray-700 border rounded-lg py-3  px-4 mb-8 leading-tight focus:outline-none focus:bg-white ${errors[input_iphone] && "border-red-500"
              }`}
            id={`grid-first-${input_iphone}`}
            type="text"
            {...register(input_iphone, {
              required: "This field is required",
            })}
            placeholder="Jane"
          />
          {errors[input_iphone] && (
            <>
              <p className="text-white absolute -bottom-7 italic">
                {errors[input_iphone].message}
              </p>
              <span className="bg-red-500 w-72 blur-md rounded-xl absolute h-4 -mt-6 -z-10">
                {" "}
              </span>
            </>
          )}
        </div>
        <div key={password_input} className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full relative px-3">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor={`grid-${password_input}`}
            >
              {password_input}
            </label>
            <input
              className={`appearance-none block w-full bg-gray-50 text-gray-700 border rounded-lg py-3  px-4 mb-8 leading-tight focus:outline-none focus:bg-white ${errors[password_input] && "border-red-500"
                }`}
              id={`grid-${password_input}`}
              {...register(password_input, {
                required: "This field is required",
              })}
              type="password"
              placeholder="****************"
            />
            {errors[password_input] && (
              <>
                <p className="text-white absolute  -bottom-0 italic">
                  {errors[password_input].message}
                </p>
                <span className="bg-red-500 w-72 blur-md rounded-xl absolute h-4 -mt-6 -z-10">
                  {" "}
                </span>
              </>
            )}
          </div>
        </div>
        <Submit
          reset={reset}
          isLoading={isLoading}
          bottom2="Sign in"
          success={success}
          error={error}
        />
      </form>
    </div>
  );
};
