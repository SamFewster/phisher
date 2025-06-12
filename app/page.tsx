import React from 'react'
import { AuroraText } from "@/components/magicui/aurora-text";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import Link from 'next/link';
import Logo from '@/components/logo';

const Page = () => {
    return (
        <div className='flex flex-col gap-2 justify-center items-center text-center h-full flex-1'>
            <Logo className='scale-[6] py-10'/>
            <div className="flex flex-col pt-7">
                <h1 className='text-7xl font-bold tracking-tighter'>
                    Learn to <AuroraText>protect</AuroraText> yourself
                </h1>
                <p className='text-xl tracking-tighter'>with our real-world simulation game</p>
            </div>
            <Link href="/play">
                <InteractiveHoverButton className='max-w-fit'>
                    Start Learning
                </InteractiveHoverButton>
            </Link>
        </div>
    )
}

export default Page