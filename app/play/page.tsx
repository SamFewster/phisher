"use client"
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { MagicCard } from "@/components/magicui/magic-card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { NameProps } from '@/lib/name';
import { motion, useAnimation } from "motion/react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

const Page = () => {
    const [name, setName] = useState<NameProps>({
        firstName: "",
        lastName: ""
    });
    const [beginGame, setBeginGame] = useState<boolean>(false);

    const preGameDivControls = useAnimation();

    useEffect(() => {
        preGameDivControls.start({
            y: 0,
            opacity: 100
        })
    }, [])

    useEffect(() => {
        if (beginGame) {
            preGameDivControls.start({
                y: 500,
                opacity: 0
            })
        }
    }, [beginGame])

    return (
        <div className='fixed max-w-screen max-h-screen min-h-screen min-w-screen flex flex-col items-center justify-center overflow-hidden'>

            {/* PRE GAME SCREEN */}
            <motion.div
                initial={{
                    y: -200,
                    opacity: 0
                }}
                animate={preGameDivControls}
                transition={{
                    duration: 0.7,
                    ease: "easeInOut",
                    type: "spring",
                    stiffness: 70
                }}
                className='fixed'
            >
                <Card className="max-w-[500px] p-0">
                    <MagicCard className='p-3'>
                        <CardHeader className='text-center'>
                            <CardTitle className='text-2xl'>Welcome to phisher.io!</CardTitle>
                            <CardDescription>Please enter your details to start the game</CardDescription>
                        </CardHeader>
                        <CardContent className='flex flex-col gap-2 mt-2'>
                            <Input placeholder='First Name*' value={name.firstName} onChange={(e) => setName(prev => ({ ...prev, firstName: e.target.value }))} />
                            <Input placeholder='Last Name*' value={name.lastName} onChange={(e) => setName(prev => ({ ...prev, lastName: e.target.value }))} />
                            <p className='text-muted-foreground text-center hover:underline'>How to play?</p>
                            <Button disabled={!(name.firstName.length > 0 && name.lastName.length > 0)} onClick={() => {
                                if (name.firstName.length > 0 && name.lastName.length > 0) {
                                    setBeginGame(true);
                                }
                            }}>
                                Let's Go!
                            </Button>
                        </CardContent>
                    </MagicCard>
                </Card>
            </motion.div>

            {/* GAME SCREEN */}
            {beginGame && <motion.div
                initial={{
                    scale: 0
                }}
                animate={{
                    scale: 1
                }}
                transition={{
                    duration: 0.7,
                    ease: "easeInOut",
                    type: "spring",
                    stiffness: 70
                }}>
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel>One</ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel>Two</ResizablePanel>
                </ResizablePanelGroup>
            </motion.div>}
        </div>
    )
}

export default Page