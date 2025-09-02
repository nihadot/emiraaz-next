import clsx from 'clsx';
import React from 'react'

type Props = {
    questions: {
        question: string;
        options: string[];
        _id: string;
    };
    leadContent?: {
        title: string;
        content: string;
    };
    setSelectedAnswer: (selectedAnswer: any) => void;
    selectedAnswer: any[];
    currentIndex: number;
}

const QuestionsForm = ({
    questions,
    setSelectedAnswer,
    selectedAnswer,
    leadContent,
    currentIndex
}: Props) => {
    const currentSelected = selectedAnswer.find(a => a.questionId === questions._id)?.answer || null;

    const handleSelect = (ans: string) => {
        if (currentSelected === ans) {
            setSelectedAnswer((prev: any[]) =>
                prev.filter(p => p.questionId !== questions._id)
            );
        } else {
            setSelectedAnswer((prev: any[]) => {
                const updated = prev.filter(p => p.questionId !== questions._id);
                return [...updated, { questionId: questions._id, answer: ans }];
            });
        }
    };

    return (
        <div>
            { currentIndex === 0 && <>
            <h3
                className='text-sm font-poppins font-medium capitalize text-left text-black'
                >{leadContent?.title}</h3>
            <p
                className='text-xs mt-1 font-poppins font-normal pb-3 capitalize text-left text-gray-800'
                >{leadContent?.content}</p>
                </>}
            <h2 className='text-base font-poppins font-medium capitalize text-left text-black'>
                {questions.question}
            </h2>
            <div className="grid grid-cols-1 gap-2 mt-3">
                {questions.options.map((ans, index) => (
                    <div
                        onClick={() => handleSelect(ans)}
                        key={index}
                        className={clsx(
                            "font-poppins outline-[#d7d8db] px-3 py-3 rounded-[8px] text-left outline transition-all duration-300 font-normal text-sm cursor-pointer",
                            currentSelected === ans && "bg-[#FFE7EC] text-[#fe1947] outline-none"
                        )}
                    >
                        {ans}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuestionsForm