import { Card, Skeleton, Spacer, Spinner } from '@nextui-org/react'
import React from 'react'

enum Load {
  'vertical' , 'Horizontal' ,"Table"
}
interface TypeLoading {
  typeLoad?: Load
}

export const Loading_items:React.FC<TypeLoading> = ({typeLoad}) => {

   const CustomCard = () => (
    <Card className="w-[900px] space-y-5 p-4">
      <div className="flex">
      <Skeleton className="rounded-lg w-44 h-44" >
          <div className="h-24 rounded-lg bg-secondary" />
        </Skeleton>
        <div className='flex w-full px-20 flex-col gap-2'>
      <Spinner labelColor="danger"  color="danger" label="Loading..." />
        <div className="h-3  rounded-lg bg-default-200" />
        <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </div>
      </div>
    </Card>
  );

  return (
    <>
  {/* {typeLoad ? } */}
  <div className="flex-col flex">
      <CustomCard />
      <Spacer x={4} />
      <CustomCard />
      <Spacer x={4} />
      <CustomCard />
    </div>
    </>
  )
}
