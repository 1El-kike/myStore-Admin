import React from 'react'

export const Inventoy = () => {
  return (
    <>
    <h1 className="text-2xl mt-5 font-bold">Inventory</h1>
      <form className="border my-5 px-3 py-2 md:flex gap-4  border-gray-300 rounded-2xl">
      <div className="flex flex-col">
        <label
          htmlFor="helper-text"
          className="block mb-2 text-base font-medium text-gray-900"
        >
         Quantity
        </label>
        <input
          type="text"
          id="helper-text"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Product"
        />
      </div>
      <div className="flex grow flex-col">
        <label
          htmlFor="helper-text"
          className="block mb-2 text-base font-medium text-gray-900"
        >
         SKU(Option)
        </label>
        <input
          type="text"
          id="helper-text"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Product"
        />
      </div>
      </form>
    </>
  )
}
