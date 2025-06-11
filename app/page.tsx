import React from 'react'
import { AuroraText } from "@/components/magicui/aurora-text";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import Link from 'next/link';

const Page = () => {
    return (
        <div>
            <div className='flex flex-col gap-2 justify-center items-center text-center'>
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
        </div>
    )
}

export default Page