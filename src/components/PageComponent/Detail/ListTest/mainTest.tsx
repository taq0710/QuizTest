import * as React from 'react';

export interface  MainTestProps {
  image:string,
  title?:string,
}

export default function MainTest ({image,title}:  MainTestProps) {
  return (
    <div className="w-full h-fit p-4">
        <h1 className='capitalize text-3xl '>{title}</h1>
        <div className='mt-5 w-full pt-[55%] relative rounded-xl overflow-hidden'>
          <div className='w-full h-full absolute top-0 left-0'>
              <img src={image} alt={title} className="h-full w-full object-cover"/>
          </div>
        </div>
    </div>
  );
}
