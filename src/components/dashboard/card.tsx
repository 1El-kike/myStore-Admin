import React from 'react'
import { TabsNext } from '../../elements/tabs'
import { Table } from 'flowbite-react'

export const Card = () => {


  return (
    <div className='mt-2  shadow-2xl shadow-zinc-400 flex w-full h-full rounded-2xl justify-center items-center bg-gradient-to-br from-rose-200 via-purple-100 to-purple-200'>
   
   <div className='mb-auto w-full mr-auto'>
      <TabsNext/>
    <span className='border-b-1 border-red-400'  />
    <div className='pt-4 flex-col gap-10 md:gap-0 flex md:flex-row items-center mb-2 justify-around'>
    {/* Tarjeta de credit */}
    <div className='bg-gradient-to-tr from-slate-900 via-rose-950 rounded-2xl shadow-xl shadow-slate-300 to-red-800 w-80 h-44'>
    </div>
      <div>
        <Table className=''>
          <Table.Head className=''>
            <Table.HeadCell className='bg-transparent text-2xl absolute -left-5 text-green-950 font-extrabold -top-9 line-clamp-1 w-full'>$1.234.767</Table.HeadCell>
            <Table.HeadCell className='bg-transparent'>Julio</Table.HeadCell>
            <Table.HeadCell className='bg-transparent'>Agost</Table.HeadCell>
          </Table.Head>
<Table.Body className=''>
  <Table.Row className=''>
    <Table.Cell className='py-1'>Avaliable</Table.Cell>
    <Table.Cell className='py-1 font-bold'>$31,213</Table.Cell>
    <Table.Cell className='py-1 font-bold'>$82,456</Table.Cell>
  </Table.Row>
  <Table.Row className=''>
    <Table.Cell className='py-1'>Credit limit</Table.Cell>
    <Table.Cell className='py-1 font-bold'>$12,000</Table.Cell>
    <Table.Cell className='py-1 font-bold'>$20,000</Table.Cell>
  </Table.Row>
  <Table.Row>
    <Table.Cell className='py-1'>Credit used</Table.Cell>
    <Table.Cell className='py-1 font-bold'>$10,000</Table.Cell>
    <Table.Cell className='py-1 font-bold'>$0,00</Table.Cell>
  </Table.Row>
</Table.Body>
        </Table>
      </div>
    </div>
    </div>
    </div>
  )
}
