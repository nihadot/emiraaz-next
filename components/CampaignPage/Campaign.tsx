'use client'
import { useFetchCampaignByIdQuery } from "@/redux/campaign/campaignApi";
import { useEffect, useState } from "react";
import Container from "../atom/Container/Container";
import { AnimatePresence, motion } from "framer-motion";
import Progress from "./Progress";
import Backward from "./Backward";
import QuestionsForm from "./QuestionsForm";
import ContinueButton from "./ContinueButton";
import ContactForm from "./ContactForm";
import { useRouter } from "next/navigation";
import Loader from "../Loader/Loader";
import Image from "next/image";
import { registration_success } from "@/app/assets";
import clsx from "clsx";

type Props = {
    slug: string;
};

const Campaign = ({ slug }: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<any[]>([]);
    const { data: questionsData, isLoading: loading } = useFetchCampaignByIdQuery({ slug });
    const [questions, setQuestions] = useState<{
        question: string;
        options: string[];
        _id: string;
    }[]>();
    const [leadContent, setLeadContent] = useState<{
        title: string;
        content: string;
    }>();
    const navigate = useRouter();

    useEffect(() => {
        setQuestions(questionsData?.data?.questions);
        if (questionsData?.data) {
            setLeadContent({
                title: questionsData?.data?.title,
                content: questionsData?.data?.content,
            });
        }
    }, [questionsData?.data]);

    const currentQuestion = questions?.[currentIndex];
    const isLast = currentIndex === questions?.length;

    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, _setIsLoading] = useState(false);

    // console.log(currentQuestion)

    const handleNext = () => {
        if (!currentQuestion) return;
        const hasAnswer = selectedAnswer.some(a => a.questionId === currentQuestion._id);
        if (!hasAnswer) return;
        setCurrentIndex(prev => prev + 1);
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                navigate.push("/");
            }, 2000); // 2 seconds delay

            return () => clearTimeout(timer); // cleanup
        }
    }, [isSuccess, navigate]);


    return (
        <>
            {loading ? <Loader /> :


                <div className="w-full relative h-dvh flex items-center justify-center overflow-hidden">
                    {isSuccess && <div className="absolute  top-0 left-0 h-dvh flex justify-center items-center bg-white w-full" >
                        <Container>
                            <div className=" sm:w-[436px] w-full m-auto relative">
                                <div className='rounded-[5px] flex justify-center flex-col px-4 items-center  gap-2  py-10'>
                                    <p className={clsx('text-[18px] font-medium font-poppins text-center')}>Your Application Has Been Submitted</p>
                                    <p className='text-[12px] font-poppins font-light text-center'>Thank you for your interest. Our expert will be in touch shortly to discuss your options.</p>
                                    <Image src={registration_success} alt="location icon" width={120} height={120} className="object-cover" />
                                </div>
                            </div>
                        </Container>
                    </div>}
 
                    { !isSuccess && <div className="relative   z-10 w-full pt-0">
                        <motion.div
                            layout
                            className=" max-w-[480px] m-auto px-4 relative bg-opacity-90 py-[24px] w-full flex flex-col justify-center"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            {questions && questions.length > 0 && (
                                <Progress currentIndex={currentIndex} questions={questions} />
                            )}

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}

                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="rounded-[12px] p-[20px] border border-[#DEDEDE] "
                                >
                                    {currentIndex > 0 && (
                                        <div onClick={handlePrevious} className="cursor-pointer pb-3 w-fit">
                                            <Backward />
                                        </div>
                                    )}

                                    {questions && currentQuestion && (
                                        <QuestionsForm
                                            questions={currentQuestion}
                                            setSelectedAnswer={setSelectedAnswer}
                                            selectedAnswer={selectedAnswer}
                                            leadContent={leadContent}
                                            currentIndex={currentIndex}
                                        />
                                    )}

                                    {
                                        isLast && selectedAnswer.length > 0 && <ContactForm
                                            selectedAnswer={selectedAnswer}
                                            setSelectedAnswer={setSelectedAnswer}
                                            setIsSuccess={setIsSuccess}
                                            slug={slug}
                                        />
                                    }

                                    {/* <pre>
                                    {JSON.stringify(selectedAnswer, null, 2)}
                            </pre> */}

                                    {!isLast && <ContinueButton
                                        handleClick={handleNext}
                                        isSubmitting={isLoading}
                                        disabled={
                                            !currentQuestion ||
                                            !selectedAnswer.some(a => a.questionId === currentQuestion._id)
                                        }
                                    />
                                    }

                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </div>}
                </div>
            }

        </>

    );
};

export default Campaign;






















