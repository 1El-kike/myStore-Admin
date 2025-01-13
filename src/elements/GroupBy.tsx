import { Type_product } from "../app/components/products/type_product";
import { port } from "../config/env";
import { TypeStore } from "../interface/typestore";
import { Tables } from "./tableStore";

interface TypeGroup {
    data:any;
    link?:string;
    buttonClasses:(string | undefined)[];
    fondoClasses:string[];
}

export const Group:React.FC<TypeGroup> = ({data,buttonClasses,fondoClasses})=>{
    return (
      <div className=" flex mt-5 gap-4 flex-auto flex-wrap"> 
      {data?.map((data: any, index: number) => {
        return (
          <>
          <div className='w-[32%] mt-12 animate-appearance-in duration-1000 h-60 '>

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
    )
  }

export  const List:React.FC<TypeGroup> =({data,buttonClasses,link, fondoClasses})=> {
  
    return(
      <>
      <div className="">
          {data?.map((data: any, index: number) => {
            return (
              <>
              <div className="mt-16 animate-appearance-in relative">

                <Type_product
                link={link}
                key={data.id}
                idStore={data.id}
                scale="125"
                button={buttonClasses[index % buttonClasses.length]}
                fondo={fondoClasses[index % fondoClasses.length]}
                image={`${port + data.imgPortada}`}
                title={`Operating in Store ${data.name}`}
                textsecondary="For more info look out page soport"
                text={data.description}
                />
                </div>
              </>
            );
          })}
        </div>
      </>
    )
  }

export const Table:React.FC<TypeGroup> = ({data}:{data:TypeStore})=> {

    return (
        <>
        <Tables datos={data}/>
        </>
    )
 } 