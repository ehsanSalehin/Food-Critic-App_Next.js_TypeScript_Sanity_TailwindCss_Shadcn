import React from 'react'

const Ping = () => {
  return (
    <div className='relative'>
        <div className='absolute -left-4 top-1'>
            <span className='flex size-[11px]'>
                <span className='absolute inline-flex h-full w-full rounded-full animate-ping bg-[#750ef2] opacity-80'>
                    <span className='relative inline-flex size-[11px] rounded-full bg-[#610cc9]'>

                    </span>
                </span>
            </span>
        </div>
    </div>
  )
}

export default Ping