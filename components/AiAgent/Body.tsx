import React from 'react'
import HistoryCards from './HistoryCards'
import SearchComponent from './SearchComponent'
import SpaceWrapper from '../atom/SpaceWrapper/SpaceWrapper'

function Body() {
    return (
        <div className="">

            <div className='bg-white w-full min-h-[60vh] max-w-xl m-auto flex flex-col justify-start mt-40 items-center'>
                <h1 className='font-poppins mb-[12px] font-medium text-[37.5px]'>Say hello to your new <span className='text-[#FF1645]'>Ai Agent</span></h1>
                <p className='font-poppins font-normal mb-[20px] text-[12px] text-[#333333]'>No more filters. No more forms. Just chat and discover. Powered by <span className='text-[#FF1645]'>AI</span></p>
            <HistoryCards/>
            
         
            <SearchComponent/>
           
            </div>

        </div>

    )
}

export default Body