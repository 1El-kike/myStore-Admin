import React, { Component, ComponentProps, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Submit } from "../widgets/Submit";

interface FormAuths {
  url: string;
  first_input: string;
  second_input: string;
  three_input: string;
  input4: string;
  input5: string;
  input6: string;
}

export const FormAuth: React.FC<FormAuths> = ({
  url,
  first_input,
  second_input,
  three_input,
  input4,
  input5,
  input6,
}) => {
  const [role, setrole] = useState({
    roles: [
      { role: "" },
      { role: "SuperAdmin" },
      { role: "Administrador" },
      { role: "Client" },
    ],
  });

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { error, isLoading, onSubmit, success } = useAuth({
    url: url,
  });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full fixed lg:ml-20 mt-32 ml-3 lg:mt-20 z-10 max-w-lg rounded-3xl border py-5 backdrop-blur-lg px-8"
    >
      <div className="flex flex-wrap -mx-3 mb-6">
        {[
          [first_input, "text"],
          [second_input, "number"],
        ].map((element: string[]) => {
          return (
            <>
              <div
                key={element[0]}
                className="w-full relative md:w-1/2 px-3 mb-6 md:mb-0"
              >
                <label
                  className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                  htmlFor={`grid-first-${element[0]}`}
                >
                  {element[0]}
                </label>
                <input
                  className={`appearance-none block w-full bg-gray-50 text-gray-700 border rounded-lg py-3  px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                    errors[element[0]] && "border-red-500"
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
        [input4, "number", "0000-0000-0000-0000"],
      ].map((element: string[]) => {
        return (
          <>
            <div key={element[0]} className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full relative px-3">
                <label
                  className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                  htmlFor={`grid-${element[0]}`}
                >
                  {element[0]}
                </label>
                <input
                  className={`appearance-none block w-full bg-gray-50 text-gray-700 border rounded-lg py-3  px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                    errors[element[0]] && "border-red-500"
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
              {role.roles.map((data) => {
                return (
                  <>
                    <option>{data.role}</option>
                  </>
                );
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
          bottom1="Log In"
          bottom2="Register"
          success={success}
          error={error}
        />
      </div>
    </form>
  );
};
