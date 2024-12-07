import React from 'react'
import Searchformreset from './Searchformreset'

interface SearchformProps {
  query?: string;
}

const Searchform: React.FC<SearchformProps> = ({ query }) => {
  return (
    <form action={"/"} className='search-form max-w-md mx-auto relative my-3'>
      <div className="relative">
        <input 
          name='query'
          type="text" 
          defaultValue={query}
          placeholder="Search..." 
          className="w-full py-2 pl-4 pr-24 text-gray-700 bg-white border rounded-full focus:outline-none focus:border-blue-500"
        />
        <div className='absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2'>
          
          <button type="submit" className="w-10 h-10 flex justify-center items-center text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>  
        </div>
      </div>
    </form>
  )
}

export default Searchform