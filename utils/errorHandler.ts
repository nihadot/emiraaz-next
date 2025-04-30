export const getErrorMessage = (error: any): string => {
    if (!error) return "Error occurred, please try again later";

    // Check if there's an array of errors
    if (Array.isArray(error?.data?.errors) && error.data.errors.length > 0) {
        return error.data.errors.join(", ");
    }

    // Check if there's a specific message
    if (error?.data?.message) return error.data.message;

    // Check for general error message
    if (error?.message) return error.message;

    // Default fallback
    return "Error occurred, please try again later";
};