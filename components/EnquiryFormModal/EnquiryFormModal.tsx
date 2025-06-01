import React from 'react'
import Modal from '../Modal/Modal'
import Container from '../atom/Container/Container';
import ModalForm from '../EnquiryForm/ModalForm';
import RegistrationSuccess from '../EnquiryForm/RegistrationSuccess';
import AlreadyEnquired from '../EnquiryForm/AlreadyEnquired';

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
}

function EnquiryFormModal({ EnquiryForm, setEnquiryForm }: Props) {
    return (
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
    )
}

export default EnquiryFormModal