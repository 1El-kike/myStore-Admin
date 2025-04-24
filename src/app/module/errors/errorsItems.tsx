import React from 'react'

export const ErrorsItems = () => {

const reload = () => {
  window.location.reload()
}


  return (
    <div className="bg-destructive text-destructive-foreground p-6 rounded-lg shadow-2xl transition-transform transform hover:scale-105">
      <h2 className="text-2xl font-bold mb-3 text-accent">Oops! Something went wrong</h2>
      <p className="text-base mb-5 text-muted-foreground">We couldn't load the product list. Please try again later.</p>
      <div className='w-32 h-32 flex justify-center items-center overflow-hidden rounded-full shadow-2xl shadow-black border-2 border-rose-800  mx-auto'>
      <img  alt="error-icon" src="/error.jpg" className="scale-150 " />
      </div>
      <button onClick={reload} className="bg-gradient-to-tr from-rose-600 to-rose-700 text-primary-foreground px-5 py-2 rounded-lg shadow-md hover:bg-primary/80 transition duration-300 ease-in-out">Retry</button>
    </div>
  )
}
