import React from 'react'
import { PageTitleInit } from '../../layout/tollbar/tiltleInit'
import { useEjecut } from '../../../hooks/useEjecut'
import { useParams } from 'react-router-dom'

export const UserEdit = () => {

    const params = useParams()

    const idUser = params.idUser;

    const { data } = useEjecut({ url: `user/${idUser}` })

    console.log(data)

    return (

        <div>

            <div className="flex items-end w-full justify-between">
                <PageTitleInit />
            </div>
            <div className='flex  w-full mt-7 px-1 md:px-7'>
                <div className='flex flex-col'>
                    <div>
                        {data?.name}
                    </div>
                    <div className='flex flex-col'>
                        {data?.managedStores?.map((e: any) =>
                            <div>{e.name}</div>)}
                    </div>
                </div>
            </div>
        </div>

    )
}
