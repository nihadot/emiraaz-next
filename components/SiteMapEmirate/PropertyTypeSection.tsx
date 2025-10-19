import React from 'react'

function PropertyTypeSection() {

    const CardItem = ({ title }: { title: string }) => {
        return (
            <div className='flex border border-[#DEDEDE] flex-col justify-center items-center w-full h-full p-2 bg-white rounded-[10px]'>
                <p className='text-lg font-medium font-poppins'>{title}</p>
            </div>
        )
    }

    const CardList = [{
        value: "commercial-residential",
        label: "Commercial & Residential",
    }, {
        value: "offplan-residential",
        label: "Offplan Residential",
    }, {
        value: "offplan-commercial",
        label: "Offplan Commercial"
    }];

    const CardListItem = CardList.map((item,index) => {
        return (
            <CardItem key={index} title={item.label} />
        )
    })

    return (
        <section>

            <div className="flex gap-5 ">
                {CardListItem}
            </div>

        </section>
    )
}

export default PropertyTypeSection