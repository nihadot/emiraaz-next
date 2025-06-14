import { ErrorMessage } from "formik"

const ErrorMessageBox = ({ name }: { name: string }) => {
    return (
        <ErrorMessage name={name} component="div" className="text-red-500 font-normal text-[14px] mt-1" />

    )
}
export default ErrorMessageBox