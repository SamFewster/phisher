import { ShieldIcon } from 'lucide-react'
import React from 'react'

const Logo = () => {
    return (
        <div className='flex gap-1 items-center justify-center'>
            <ShieldIcon />
            <p className='font-bold'>phisher.io</p>
        </div>
    )
}

export default Logo