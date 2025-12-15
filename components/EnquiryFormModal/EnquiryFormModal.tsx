import React from 'react'
import Modal from '../Modal/Modal'
import Container from '../atom/Container/Container';
import ModalForm from '../EnquiryForm/ModalForm';
import RegistrationSuccess from '../EnquiryForm/RegistrationSuccess';
import AlreadyEnquired from '../EnquiryForm/AlreadyEnquired';
import { useRouter } from 'next/navigation';

type Props = {
    EnquiryForm: {
        status: boolean;
        id: string;
        count: number;
    };
    setEnquiryForm: React.Dispatch<React.SetStateAction<{
        status: boolean;
        id: string;
        count: number;
    }>>
    promotion?:boolean;
    promotionId?:string;
}

function EnquiryFormModal({ EnquiryForm, setEnquiryForm,promotion,promotionId }: Props) {

    const router = useRouter();

    return (
        <Modal
            isOpen={EnquiryForm.status}
            onClose={() => setEnquiryForm({ status: false, id: '', count: 0 })}
        >
            <Container>
                {/* <div className="relative w-full h-[200px] rounded-[5px]"> */}


                    {EnquiryForm.count === 1 && <ModalForm
                        onClose={() => setEnquiryForm({ status: false, id: '', count: 0 })}
                        item={EnquiryForm}
                        promotionId={promotionId}
                        promotion={promotion}
                        setEnquiry={setEnquiryForm}
                        onSuccessToShowThankYou={()=>{
                            router.push('/thank-you/property-enquiry')

                        }
                        }
                    />}

                    {EnquiryForm.count === 2 && <RegistrationSuccess
                        onClose={() => setEnquiryForm({ status: false, id: '', count: 0 })}

                    />}

                    {EnquiryForm.count === 3 && <AlreadyEnquired
                        onClose={() => setEnquiryForm({ status: false, id: '', count: 0 })}

                    />}

                {/* </div> */}
            </Container>
        </Modal>
    )
}

export default EnquiryFormModal