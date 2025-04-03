import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDelite } from "../../../../hooks/useDelite";

export const Delite = () => {
  const navigate = useNavigate();
  const idProduct = useParams();

  const { DeliteFetch, message, isLoadingmessage, errors } = useDelite();

  const handleclikCancel = () => {
    navigate(-1);
  };

  const handleclikDelite = () => {
    DeliteFetch({
      url: "allProducts/delete/",
      id: Number(idProduct.idProduct),
    });
    navigate(-1);
  };
  return (
    <div className="min-h-screen flex items-center  justify-center bg-background">
      <div
        className="fixed inset-x-0 top-[-10rem]  transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div className="relative clip-fondo left-1/2 -z-10 aspect-[1155/778]  w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ee48dd] opacity-20 to-[#e7087b]  sm:left-[calc(90%-40rem)] sm:w-[102.1875rem]"></div>
      </div>
      <div className="bg-white z-10 shadow-xl rounded-lg p-8 max-w-md w-full transition-transform hover:scale-110">
        <h2 className="text-3xl font-extrabold text-primary mb-4">
          Delete Product?
        </h2>
        <p className="text-xl text-muted-foreground mb-6">
          Are you absolutely sure you want to delete this product? This action
          cannot be undene
        </p>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleclikDelite}
            className="bg-gradient-to-tr from-rose-500 via-red-500 to-rose-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-gradient-to-tl hover:from-rose-500/80 hover:via-red-500/80 transition duration-200 hover:to-rose-600/80"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={handleclikCancel}
            className="bg-gradient-to-tr from-slate-50 via-slate-100 to-slate-200 text-slate-900 px-6 py-3 rounded-xl shadow-md hover:bg-gradient-to-tl hover:from-slate-50/80 hover:via-slate-200/80 transition duration-200 hover:to-slate-100/80"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
