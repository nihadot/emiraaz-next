import { baseUrl } from "@/api";
import { LOCAL_STORAGE_KEYS } from "@/api/storage";
import { notes_icon, save_icon, share_button_icon } from "@/app/assets";
import Container from "@/components/atom/Container/Container";
import PrimaryButton from "@/components/Buttons";
import AlreadyEnquired from "@/components/EnquiryForm/AlreadyEnquired";
import ModalForm from "@/components/EnquiryForm/ModalForm";
import RegistrationSuccess from "@/components/EnquiryForm/RegistrationSuccess";
import Modal from "@/components/Modal/Modal";
import { errorToast, successToast } from "@/components/Toast";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { PiNotePencil } from "react-icons/pi";

type Props = {
    currency: string
    value: string;
    title: string;
    projectId: string;
}

interface UserData {
    _id: string;
    // Add more fields if needed
}
const StickyScrollHeader = ({ value, currency, title, projectId }: Props) => {
    const [showHeader, setShowHeader] = useState(false);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    setShowHeader(scrollY > 800);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

        const [EnquiryForm, setEnquiryForm] = useState({ status: false, id: '', count: 0 });
    

  const [formData, setFormData] = useState({
        name: '',
        number: '',
    });
    const [loading, setLoading] = useState(false);


      const handleEnquiryFormClick = useCallback(() => {
            setEnquiryForm({
                status: true,
                id: projectId,
                count: 1,
            });
        }, []);

       const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
    
    
            // Simple validation
            if (!formData.name.trim()) {
                return errorToast('Please enter your name.');
            }
    
            if (!formData.number || formData.number.length < 6) {
                return errorToast('Please enter a valid mobile number.');
            }
 
    
            try {
                setLoading(true);
    
    
                const payload: any = {
                    name: formData.name,
                    number: formData.number,
                    projectId
                };
    
                const userDataString = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);
              
    
                if (userDataString) {
                   
                        const userData: UserData = JSON.parse(userDataString);
                        if(userData) payload.userId = userData._id
                }

    
                await axios.post(`${baseUrl}/enquiry`, payload);
           
                setEnquiryForm((prev: any) => ({
                    ...prev,
                    count: 2,
                }))
                successToast('Enquiry submitted successfully!');
                setFormData({ name: '', number: '' });
            } catch (error: any) {
                errorToast(error?.response?.data?.message || error?.data?.message || error?.response?.message || error?.message || 'Error occurred, please try again later');
                // console.error(err);
            } finally {
                setLoading(false);
            }
        };
    


    return (
        <>
            {showHeader && (
                <div className="bg-white shadow-md z-40 w-full top-0 left-0 fixed hidden md:block">
                    <Container>
                   <div className="flex items-center font-poppins justify-between text-black font-semibold text-center">
                        <div className="flex flex-col items-start justify-start py-3">
                            <h3 className="text-[18px] font-medium font-poppins ">{title}</h3>
                            <h4 className='text-[18px] font-poppins  font-semibold'>
                                <span className="text-[12px] font-semibold font-poppins">{currency}</span> {value}
                            </h4>
                        </div>
                        {/* <div className="flex gap-3 h-10">

                            <PrimaryButton
                                type="button"

                            >
                                <div className="flex items-center gap-2">
                                    <Image src={save_icon} alt="save icon" width={21} />
                                    <label className="text-sm font-light text-[#FF1645] font-poppins">Save</label>
                                </div>
                            </PrimaryButton>
                            <PrimaryButton
                                type="button"
                                className="bg-[#FFE7EC] border-none text-[#FF1645] font-poppins rounded "

                            >

                                <div className="flex items-center gap-2">
                                    <Image src={share_button_icon} alt="share icon" width={21} />
                                    <label className="text-sm font-light text-[#FF1645] font-poppins">Share </label>
                                </div>
                            </PrimaryButton>
                        </div> */}

                        <PrimaryButton
                        onClick={()=>handleEnquiryFormClick()}
                            type="button"
                            className="flex max-w-full w-[160px] h-[36px] items-center gap-2 rounded border-none bg-[#FF1645]"
                        > <PiNotePencil
                                          className="w-[18px] h-[18px]"
                                          color="white"
                                        />   
                                        {/* <Image src={notes_icon} alt="enquiry icon" width={16.5} height={16.5} /> */}
                            <span className="text-[14px] text-white text-nowrap">Enquire Now</span>
                        </PrimaryButton>




                        
 <Modal
                    isOpen={EnquiryForm.status}
                    onClose={() => setEnquiryForm({ status: false, id: '', count: 0 })}
                >
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
                </Modal>
                    </div>
                   </Container>
                </div>
            )}
        </>
    );
};

export default StickyScrollHeader;
