import ReviewForm from '@/app/components/ReviewForm'
import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async() => {
    const session = await auth()
    if(!session) redirect("/");
  return (
    <>
          <section className='w-full bg-[#22920edd] min-h-[530px] pattern flex justify-center items-center flex-col py-5 px-6 pattern !min-h-[230px]'>
              <h1 className='heading'>
              Share Your <br/>Appetizing Journey
              </h1>
          </section>
        <ReviewForm/>
    </>
  )
}

export default page