import React, { useCallback, useState } from 'react'
import ProjectHeader from './ProjectHeader'
import Card from '@/components/ProjectCard/Card'
import { AllProjectsItems } from '@/redux/project/types'
import ProjectCard from '@/components/ProjectCard/ProjectCard'
import { useRouter } from 'next/navigation'
import Modal from '@/components/Modal/Modal'
import ModalForm from '@/components/EnquiryForm/ModalForm'
import RegistrationSuccess from '@/components/EnquiryForm/RegistrationSuccess'
import AlreadyEnquired from '@/components/EnquiryForm/AlreadyEnquired'
import Container from '@/components/atom/Container/Container'
import SmallCard from '../ProjectCard/SmallCard'
import Link from 'next/link'

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
                          handleClick={handleClick}

              key={index}
              item={item}
            />
          )
        })}
      </div>



      {/* <div className="sm:hidden flex overflow-x-auto  gap-[21px] my-2  sm:w-full">
        {projects && projects.map((item, index) => {
          return (

            <ProjectCard
              navigateDetailsButton={true}
              key={index}
              item={item}
              handleClick={handleClick}
              handleEnquiryFormClick={handleEnquiryFormClick}
            />
          )
        })}
      </div> */}

      <div className="sm:hidden grid grid-cols-2  gap-[12px] my-2  sm:w-full">
        {projects && projects.map((item, index) => {
          return (

            <SmallCard
            key={index}
              // navigateDetailsButton={true}
              // key={index}

              handleClick={handleClick}

              item={item}
            // handleClick={handleClick}
            // handleEnquiryFormClick={handleEnquiryFormClick}
            />

          )
        })}
      </div>


      <Modal
        isOpen={EnquiryForm.status}
        onClose={() => setEnquiryForm({ status: false, id: '', count: 0 })}
      >
        <Container>
          <div className="relative w-full h-[200px] rounded-[5px]">


            {EnquiryForm.count === 1 && <ModalForm
              onClose={() => setEnquiryForm({ status: false, id: '', count: 0 })}
              item={EnquiryForm}
              setEnquiry={setEnquiryForm}
            />}

            {EnquiryForm.count === 2 && <RegistrationSuccess
              onClose={() => setEnquiryForm({ status: false, id: '', count: 0 })}

            />}

            {EnquiryForm.count === 3 && <AlreadyEnquired
              onClose={() => setEnquiryForm({ status: false, id: '', count: 0 })}

            />}

          </div>
        </Container>
      </Modal>
    </div>
  )
}

export default RecommendedProjects