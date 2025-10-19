import React from 'react'


function NoDataFound() {
    return (
        <div>
            <h2 className='text-2xl py-2 font-poppins font-medium' >No Properties Match Your Search Criteria</h2>
            
            <p className='py-1 font-poppins font-medium text-sm'>Suggestions to Enhance Your Search:</p>
            <ol className='list-decimal pl-3'>
                <li className='text-xs leading-4 text-[#333333] font-poppins font-normal'>
                    Modify Your Filters: Consider broadening your search parameters. Adjust factors such as price range, property type, or location to discover additional options.
                </li>
                <li className='text-xs leading-4 text-[#333333] font-poppins font-normal'>
                    Reset Filters: If you wish to explore a wider selection, you can reset all filters to view our complete inventory of available properties.
                </li>
                <li className='text-xs leading-4 text-[#333333] font-poppins font-normal'>
                    Stay Informed: New properties are added frequently. We encourage you to check back regularly or sign up for alerts to be notified when new listings become available that match your interests.
                </li>
            </ol>
        </div>
    )
}

export default NoDataFound