import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEjecut } from "../../../../hooks/useEjecut";
import { PageTitleInit } from "../../../layout/tollbar/tiltleInit";
import { port } from "../../../../../config/env";
import { FcNext, FcPrevious } from "react-icons/fc";
import { StarRating } from "../../../widgets/startRating";
import { FaHeart, FaPencilAlt, FaPlus, FaShare, FaStoreAlt } from "react-icons/fa";
import { MdAccessTimeFilled, MdFireTruck } from "react-icons/md";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { VscVerified, VscVerifiedFilled} from "react-icons/vsc"
import { GoShieldCheck } from "react-icons/go";
import { HiShieldCheck } from "react-icons/hi";
import { TabsNext } from "../../../widgets/tabs";
import { Option } from "../../../../../interface/TypeTabs";

export const Watch = () => {
  const { idProduct: id } = useParams();

  const CarouselPersonalizado = ({ children }: any) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollNext = () => {
      setCurrentIndex((prev) => (prev + 1) % children.length);
    };

    const selectPicture = (index: number) => {
      setCurrentIndex((prev) => index % children.length);
    };

    const scrollPrev = () => {
      setCurrentIndex((prev) => (prev - 1 + children.length) % children.length);
    };

    const ButtonNext = () => (
      <button
        onClick={scrollNext}
        className="absolute z-20 top-1/2 right-2 border bg-slate-200 rounded-full p-3 bg-opacity-45"
      >
        <FcNext className="text-white" />
      </button>
    );

    const ButtonPrev = () => (
      <button
        onClick={scrollPrev}
        className="absolute z-20 top-1/2 left-2  border bg-slate-200 rounded-full p-3 bg-opacity-45"
      >
        <FcPrevious className="text-white" />
      </button>
    );

    return (
      <div className="flex flex-col justify-center items-center ">
        <div className="w-[80%] relative rounded-xl border h-[500px] overflow-hidden">
          <ButtonPrev />
          <ButtonNext />
          <div
            className="h-full w-full flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {children?.map((image: any) => (
              <div key={image?.id} className="w-full h-[500px] flex-shrink-0">
                <img
                  className="w-full h-full object-cover"
                  src={port + image?.url}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-[60%] pl-2  overflow-hidden">
          <div
            className={`relative  mt-4  w-full  duration-250`}
            style={{ transform: `translateX(-${currentIndex * 10}%)` }}
          >
            <div className="w-20 flex items-center my-2 gap-4 ">
              {children?.map((image: any, index: number) => (
                <div
                  onClick={() => selectPicture(index)}
                  key={image?.id}
                  className={`w-full flex-shrink-0 `}
                >
                  <img
                    className={`w-full h-full rounded-2xl ${
                      currentIndex == index
                        ? " scale-105 border-2 border-red-500 duration-300 z-10"
                        : "opacity-65"
                    } object-cover`}
                    src={port + image?.url}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const {
    data: product,
    errors,
    isLoadingData,
  } = useEjecut({ url: `allproducts/${id}` });

  const image = [
    { id: 1, url: product?.image },
    { id: 2, url: product?.image },
    { id: 3, url: product?.image },
    { id: 4, url: product?.image },
    { id: 5, url: product?.image },
    { id: 6, url: product?.image },
  ];

  const isNeworNot = true;
  console.log(product);

  const [typeProduct, settypeProduct] = useState("");
  const [typeProductDescript, settypeProductDescript] = useState("");

  useEffect(() => {
    if (product?.tipo) {
      switch (product?.tipo) {
        case "Ingredientes":
          settypeProductDescript("Ingredient for food and cooking");
          settypeProduct("Ingredient");
          break;
        case "Aseo y Limpieza":
          settypeProductDescript("Product for home hygiene");
          settypeProduct("Cleaning and Cleaning");
          break;
        case "Procesados":
          settypeProductDescript("Meat Processed");
          settypeProduct("Processed");
          break;
        case "Carnicos":
          settypeProductDescript("Raw meat");
          settypeProduct("Meat");
          break;
        case "Dulce":
          settypeProductDescript("All kinds of sweets and cakes");
          settypeProduct("Sweet");
          break;
        case "Vegetales":
          settypeProductDescript("Vegetables and fruits ");
          settypeProduct("Vegetables");
          break;
        case "Lacteos":
          settypeProductDescript("Dairy products of all varieties");
          settypeProduct("Dairy");
          break;
        case "Shoes":
          settypeProductDescript("Best Quality Shoes");
          settypeProduct("Shoes");
          break;

        default:
          settypeProductDescript("All Product");
          settypeProduct("All Product");
          break;
      }
    }
  }, [product]);

  const AsideDetail = () => {
    return (
      <div className="grow ml-6 lg:ml-0 flex flex-col gap-3">
        {isNeworNot ? (
          <p className="w-14 rounded-md flex items-center justify-center font-bold text-blue-800 bg-gradient-to-tr from-blue-300 to-blue-200">
            NEW
          </p>
        ) : (
          <></>
        )}
        {product?.inventoryStatus == "INSTOCK" ? (
          <p className="text-green-400 font-bold">IN STOCK</p>
        ) : (
          <p></p>
        )}
        <p className="text-2xl font-bold bg-gradient-to-tr from-blue-400 bg-clip-text text-transparent to-rose-900">
          Classic Leather Loafers
        </p>
        <div className="flex gap-3">
          {product?.rating && <StarRating rating={product?.rating} size={25} />}
          <p className="text-slate-400">{`(9.12k reviews)`}</p>
        </div>
        <p className="text-2xl font-bold bg-gradient-to-tr from-blue-800 bg-clip-text text-transparent via-slate-900 to-slate-900">
          ${product?.price}
        </p>
        <h1>{product?.name}</h1>
        <h1 className="w-[80%] text-slate-500">{product?.description}</h1>
        <div className="flex mt-4 w-full pr-6 items-start justify-between">
          <span className="text-base font-bold">Type of product</span>
          <div className="text-end ">
            <h1 className="mr-5 text-xl">{typeProduct}</h1>
            <span className="text-slate-500 mr-5 text-xs">{`( ${typeProductDescript} )`}</span>
          </div>
        </div>
        <div className="flex w-full pr-6 items-center justify-between">
          <span className="text-base font-bold">Quantitly Total</span>
          <h1 className="mr-5 bg-gradient-to-tr from-blue-400 bg-clip-text text-transparent to-rose-900 text-xl font-bold">
            {product?.quantity_total}
          </h1>
        </div>
        <div className="flex mt-10 items-center justify-center gap-6">
          <button className="bg-gradient-to-br flex justify-center items-center gap-3 from-violet-300 py-4 hover:scale-110 duration-400 hover:bg-gradient-to-bl hover:from-blue-500 hover:to-violet-500 hover:text-white px-6 rounded-xl font-bold text-slate-500 to-teal-200">
            <FaStoreAlt size={28} /> <span>Go to the store</span>
          </button>
          <button className="bg-gradient-to-br flex justify-center items-center gap-3 from-violet-300 py-4 hover:scale-110 duration-400 hover:bg-gradient-to-bl hover:from-blue-500 hover:to-violet-500 hover:text-white px-6 rounded-xl font-bold text-slate-500 to-teal-200">
            <MdFireTruck size={28} /> <span>Go to the orders</span>
          </button>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <Button startContent={<FaPlus />} color="secondary" variant="light">
            Compare
          </Button>
          <Button startContent={<FaHeart />} color="secondary" variant="light">
            Favorite
          </Button>
          <Button startContent={<FaShare />} color="secondary" variant="light">
            Share
          </Button>
        </div>
      </div>
    );
  };

  const Divs = ({icon,text,descript}:{icon:any,text:string,descript:string}) => {
    return (
      <div className="flex gap-5 flex-col justify-center items-center">
        <span className="text-success-600 text-3xl"> {icon}</span>
        <h1 className="font-bold text-xl">{text}</h1>
        <p className="text-slate-600 text-base w-full max-w-56 text-center">{descript}</p>
      </div>
    )
  }

  const Reviews =({rating}:{rating:any}) => (
    <div className="flex">
        <div className="grow basis-56 border-r">
            {/* cantidad de rating verdadera */}
            <div className="flex flex-col items-center justify-center gap-3">
             <p className="text-xl font-bold">Average rating</p>
              <h1 className="text-7xl bg-gradient-to-tr from-slate-800 bg-clip-text text-transparent to-rose-900 font-extrabold">{`${rating}/5`}</h1>
              <StarRating rating={rating} size={25}/>
              <p className="text-slate-400">{`(9.12k reviews)`}</p>
            </div>
        </div>
        <div className="grow basis-56 border-r">

        </div>
        <div className="grow flex justify-center items-center basis-56 ">
        <Button startContent={<FaPencilAlt />} className="text-base font-semibold"  color="default" variant="light">
            Write your review
          </Button>
        </div>
    </div>
  )

  const Description = ({details,benefits}:{details:any,benefits:any}) => (
    
    <div className="flex flex-col gap-5">
      <div className="w-full max-w-[60%]">
        <div className="flex flex-col gap-4">

        <h1 className="text-xl font-bold">Specifications</h1>
        <Table isStriped aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Category</TableColumn>
        <TableColumn>Mobile</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>Tony Reichert</TableCell>
          <TableCell>CEO</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>Zoey Lang</TableCell>
          <TableCell>Technical Lead</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>Jane Fisher</TableCell>
          <TableCell>Senior Developer</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>William Howard</TableCell>
          <TableCell>Community Manager</TableCell>
        </TableRow>
      </TableBody>
    </Table>
    </div>
    </div>
      <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Product details</h1>
      <ul className="list-disc space-y-3 pl-5 ">
          {details?.map((item:any) => (
            <li key={item?.id} className="my-2" >{item?.text}</li>
          ))}
          </ul>
      </div>
      <div className="flex  flex-col gap-4">
      <h1 className="text-xl font-bold">Benefits</h1>
          <ul className="list-disc space-y-3 pl-5">
          {benefits?.map((item:any) => (
            <li key={item?.id} className="my-2" >{item?.text}</li>
          ))}
          </ul>
      </div>
    </div>
  )

  const details = [
    {id:1,text:"The foam sockliner feels soft and confortable."},
    {id:2,text:"Pull tab."},
    {id:3,text:"Not intended for use Personal Protective Equipment."},
    {id:4,text:"Colour Shown: White/Back/Oxygen Purple."},
    {id:5,text:"Style:9218293-109."},
    {id:6,text:"Country/region."},
  ]

  const benefits = [
    {id:1,text:"Mesh and synthenic materials on the upper keep the fluid look of the OG while adding comfortand durability"},
    {id:2,text:"Originally designed for performance running the full-lenght Max Air unit adds soft, comfortable cushioning underfoot."},
    {id:3,text:"The foam midsole feels springy and soft."},
    {id:4,text:"The rubber outsle adds traction and durability."},
  ]

    const DataTabs:Option[] = [
     { option:"Description ",component:<Description details={details} benefits={benefits} />,link:''},
     { option:"Reviews",component:<Reviews rating={product?.rating} />,link:'',badge:{color:'default',contex:8}},
    ]


  return (
    <>
      <PageTitleInit />

      <div className="flex flex-col lg:flex-row items-center justify-content-center w-full">
        <div className="grow basis-[75%]">
          <div className="mt-5 ml-5">
            <CarouselPersonalizado children={image} />
          </div>
        </div>
        <div className="grow basis-[700px] gap-3">
          <AsideDetail />
        </div>
      </div>
      <div className="flex mt-20 flex-col lg:flex-row items-center justify-content-center w-full">
          <div className="flex w-full justify-around">
          <Divs icon={<VscVerifiedFilled/>} text={'100% original'} descript={'Chocolate bar candy canes ice cream toffee cookie halvah.'}/>
          <Divs icon={<MdAccessTimeFilled/>} text={'10 days replacement'} descript={'Marshmallow biscuit donut dragee fruitcake wafer.'}/>
          <Divs icon={<HiShieldCheck/>} text={'Year warranty'} descript={'Cotton candy gingerbread cake I love sugar sweet'}/>
          </div>
      </div>
      <div className="flex mt-20 ml-10 flex-col lg:flex-row items-center justify-content-center w-full" >
      <TabsNext children={DataTabs} />
      </div>
    </>
  );
};
