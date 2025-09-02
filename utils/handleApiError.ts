import { errorToast } from "@/components/Toast";
export const handleApiError = (error: any) => {
  const defaultMessage = 'Something went wrong. Please try again later.';

  // Extract potential sources of errors
  const responseData = error?.data;
  let message = responseData?.message || error?.message || defaultMessage;
  const errors = responseData?.errors;

  if(error?.status === 'FETCH_ERROR'){
    message = 'Something went wrong. Please try again later.';
  }

  if (Array.isArray(errors) && errors.length > 0) {
    // If it's an array of validation errors
    errors.forEach((err: string) => errorToast(err));
  } else {
    // Single error message
    errorToast(message);
  }
};
