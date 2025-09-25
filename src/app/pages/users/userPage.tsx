import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { PageTitle } from '../../module/core/pageTitle'
import { updateTable } from '../../module/core/filtertableandSearch'
import { useAuth } from '../../module/auth/core/Auth'
import { getRole } from '../../utils/getRoles'
import { UserCreate } from '../../module/components/users/userCreate'
import { UserDelete } from '../../module/components/users/userDelete'
import { UserEdit } from '../../module/components/users/userEdit'

export const UserPage = () => {
    const location = useLocation();
    const { setdatosTable } = updateTable();

    useEffect(() => {
        // Resetear al cambiar de ruta
        setdatosTable([]);
    }, [location.pathname]);

    const listuser = [
        {
            title: "Beginning",
            path: "users/management",
            isSeparator: false,
            isActive: false,
        },
        {
            title: "",
            path: "",
            isSeparator: true,
            isActive: false,
        },
    ]
    const listuserEdit = [
        {
            title: "Beginning",
            path: "/users/management",
            isSeparator: false,
            isActive: false,
        },
        {
            title: "Edit",
            path: "",
            isSeparator: true,
            isActive: false,
        },
    ]

    const listuserDelete = [
        {
            title: "Beginning",
            path: "/users/management",
            isSeparator: false,
            isActive: false,
        },
        {
            title: "Delete",
            path: "",
            isSeparator: true,
            isActive: false,
        },
    ]

    const { currentUser } = useAuth();
    const { admin, super_admin } = getRole(currentUser);


    return (
        <Routes>
            {
                super_admin || admin
                    ?
                    <>
                        <Route
                            path='management'
                            element={
                                <>
                                    <PageTitle breadcrumbs={listuser}>Users List</PageTitle>
                                    <UserCreate />
                                </>
                            }
                        />
                        <Route
                            path='management/delite/:id'
                            element={
                                <>
                                    <PageTitle breadcrumbs={listuserDelete}>Users Delete</PageTitle>
                                    <UserDelete />
                                </>
                            }
                        />
                        <Route
                            path='management/edit/:idUser'
                            element={
                                <>
                                    <PageTitle breadcrumbs={listuserEdit}>Users Edit</PageTitle>
                                    <UserEdit />
                                </>
                            }
                        />


                    </>
                    :
                    <>
                        <Route path='/*' element={<Navigate to="dashboard" />} />
                    </>
            }

            <Route index element={<Navigate to="management" />} />

        </Routes>
    )
}
