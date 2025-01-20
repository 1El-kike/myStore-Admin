import { Image, Tab, Tabs } from '@nextui-org/react';
import React from 'react';
import { PageTitleInit } from '../../layout/tollbar/tiltleInit';

export const WatchtoreforEdit = () => {

  
  return (
   <>
   <PageTitleInit/>
   <div className=''> 

   <Image
      isBlurred
      alt="NextUI Album Cover"
      className="m-5"
      src="https://nextui.org/images/album-cover.png"
      width={240}
      />

<div className="flex flex-wrap gap-4">
     
        <Tabs key={"underlined"} aria-label="Tabs variants" variant={"underlined"}>
          <Tab key="photos" title="Photos" />
          <Tab key="music" title="Music" />
          <Tab key="videos" title="Videos" />
        </Tabs>
  
    </div>
<div className="flex flex-col gap-2">
      
    </div>
      </div>
   </>
  )
}
