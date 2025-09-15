import React, { useEffect, useState } from 'react'
import { PageTitleInit } from '../../layout/tollbar/tiltleInit'
import { useDelite } from '../../../hooks/useDelite';
import { useParams } from 'react-router-dom';

export const UserDelete = () => {

    const { DeliteFetch } = useDelite();
    const userId = useParams()

    const [actionState, setActionState] = useState(false);

    const handleActionChange = (newState: boolean) => {
        setActionState(newState);
    };

    useEffect(() => {
        if (actionState) {
            DeliteFetch({ url: "user/delete/", id: Number(userId.id), newredirect: '/users/management/', methods: "PUT" });
        }
    }, [actionState]);

    return (
        <div>

            <div className="flex items-end w-full justify-between">
                <PageTitleInit />
            </div>
            <div className='flex w-full mt-7 px-1 md:px-7'>
                <button onClick={() => handleActionChange(true)}> hacer click </button>

            </div>
        </div>
    )
}
