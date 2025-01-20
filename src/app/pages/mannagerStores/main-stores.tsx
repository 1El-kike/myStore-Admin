import React from "react";
import { SettingStores } from "../../module/components/stores/SettingStores";
import { PageTitleInit } from "../../module/layout/tollbar/tiltleInit";

export const Stores = () => {
  return (
    <>
    <PageTitleInit/>
    <div className="mx-6 w-full">
      <SettingStores />
    </div>
    </>
  );
};
