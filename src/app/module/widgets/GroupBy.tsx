import { port } from "../../../config/env";
import { Type_product } from "../components/products/type_product";
import { Tables, TypeColumns } from "./table/tableStore";

interface TypeGroup {
    data?:any;
    link?:string;
    isDetails?:boolean
    buttonClasses?:(string | undefined)[];
    fondoClasses?:string[];
    columns?:TypeColumns[]
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
              button={buttonClasses && buttonClasses[index % buttonClasses.length]}
              fondo={fondoClasses && fondoClasses[index % fondoClasses.length] || 'bg-white'}
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
                button={buttonClasses && buttonClasses[index % buttonClasses.length]}
                fondo={fondoClasses && fondoClasses[index % fondoClasses.length] || 'bg-white'}
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


export const Table:React.FC<TypeGroup> = ({data,columns,isDetails})=> {

  const defaultcolumn = [
    {name: "STORES", uid: "name"},
    {name: "ROLE", uid: "role"},
    {name: "SELLING TYPE", uid: "status"},
    {name: "ACTIONS", uid: "actions"},
  ];

    return (
        <>
        <Tables isDetails={isDetails} columns={columns && columns || defaultcolumn}/>
        </>
    )
 } 