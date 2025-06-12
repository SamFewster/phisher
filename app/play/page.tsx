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
import { EmailProps, NameProps } from '@/lib/types';
import { AnimatePresence, motion } from "motion/react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { MailIcon, UserIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { generateMailList } from '@/lib/mail';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const Page = () => {
    const { resolvedTheme } = useTheme();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const [name, setName] = useState<NameProps>({
        firstName: "",
        lastName: ""
    });

    const [beginGame, setBeginGame] = useState<boolean>(true);
    const [emails, setEmails] = useState<EmailProps[]>([]);
    const [viewingEmail, setViewingEmail] = useState<number | null>(null);
    const [completedEmails, setCompletedEmails] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [incorrectEmails, setIncorrectEmails] = useState<number[]>([]);

    useEffect(() => {
        if (beginGame) {
            const emails = generateMailList(2, name);
            setEmails(emails);
        }
    }, [beginGame, name])

    return (
        <div>
            {mounted &&
                <div className='fixed max-w-screen max-h-screen min-h-screen min-w-screen flex flex-col items-center justify-center overflow-hidden'>
                    {/* PRE GAME SCREEN */}
                    <AnimatePresence>
                        {!beginGame && <motion.div
                            initial={{
                                y: -200,
                                opacity: 0
                            }}
                            animate={{
                                y: 0,
                                opacity: 100
                            }}
                            transition={{
                                duration: 0.7,
                                ease: "easeInOut",
                                type: "spring",
                                stiffness: 70
                            }}
                            exit={{
                                y: 500,
                                opacity: 0
                            }}
                            className='fixed'
                        >
                            <Card className="max-w-[500px] p-0">
                                <MagicCard className='p-3' gradientColor={resolvedTheme === "dark" ? "#262626" : "#cccccc"}>
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
                        </motion.div>}
                    </AnimatePresence>

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
                        <div className="flex flex-col p-2 items-center justify-center text-center">
                            <h1 className=''>{completedEmails}/{emails.length} Emails completed</h1>
                            <Progress value={(completedEmails / emails.length) * 100} className='w-full' />
                        </div>
                        <ResizablePanelGroup direction="horizontal" className='rounded-lg border min-w-[900px] max-w-[900px] min-h-[700px] max-h-[700px] overflow-hidden'>
                            <ResizablePanel defaultSize={30} minSize={15} className='flex flex-col'>
                                <nav className='border border-x-0 border-t-0 flex p-3 justify-start text-center items-center'>
                                    Inbox
                                    <Button className='opacity-0'>
                                        /
                                    </Button>
                                </nav>
                                <div className="flex flex-col-reverse">
                                    {emails.slice(0, completedEmails + 1).map((email, index) => (
                                        <div className={cn("flex p-4 gap-4 hover:bg-muted transition-all duration-300 select-none", viewingEmail === index && "bg-muted/50")} key={index} onClick={() => setViewingEmail(index)}>
                                            <MailIcon className='h-full aspect-square min-w-[25px]' />
                                            <div className="flex flex-col overflow-hidden w-full text-nowrap">
                                                <h2 className="font-semibold truncate">{email.title}</h2>
                                                <h1 className="text-muted-foreground text-sm truncate">{email.sender}</h1>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ResizablePanel>
                            <ResizableHandle />
                            <ResizablePanel defaultSize={70} minSize={40} className='max-h-[700px] overflow-hidden'>
                                <nav className='border border-x-0 border-t-0 flex p-3 justify-between items-center'>
                                    <p>Mail View</p>
                                    <Button variant="outline" className={cn(typeof viewingEmail === "number" ? "opacity-100" : "opacity-0")}>
                                        Report
                                    </Button>
                                </nav>
                                {typeof viewingEmail === "number" ? (
                                    <div className='p-2 overflow-hidden'>
                                        <div className="flex flex-col overflow-hidden w-full whitespace-pre-wrap gap-2">
                                            <div className="flex flex-col gap-1">
                                                <h2 className="font-semibold text-xl">{emails[viewingEmail].title}</h2>
                                                <p className="flex gap-2 text-muted-foreground text-nowrap items-center overflow-hidden">
                                                    <UserIcon size={20} className='aspect-square min-w-[20px] max-w-[20px]' />
                                                    {emails[viewingEmail].sender}
                                                </p>
                                            </div>
                                            <Separator />
                                            <div className="flex flex-1">
                                                <ScrollArea className='max-w-full flex-1 max-h-[520px] flex [&_[data-slot=scroll-area-viewport]>div]:block!'>
                                                    <h1 className="text-muted-foreground text-sm flex-1">
                                                        {emails[viewingEmail].content.split("{link}")[0]}
                                                        <span className='text-primary/90 hover:underline select-none cursor-pointer' onClick={() => {
                                                            setCompletedEmails(prev => (prev + 1));
                                                            if (emails[viewingEmail].scam) {
                                                                setIncorrectEmails(prev => ([...prev, viewingEmail]));
                                                            } else {
                                                                setScore(prev => (prev + 1));
                                                            }
                                                        }}>
                                                            {emails[viewingEmail].link}
                                                        </span>
                                                        {emails[viewingEmail].content.split("{link}")[1]}
                                                    </h1>
                                                    <ScrollBar orientation='vertical' />
                                                </ScrollArea>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex justify-center items-center h-full w-full'>
                                        <p className='text-muted-foreground'>No email selected</p>
                                    </div>
                                )}
                            </ResizablePanel>
                        </ResizablePanelGroup>
                        <p className='text-center mt-10 text-muted-foreground'>If you believe an email is legitimate, click the link in its body, otherwise click "Report".</p>
                    </motion.div>}
                </div>
            }
        </div>
    )
}

export default Page