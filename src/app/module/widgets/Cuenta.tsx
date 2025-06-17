import React from 'react'

interface TypeCuenta {
    subtotal: number | string;
    discount: number | string;
    shipping: number | string;
    taxes: number | string;
    total: number | string;
}

export const Cuenta: React.FC<TypeCuenta> = ({ subtotal, discount, shipping, taxes, total }) => {
    return (
        <div className="flex relative justify-end mt-10">
            <div className="absolute blur-2xl -z-40 inset-0">
                <div className={`w-full h-full opacity-30 bg-gradient-to-tl from-rose-500 to-violet-500 clip-modal `}></div>
            </div>

            <div className="flex flex-col gap-5 w-1/2">

                <div className="flex justify-between w-full">
                    <h1>Subtotal</h1>
                    <h2> ${Math.floor(subtotal as number)} </h2>
                </div>
                <div className="flex justify-between w-full">
                    <h1>Discount</h1>
                    <h2>{discount == "-" ? "-" : "$" + Math.floor(discount as number)} </h2>
                </div>
                <div className="flex justify-between w-full">
                    <h1>Shipping</h1>
                    <h2>{shipping == "-" ? "-" : "$" + Math.floor(shipping as number)} </h2>
                </div>
                <div className="flex justify-between w-full">
                    <h1>Taxes</h1>
                    <h2>{taxes == "-" ? "-" : "$" + Math.floor(taxes as number)}</h2>
                </div>
                <div className="flex justify-between w-full">
                    <h1 className="font-bold">Total</h1>
                    <h2 className="font-bold">$ {Math.floor(total as number)}</h2>
                </div>
            </div>
        </div>
    )
}
