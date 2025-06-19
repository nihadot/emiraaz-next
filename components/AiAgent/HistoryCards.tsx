import React from 'react'
import HistoryCard from './HistoryCard'


function HistoryCards() {
    const items = [
        {
            content: 'Show me the best apartments in UAE under 2M AED',
        },
        {
            content: 'Show me the best apartments in UAE under 2M AED, ',
        },
        {
            content: 'Show me the best apartments in UAE under 2M AED, ',
        },
    ]

    return (
        <div className="grid mb-3 grid-cols-3 w-full gap-2">
            {items && items.map((item, index) => <HistoryCard
                key={index}
                item={item}


            />)}

        </div>
    )
}

export default HistoryCards