"use client"
import { cn } from '@/lib/utils'
import React from 'react'
import { useTheme } from 'next-themes'

const Logo = ({ className }: { className?: string }) => {
    const { resolvedTheme } = useTheme();
    return (
        <div className={cn('flex gap-1 items-center justify-center', className)}>
            <img src={resolvedTheme === "light" ? "logo_light.png" : "logo_dark.png"} alt="phisher.io Logo" className='h-5'/>
            <p className='font-bold'>phisher.io</p>
        </div>
    )
}

export default Logo