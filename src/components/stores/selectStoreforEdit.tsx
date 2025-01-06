import React from 'react'
import { Toolbar } from '../../elements/Toolbar'
import { TollButtom } from '../products/tollBar'
import { useEjecut } from '../../hooks/useEjecut';
import { Type_product } from '../products/type_product';
import { port } from '../../config/env';

export const SelectStoreforEdit = () => {

     const buttonClasses = [
        "bg-gradient-to-tr to-violet-700 from-indigo-500",
        "bg-gradient-to-tr to-fuchsia-500 from-fuchsia-900",
        "bg-gradient-to-tr to-orange-500 from-orange-900",
        ,
      ];
    
      const fondoClasses = [
        "bg-gradient-to-tr to-blue-100 from-violet-100",
        "bg-gradient-to-tr to-rose-100 from-purple-100",
        "bg-gradient-to-tr to-orange-100 from-amber-100",
      ];
    
      const { data, isLoadingData, errors } = useEjecut({ url: "stores" });

  return (
    <>
    <div className='w-full'>
    <Toolbar action='Edit Stores' element='Admin of Store'/>
    <h2 className="text-3xl w-full text-violet-700 font-bold ml-4">Select category</h2>
             <div className="w-full flex items-center justify-center  scale-90">
               <TollButtom />
             </div>

 <div className=" flex ml-10 mt-5 gap-4 flex-auto flex-wrap">
          {data?.map((data: any, index: number) => {
            return (
              <>
              <div className='w-[30%] mt-12 animate-appearance-in duration-1000 h-60 '>

                <Type_product
                link='/stores/edit/'
                position='vertical'
                  key={data.id}
                  idStore={data.id}
                  scale="125"
                  button={buttonClasses[index % buttonClasses.length]}
                  fondo={fondoClasses[index % fondoClasses.length]}
                  image={`${port + data.imgPortada}`}
                  title={`${data.name}`}
                  textsecondary="For more info look out page soport"
                  text={data.description}
                  />
                  </div>
              </>
            );
          })}
        </div>
    </div>

    </>
  )
}
