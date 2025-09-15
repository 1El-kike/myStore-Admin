import React, { Component, ComponentProps, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Submit } from "../widgets/Submit";
import { SignWithAuthCreated } from "./signWithAuthCreated";

interface FormAuths {
  first_input: string;
  second_input: string;
  three_input: string;
  number_input: string;
  input5: string;
}

const role = {
  roles: [
    { role: "" },
    { role: "SuperAdmin" },
    { role: "Administrador" },
    { role: "Client" },
  ],
};

export const FormAuth: React.FC<FormAuths> = ({
  first_input,
  second_input,
  three_input,
  number_input,
  input5,
}) => {


  // const {saveAuth, setCurrentUser} = useAuth()

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { error, isLoading, onSubmit, success } = useAuth();

  return (
    <div className="w-full flex relative justify-start items-center h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:ml-20 ml-3 z-10 max-w-lg rounded-3xl border py-5 backdrop-blur-lg px-8"
      >
        <SignWithAuthCreated sign="Sign up" link="/auth/login" title="Sign in" />
        <div className="flex flex-wrap -mx-3 mb-6">
          {[
            [first_input, "text"],
            [second_input, "number"],
          ].map((element: string[], index) => {
            return (
              <>
                <div
                  key={element[0] + 'index' + index}
                  className="w-full relative md:w-1/2 px-3 mb-6 md:mb-0"
                >
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    htmlFor={`grid-first-${element[0]}`}
                  >
                    {element[0]}
                  </label>
                  <input
                    className={`appearance-none block w-full bg-gray-50 text-gray-700 border rounded-lg py-3  px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${errors[element[0]] && "border-red-500"
                      }`}
                    id={`grid-first-${element}`}
                    type={element[1]}
                    {...register(element[0], {
                      required: "This field is required",
                    })}
                    placeholder="Jane"
                  />
                  {errors[element[0]] && (
                    <p className="text-red-500 absolute -bottom-4 italic">
                      {errors[element[0]].message}
                    </p>
                  )}
                </div>
              </>
            );
          })}
        </div>

        {[
          [three_input, "password", "****************"],
          [number_input, "number", "0000-0000-0000-0000"],
        ].map((element: string[], index: number) => {
          return (
            <>
              <div key={element[0] + 'index' + index} className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full relative px-3">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    htmlFor={`grid-${element[0]}`}
                  >
                    {element[0]}
                  </label>
                  <input
                    className={`appearance-none block w-full bg-gray-50 text-gray-700 border rounded-lg py-3  px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${errors[element[0]] && "border-red-500"
                      }`}
                    id={`grid-${element[0]}`}
                    {...register(element[0], {
                      required: "This field is required",
                    })}
                    type={element[1]}
                    placeholder={element[2]}
                  />
                  {errors[element[0]] && (
                    <p className="text-red-500 absolute -bottom-4 italic">
                      {errors[element[0]].message}
                    </p>
                  )}
                </div>
              </div>
            </>
          );
        })}

        <div className="flex flex-wrap gap-y-10 -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor={`grid-${input5}`}
            >
              {input5}
            </label>
            <div className="">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                {...register(input5, { required: "This field is required" })}
                id="grid-state"
              >
                {role.roles.map((data, index: number) => {
                  return <option key={data.role + index}>{data.role}</option>;
                })}
              </select>
              {errors[input5] && (
                <p className="text-red-500 absolute -bottom-4 italic">
                  {errors[input5].message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              Zip
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="text"
              placeholder="90210"
            />
          </div>
        </div>

        <div className="">
          <Submit
            reset={reset}
            isLoading={isLoading}

            bottom2="Sign Up"
            success={success}
            error={error}
          />
        </div>
      </form>
    </div>

  );
};
