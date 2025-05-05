import React from 'react'
import WrapperProps from './type'


const Wrapper: React.FC<WrapperProps> = ({children}) => {
    return (
        <section className='max-w-[1100px] m-auto'>
            {children}
        </section>
    )
}

export default Wrapper