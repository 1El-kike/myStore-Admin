import React, { FC } from 'react'
import { StarRatingSelect } from './starRating';
import { Textarea } from '@nextui-org/react';

interface Type {
    setSelectedStars:any;
    selectedStars:any;
    setvaluetextReview:any;
    valuetextReview:any
}

export const ModalCreateReview:React.FC<Type> = ({selectedStars, setSelectedStars,setvaluetextReview,valuetextReview}) => {
    return (
      <div className="flex flex-col gap-2  justify-center items-start">
       <div className='mb-5'>

        <p>Your review about this product:</p>
        <StarRatingSelect
          selectedStars={selectedStars}
          setSelectedStars={setSelectedStars}
          />
          </div>
        <Textarea
          isClearable
          className="bg-slate-50 rounded-lg w-full  hover:!border-default hover:!shadow-none"
          placeholder="Review *"
          variant="underlined"
          onChange={(e:any) => 
            setvaluetextReview(e.target.value)
          }
          value={valuetextReview}
          // eslint-disable-next-line no-console
          onClear={() => setvaluetextReview("")}
        />
      </div>
    );
  };
