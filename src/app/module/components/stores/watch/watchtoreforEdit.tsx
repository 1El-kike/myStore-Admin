import { Image, Tab, Tabs } from '@nextui-org/react';
import React from 'react';
import { PageTitleInit } from '../../../layout/tollbar/tiltleInit';
import { TabSelect } from '../../../widgets/tabsSelect';
import { Toolbar } from '../../../widgets/Toolbar';

export const WatchtoreforEdit = () => {


  return (
    <>
      <PageTitleInit />
      <div className="w-full">
        <div className="w-[85%]">
          <TabSelect link="/stores/watch/select/" notId={false} />
        </div>
      </div>
      <Toolbar action='Watch Stores' element='Dashboard' />


    </>
  )
}
