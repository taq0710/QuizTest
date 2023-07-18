"use client"

import Image from 'next/image'
import HomeItem from '@/components/pageComponent/home'
import { useAppSelector } from '@/redux/requestHelper'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function Home() {
  const user = useAppSelector(state=>state.user)
  console.log(user)
  return (
    <main className="">
      <Header/>
      <HomeItem/>
      <Footer/>
    </main>
  )
}
