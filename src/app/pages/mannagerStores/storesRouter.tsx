import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Stores } from "./main-stores";
import { AddStores_template } from "../../module/components/stores/add/addStores_template";
import { SelectStoreforEdit } from "../../module/components/stores/edit/selectStoreforEdit";
import { WatchtoreforEdit } from "../../module/components/stores/watch/watchtoreforEdit";
import { Deletesuccess } from "../../module/widgets/deletesuccess";
import { EditStore_template } from "../../module/components/stores/edit/editStore_template";
import { PageLink, PageTitle } from "../../module/core/pageTitle";
import { SelectStoreforDelite } from "../../module/components/stores/delete/selectStoreforDelite";
import { useAuth } from "../../module/auth/core/Auth";
import { getRole } from "../../utils/getRoles";
import { WatchStoreForSeeDetails } from "../../module/components/stores/watch/watchStoreForSeeDetails";

export const StoresRouter = () => {

  const managament: Array<PageLink> = [
    {
      title: 'Beginning',
      path: '',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

  const selectStore: Array<PageLink> = [
    {
      title: 'Beginning',
      path: '/stores/management',
      isSeparator: false,
      isActive: false,
    },
    {
      title: 'Select store',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]
  const selectStoreeSee: Array<PageLink> = [
    {
      title: 'Beginning',
      path: '/stores/management',
      isSeparator: false,
      isActive: false,
    },
    {
      title: 'Select store',
      path: '/stores/watch',
      isSeparator: true,
      isActive: false,
    },
    {
      title: 'See store',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]
  const deleteStore: Array<PageLink> = [
    {
      title: 'Beginning',
      path: '/stores/management',
      isSeparator: false,
      isActive: false,
    },
    {
      title: 'Select store',
      path: '/stores/delite',
      isSeparator: true,
      isActive: false,
    },
    {
      title: 'Delete store',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]
  const editStore: Array<PageLink> = [
    {
      title: 'Beginning',
      path: '/stores/management',
      isSeparator: false,
      isActive: false,
    },
    {
      title: 'Select store',
      path: '/stores/edit',
      isSeparator: true,
      isActive: false,
    },
    {
      title: 'Edit shop',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

  const { currentUser } = useAuth();
  const { super_admin, admin } = getRole(currentUser);

  return (
    <Routes>
      {
        (super_admin || admin) &&
        <>
          <Route path="edit/:id" element={
            <>
              <PageTitle breadcrumbs={editStore}>Edit Shop</PageTitle>
              <EditStore_template />
            </>
          } />

        </>
      }
      {
        (super_admin) ?
          <>
            <Route path="management" element={
              <>
                <PageTitle breadcrumbs={managament}>Store Management</PageTitle>
                <Stores />
              </>
            } />
            <Route path="add" element={
              <>
                <PageTitle breadcrumbs={selectStore}>Store Shop</PageTitle>
                <AddStores_template />
              </>

            } />
            <Route path="edit" element={
              <>
                <PageTitle breadcrumbs={selectStore}>Select Shop</PageTitle>
                <SelectStoreforEdit />
              </>
            } />
            <Route path="delite" element={
              <>
                <PageTitle breadcrumbs={selectStore}>Delete Shop</PageTitle>
                <SelectStoreforDelite />
              </>
            } />
            <Route path="delete/:id" element={
              <>
                <PageTitle breadcrumbs={deleteStore}>Shop Removed</PageTitle>
                <Deletesuccess />
              </>
            } />
            <Route path="edit/:id" element={
              <>
                <PageTitle breadcrumbs={editStore}>Edit Shop</PageTitle>
                <EditStore_template />
              </>
            } />
          </>
          :
          <Route path="/*" element={<Navigate to="watch" />} />
      }


      <Route path="watch" element={
        <>
          <PageTitle breadcrumbs={selectStore}>See Shop</PageTitle>
          <WatchtoreforEdit />
        </>
      } />

      <Route path="watch/select/:idStore" element={
        <>
          <PageTitle breadcrumbs={selectStoreeSee}>Details Shop</PageTitle>
          <WatchStoreForSeeDetails />
        </>
      }>
      </Route>

      <Route index element={<Navigate to="management" />} />
    </Routes>
  );
};
