import * as React from 'react';

export interface  TitleProps {
  children: React.ReactNode
}

export default function Title ({children}:  TitleProps) {
  return (
    <div className='w-full h-fit flex justify-center items-center py-2'>
      <div className='flex w-fit h-fit items-center '>
          <div className='mx-1 sm:mx-2 rotate-45 h-[6px] sm:h-[8px] w-[6px] sm:w-[8px] rounded-sm bg-[#FEAD46]'></div>
          <div className='mx-1 sm:mx-2 rotate-45 h-[8px] sm:h-[10px] w-[8px] sm:w-[10px] rounded-sm bg-[#FF9400]'></div>
          <div className='mx-1 sm:mx-2 rotate-45 h-[10px] sm:h-[12px] w-[10px] sm:w-[12px] rounded-sm bg-[#FE7900]'></div>
      </div>
      <div className='px-2 sm:px-5 text-xl sm:text-2xl font-medium text-[#333] whitespace-nowrap'>{children}</div>
      <div className='flex w-fit h-fit items-center '>
          <div className='mx-1 sm:mx-2 rotate-45 h-[10px] sm:h-[12px] w-[10px] sm:w-[12px] rounded-sm bg-[#FE7900]'></div>
          <div className='mx-1 sm:mx-2 rotate-45 h-[8px] sm:h-[10px] w-[8px] sm:w-[10px] rounded-sm bg-[#FF9400]'></div>
          <div className='mx-1 sm:mx-2 rotate-45 h-[6px] sm:h-[8px] w-[6px] sm:w-[8px] rounded-sm bg-[#FEAD46]'></div>
      </div>
    </div>
  );
}
