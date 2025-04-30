import React from 'react'
import ProjectHeader from './ProjectHeader'

type Props = {
    headerTitle: string;
    sectionId : string;
    data : string[];
}

function AreaNearBy({headerTitle,data}: Props) {
  return (
    <div>
        <ProjectHeader title={headerTitle} />
       <div className="grid grid-cols-2 gap-3 pt-4">
       {data && data.length && data.map((item,index)=>{
            return (
            <p className=' font-medium font-poppins' key={index}>{item}</p>
            )
        })}
       </div>
    </div>
  )
}

export default AreaNearBy