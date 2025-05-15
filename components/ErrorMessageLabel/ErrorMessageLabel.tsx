import { ErrorMessage } from 'formik'
import React from 'react'

function ErrorMessageLabel({name}: {name:string}) {
  return (
                                        <ErrorMessage name={name} component="div" className="text-red-500 font-poppins font-normal text-[14px] mt-1" />
    
  )
}

export default ErrorMessageLabel