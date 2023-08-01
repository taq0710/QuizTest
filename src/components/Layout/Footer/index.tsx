
import { logout } from '@/app/firebase';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { logoutPage } from '@/redux/features/login/loginSlide';
import { useAppDispatch } from '@/redux/hooks';
import Image from 'next/image';
import Facebook from '/public/images/share_icon_facebook_hover.png'
import Google from '/public/images/share_icon_google_hover.png'
import Twitter from '/public/images/share_icon_twitter_hover.png'
import * as React from 'react';

export interface  FooterProps {
}

export default function Footer (props:  FooterProps) {
  const dispatch = useAppDispatch()
  const handleLogout = ()=>{
    localStorage.removeItem("token")
    logout()
    dispatch({
      type: logoutPage().type,
    })
  }
  return (
    <div className='w-full h-fit bg-[#ccc] flex justify-center items-center'>
      <div className='w-[1200px] px-6 h-fit flex  items-center justify-between py-3 flex-wrap'>
        <div className='order-1 min-w-[195px]'>
          <h3 className='text-md lg:text-xl font-semibold text-[#666666]'>Subscribe For New Quizzes</h3>
          <Input className='py-3 border-none rounded-lg lg:w-[300px]' inputClassName="border-none rounded-lg"/>
          <Button title='Sign Up' className='w-full py-[5px] rounded-md text-md font-semibold text-white '/>
        </div>
        <div className='flex justify-center items-center space-x-2 lg:space-x-4 order-2 md:order-3 min-w-[112px]'>
          <div className='h-[32px] w-[32px] gray-image hover:cursor-pointer'>
            <Image className='w-full h-full object-contain' src={Facebook} alt="testquizs facebook" />
          </div>
          <div className='h-[32px] w-[32px] gray-image hover:cursor-pointer'>
            <Image className='w-full h-full object-contain' src={Google} alt="testquizs google" />
          </div>
          <div className='h-[32px] w-[32px] gray-image hover:cursor-pointer'>
            <Image className='w-full h-full object-contain' src={Twitter} alt="testquizs twitter" />
          </div>
        </div>
        <div className='order-3 md:order-2 w-[100%] md:w-fit py-4 md:py-0'>
          <div className='text-sky-700 text-sm lg:text-md text-center hover:cursor-pointer' onClick={()=>handleLogout()}>Logout</div>
          <div className='text-sm lg:text-md text-center'>Copyright © 2019-2023 | All rights reserved.</div>
        </div>
      </div>
    </div>
  );
}
