import React from 'react'
import ProjectHeader from './ProjectHeader'
import Card from '@/components/ProjectCard/Card'
import { AllProjectsItems } from '@/redux/project/types'

type Props = { projects: AllProjectsItems[] }

function RecommendedProjects({ projects }: Props) {
    return (
        <div className='py-5'>
            <div className="pt-3">

                <ProjectHeader
                    title='Recommended For You'
                />
            </div>

            <div className="sm:grid flex overflow-x-auto sm:overflow-auto gap-3 my-2 md:grid-cols-3  w-full">
                {projects && projects.map((item, index) => {
                    return (
                        <Card
                            key={index}
                            item={item}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default RecommendedProjects