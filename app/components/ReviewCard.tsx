import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import React from 'react'
import { Button } from "@/components/ui/button"
import { Author, Review } from '@/sanity/types'


export type ReviewTypeCard=Omit<Review, "author"> & {author?: Author};
const ReviewCard = ({post}:{post:ReviewTypeCard}) => {
    return (
      <li className='bg-gradient-to-br from-[#f2f5d8] to-[#dacff8] p-[5px] rounded-[22px] shadow-lg group'>
  <div className='bg-white p-5 rounded-[17px] flex justify-between items-start mb-4'>
            <a href={`/user/${post.author?._id}`} className='flex items-center gap-3'>
              <img src={post?.author?.image} alt="placeholder" width={50} height={50} className='rounded-full border-2 border-[#7200d0]'/>
              <div>
                <p className='text-16 font-semibold'>{post.author?.name}</p>
                <p className='text-[10px] text-gray-500'>{formatDate(post._createdAt)}</p>
              </div>
            </a>
            <div className='flex items-center gap-2 bg-primary-100 px-3 py-1 rounded-full'>
              <EyeIcon className='w-4 h-4' />
              <span className='text-15-medium'>{post.views}</span>
            </div>
          </div>
          
          <a href={`/review/${post._id}`} className='block mb-4'>
            <h3 className='text-26-semibold line-clamp-2 mb-2 hover:text-[#7200d0] transition-colors'>{post.title}</h3>
            <p className='font-normal text-[16px] line-clamp-2 text-black-100'>
              {post.descritption}
            </p>
          </a>
          
          <div className='relative mb-4 overflow-hidden rounded-[10px]'>
            <img src={post.image} alt="review image" className='w-full h-[164px] object-cover transition-transform duration-300 group-hover:scale-105'/>
            <span className='absolute top-2 right-2 bg-white px-3 py-1 rounded-full text-14'>{post.category}</span>
          </div>
          
          <div className='flex justify-end'>
            <Button className='rounded-full bg-[#7200d0] font-medium text-[16px] text-white px-6 py-3 hover:bg-[#5a00a7] transition-colors duration-300 !important'>
              <a href={`/review/${post._id}`}>Read More</a>
            </Button>
          </div>
        </li>
      )
}

export default ReviewCard