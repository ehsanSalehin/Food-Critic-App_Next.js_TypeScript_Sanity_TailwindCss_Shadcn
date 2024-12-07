import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client';
import { REVIEW_VIEWS_QUERY } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/write_client';

const View = async({id}:{id:string}) => {
    const {views: totalViews }= await client.withConfig({useCdn:false}).fetch(REVIEW_VIEWS_QUERY, {id});
    await writeClient.patch(id).set({views: totalViews+1}).commit();
  return (
    <div className='flex justify-end items-center mt-5 fixed bottom-3 right-3'>
        <div className='absolute -top-2 -right-2'>
            <Ping />
        </div>
        <p className='font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-lg capitalize'>
            <span className='font-black'>{totalViews} Views</span>
        </p>
    </div>
  )
}

export default View