import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Stores } from "./main-stores";
import { AddStores_template } from "../../module/components/stores/addStores_template";
import { SelectStoreforEdit } from "../../module/components/stores/selectStoreforEdit";
import { WatchtoreforEdit } from "../../module/components/stores/watchtoreforEdit";
import { SelectStoreforDelite } from "../../module/components/stores/selectStoreforDelite";
import { Deletesuccess } from "../../module/widgets/deletesuccess";
import { EditStore_template } from "../../module/components/stores/editStore_template";
import { PageLink, PageTitle } from "../../module/core/pageTitle";

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
  const selectStoreedit: Array<PageLink> = [
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
  const deleteStore :Array<PageLink> = [
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
  const editStore :Array<PageLink> = [
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

  return (
    <Routes>
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
      <Route path="watch" element={
        <>
        <PageTitle breadcrumbs={selectStore}>See Shop</PageTitle>
        <WatchtoreforEdit />
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
      <Route index element={<Navigate to="management" />} />
    </Routes>
  );
};
