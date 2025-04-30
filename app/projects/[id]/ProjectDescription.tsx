'use client'

import React, { useState, useEffect } from 'react'
import ProjectHeader from './ProjectHeader'
import Modal from '@/components/Modal/Modal'

interface ProjectDescriptionProps {
    title?: string
    descriptionInArabic: string
    descriptionInEnglish: string
    descriptionInRussian: string
}

const ProjectDescription: React.FC<ProjectDescriptionProps> = ({
    title = 'Description',
    descriptionInArabic,
    descriptionInEnglish,
    descriptionInRussian
}) => {
    const options = [
        { label: 'English', value: 'english' },
        { label: 'Arabic', value: 'arabic' },
        { label: 'Russian', value: 'russian' }
    ]

    const [selected, setSelected] = useState<string>('english')
    const [modalOpen, setModalOpen] = useState(false)
    const [isTruncated, setIsTruncated] = useState(false)
    const [shortDescription, setShortDescription] = useState('')

    const getSelectedDescription = () => {
        switch (selected) {
            case 'arabic':
                return descriptionInArabic
            case 'russian':
                return descriptionInRussian
            case 'english':
            default:
                return descriptionInEnglish
        }
    }
    useEffect(() => {
        const fullDescription = getSelectedDescription()
        if (fullDescription.length > 300) {
            setShortDescription(fullDescription.slice(0, 300) + '...')
            setIsTruncated(true)
        } else {
            setShortDescription(fullDescription)
            setIsTruncated(false)
        }
    }, [selected, descriptionInArabic, descriptionInEnglish, descriptionInRussian])

    const handleSelect = (value: string) => {
        setSelected(value)
    }

    return (
        <div className="space-y-2 ">
            <ProjectHeader title={title} />

            <p className="text-sm text-gray-700">{shortDescription}</p>

            {isTruncated && (
                <button
                    onClick={() => setModalOpen(true)}
                    className="text-[#FF1645] font-medium font-poppins bg-[#FFE7EC]  px-3 py-[8px] rounded text-sm"
                >
                    Read more
                </button>
            )}

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <div className="p-4 overflow-y-scroll h-full max-h-[80vh] pe-4 w-full  max-w-[1200px]">
                    <div className="flex flex-row h-12 mb-4 items-center px-1 py-1 text-sm gap-2 rounded-md bg-white border border-[#DEDEDE] w-full">
                        {options.map((item) => (
                            <button
                                key={item.value}
                                className={`font-normal gap-2 font-poppins text-[14px] rounded-md px-4 py-1 h-full flex items-center justify-center transition-all w-full duration-200 ${selected === item.value
                                        ? 'bg-red-600/10 text-red-600'
                                        : 'bg-white text-black hover:text-red-600 hover:bg-red-100'
                                    }`}
                                onClick={() => handleSelect(item.value)}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Description Content */}
                    <Content title={title} description={getSelectedDescription()} />
                </div>
            </Modal>


        </div>
    )
}

export default ProjectDescription

type ContentProps = {
    title: string
    description: string
}

function Content({ title, description }: ContentProps) {
    return (
        <div>
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <p className="text-sm text-gray-800 whitespace-pre-line">{description}</p>
        </div>
    )
}
