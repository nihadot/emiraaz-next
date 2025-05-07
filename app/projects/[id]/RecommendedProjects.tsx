import React, { useCallback, useState } from 'react'
import ProjectHeader from './ProjectHeader'
import Card from '@/components/ProjectCard/Card'
import { AllProjectsItems } from '@/redux/project/types'
import ProjectCard from '@/components/ProjectCard/ProjectCard'
import { useRouter } from 'next/navigation'
import Modal from '@/components/Modal/Modal'
import ModalForm from '@/components/EnquiryForm/ModalForm'
import RegistrationSuccess from '@/components/EnquiryForm/RegistrationSuccess'

type Props = { projects: AllProjectsItems[] }

function RecommendedProjects({ projects }: Props) {

    const router = useRouter();
     const handleClick = useCallback((item: AllProjectsItems) => {
            router.push(`/projects/${item.slug}`);
        }, [router]);
    const [EnquiryForm, setEnquiryForm] = useState({ status: false, id: '', count: 0 });


        const handleEnquiryFormClick = useCallback((item: any) => {
            setEnquiryForm({
                status: true,
                id: item._id,
                count: 1,
            });
        }, []);
    return (
        <div className='py-5'>
            <div className="pt-3">

                <ProjectHeader
                contentClassName='font-medium mb-[16.5px] text-[17px] sm:text-[18.75px]'
                    title='Recommended For You'
                />
            </div>

            <div className="sm:grid hidden gap-[21px] my-2 md:grid-cols-3  w-full">
                {projects && projects.map((item, index) => {
                    return (
                        <Card
                        key={index}
                        item={item}
                    />
                    )
                })}
            </div>



            <div className="sm:hidden flex overflow-x-auto  gap-[21px] my-2  sm:w-full">
                {projects && projects.map((item, index) => {
                    return (
                     
                    <ProjectCard
                    key={index}
                    item={item}
                    handleClick={handleClick}
                    handleEnquiryFormClick={handleEnquiryFormClick}
                />
                    )
                })}
            </div>


              <Modal
                                isOpen={EnquiryForm.status}
                                onClose={() => setEnquiryForm({ status: false, id: '', count: 0 })}
                            >
                                {EnquiryForm.count === 1 && <ModalForm
                                    item={EnquiryForm}
                                    setEnquiry={setEnquiryForm}
                                />}
                                {EnquiryForm.count === 2 && <RegistrationSuccess />}
            
                            </Modal>
        </div>
    )
}

export default RecommendedProjects