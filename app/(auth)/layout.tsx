import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='h-screen w-full flex-center'>
            {children}
        </div>
    )
}

export default layout
