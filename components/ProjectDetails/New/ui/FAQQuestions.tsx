import clsx from "clsx";
import ToggleButton from "./ToggleButton";

export default function FAQQuestions({ values }: {
    values: {
        question: string;
        answer: string;
        _id: string;
    }[] | undefined
}) {
    // console.log('first')
    // console.log(values,'values')

    return (
        <div className='max-w-[880px] w-full mt-10 md:mt-3 mb-0'>

            <h2 className='font-poppins font-medium text-[18px] mb-3 '>Frequently Asked Questions</h2>

            {values?.map((item) => {
                return (<ToggleButton
                    key={item._id}
                    title={item?.question}

                >
                    <>

                        <Paragraph
                            content={item?.answer}
                        />

                    </>
                </ToggleButton>

                )
            })}
        </div>
    )
}



function Paragraph({
    content,
    className
}: {
    content: string,
    className?: string
}) {
    return (
        <p className={clsx('font-poppins font-normal text-[10.5px] sm:text-[12px] text-[#767676]', className)}>
            {content}
        </p>
    )
}
