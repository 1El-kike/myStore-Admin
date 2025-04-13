import React from 'react'
import { PageTitleInit } from '../../../layout/tollbar/tiltleInit'
import { TabSelect } from '../../../widgets/tabsSelect'
import { Toolbar } from '../../../widgets/Toolbar'

export const WatchProducts = () => {
  return (
    <>
   <PageTitleInit />
         <div className="w-full">
                    <div className="w-[85%]">
                      <TabSelect link="/products/watch/select" notId={true} linkallData="select/" allData="allProducts" />
                    </div>
                  </div>
                    <Toolbar action='Watch Products' element='Admin of product'/>
    </>
  )
}
