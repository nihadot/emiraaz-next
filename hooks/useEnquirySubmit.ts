import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { errorToast } from "@/components/Toast";
import { LOCAL_STORAGE_KEYS } from "@/api/storage";
import { baseUrl } from "@/api";
import { closeEnquiry, openSuccessEnquiry } from "@/redux/enquiry/enquiry";

export function useEnquirySubmit() {
    const [loading, setLoading] = useState(false);
    const [sucess, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const { projectId } = useSelector((state: RootState) => state.enquiry);
    const dispatch = useDispatch();

    const submitEnquiry = async (formData: { name: string; number: string }) => {


        if (!projectId) {
            return errorToast("Please select a Project then submit");
        }

        try {
            setLoading(true);

            const payload: any = {
                name: formData.name,
                number: formData.number,
                ...(projectId && { projectId }),
            };

            const userDataString = localStorage.getItem(
                LOCAL_STORAGE_KEYS.USER_DATA
            );

            if (userDataString) {
                const userData = JSON.parse(userDataString);
                if (userData?._id) payload.userId = userData._id;
            }

           
                 let response = await axios.post(`${baseUrl}/enquiry`, payload);
            setSuccess(true);

            dispatch(closeEnquiry());
            dispatch(openSuccessEnquiry());

            return response;
        } catch (error: any) {
            errorToast(
                error?.response?.data?.message ||
                error?.message ||
                "Error occurred, please try again later"
            );
            setError(true);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { submitEnquiry, loading,error,sucess };
}
