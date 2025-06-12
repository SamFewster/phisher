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
import { CheckIcon, MailIcon, UserIcon, XIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { generateMailList } from '@/lib/mail';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Page = () => {
    const TOTAL_EMAILS = 10;
    const { resolvedTheme } = useTheme();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const [name, setName] = useState<NameProps>({
        firstName: "",
        lastName: ""
    });

    const [beginGame, setBeginGame] = useState<boolean>(false);
    const [emails, setEmails] = useState<EmailProps[]>([]);
    const [viewingEmail, setViewingEmail] = useState<number | null>(null);
    const [completedEmails, setCompletedEmails] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [incorrectEmails, setIncorrectEmails] = useState<number[]>([]);

    const [openHTPDialog, setOpenHTPDialog] = useState<boolean>(false);
    const [openScoreDialog, setOpenScoreDialog] = useState<boolean>(false);

    useEffect(() => {
        if (beginGame) {
            const emails = generateMailList(TOTAL_EMAILS, name);
            setEmails(emails);
        }
    }, [beginGame, name])

    useEffect(() => {
        if (completedEmails === TOTAL_EMAILS) {
            setOpenScoreDialog(true);
        }
    }, [completedEmails])

    return (
        <div>
            {mounted &&
                <div className='absolute top-0 left-0 max-w-screen max-h-screen min-h-screen min-w-screen flex flex-col items-center justify-center overflow-hidden'>
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
                                    <CardContent className='flex flex-col gap-2 mt-2' onKeyDown={(e) => {
                                        if (e.key == "Enter" && name.firstName.length > 0 && name.lastName.length > 0) {
                                            setBeginGame(true);
                                        }
                                    }}>
                                        <Input placeholder='First Name*' value={name.firstName} onChange={(e) => setName(prev => ({ ...prev, firstName: e.target.value }))} />
                                        <Input placeholder='Last Name*' value={name.lastName} onChange={(e) => setName(prev => ({ ...prev, lastName: e.target.value }))} />
                                        <p className='text-muted-foreground text-center hover:underline select-none cursor-pointer' onClick={() => setOpenHTPDialog(true)}>How to play?</p>
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
                        }} className="flex flex-col flex-1 py-10 max-h-screen justify-center">
                        <div className="flex flex-col p-2 items-center justify-center text-center">
                            <h1 className=''>{completedEmails}/{emails.length} Emails completed</h1>
                            <Progress value={(completedEmails / emails.length) * 100} className='w-full' />
                        </div>
                        <ResizablePanelGroup direction="horizontal" className='rounded-lg border min-w-[900px] max-w-[900px] flex-1 overflow-hidden max-h-[700px]'>
                            <ResizablePanel defaultSize={30} minSize={15} className='flex flex-col overflow-hidden'>
                                <nav className='border border-x-0 border-t-0 flex p-3 justify-start text-center items-center flex-none select-none'>
                                    Inbox
                                    <Button className='opacity-0'>
                                        /
                                    </Button>
                                </nav>
                                <div className="flex flex-col flex-1 max-h-full overflow-hidden">
                                    <ScrollArea className='max-w-full flex-1 max-h-screen overflow-y-auto [&_[data-slot=scroll-area-viewport]>div]:block!'>
                                        <div className="flex flex-col-reverse">
                                            {emails.slice(0, completedEmails + 1).map((email, index) => (
                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}className={cn("flex p-4 gap-4 hover:bg-muted transition-all duration-300 select-none items-center justify-start", viewingEmail === index && "bg-muted/50")} key={index} onClick={() => setViewingEmail(index)}>
                                                    <div className='h-full aspect-square w-[25px] flex items-center justify-center'>
                                                        {completedEmails > index ?
                                                            <>
                                                                {incorrectEmails.includes(index) ? <XIcon className='stroke-incorrect' /> : <CheckIcon className='stroke-correct' />}
                                                            </>
                                                            : <MailIcon />}
                                                    </div>
                                                    <div className="flex flex-col overflow-hidden w-full text-nowrap">
                                                        <h2 className={cn("font-semibold truncate", completedEmails > index && (incorrectEmails.includes(index) ? "text-incorrect" : "text-correct"))}>{email.title}</h2>
                                                        <h1 className="text-muted-foreground text-sm truncate">{email.sender}</h1>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                        <ScrollBar orientation='vertical' />
                                    </ScrollArea>
                                </div>
                            </ResizablePanel>
                            <ResizableHandle />
                            <ResizablePanel defaultSize={70} minSize={40} className='overflow-hidden flex flex-col'>
                                <nav className='border border-x-0 border-t-0 flex p-3 justify-between items-center flex-none select-none'>
                                    <p>Mail View</p>
                                    <Button disabled={typeof viewingEmail === "number" && completedEmails > viewingEmail} variant="outline" className={cn(typeof viewingEmail === "number" ? "opacity-100" : "opacity-0")} onClick={() => {
                                        if (typeof viewingEmail === "number" && !((completedEmails > viewingEmail))) {
                                            setCompletedEmails(prev => (prev + 1));
                                            if (emails[viewingEmail].scam) {
                                                setScore(prev => (prev + 1));
                                            } else {
                                                setIncorrectEmails(prev => ([...prev, viewingEmail]));
                                            }
                                        }
                                    }}>
                                        Report
                                    </Button>
                                </nav>
                                {typeof viewingEmail === "number" ? (
                                    <div className='p-2 overflow-hidden flex-1'>
                                        <div className="flex flex-col overflow-hidden w-full whitespace-pre-wrap gap-2 flex-1 h-full">
                                            <div className="flex flex-none flex-col gap-1">
                                                <h2 className="font-semibold text-xl">{emails[viewingEmail].title}</h2>
                                                <p className="flex gap-2 text-muted-foreground text-nowrap items-center overflow-hidden">
                                                    <UserIcon size={20} className='aspect-square min-w-[20px] max-w-[20px]' />
                                                    {emails[viewingEmail].sender}
                                                </p>
                                            </div>
                                            <Separator className='flex-none' />
                                            <div className="flex flex-1 overflow-hidden grow">
                                                <ScrollArea className='max-w-full flex-1 flex max-h-screen overflow-y-auto'>
                                                    <h1 className="text-muted-foreground text-sm flex-1">
                                                        {emails[viewingEmail].content.split("{link}")[0]}
                                                        <span className='text-primary/90 hover:underline select-none cursor-pointer' onClick={() => {
                                                            if (!(completedEmails > viewingEmail)) {
                                                                setCompletedEmails(prev => (prev + 1));
                                                                if (emails[viewingEmail].scam) {
                                                                    setIncorrectEmails(prev => ([...prev, viewingEmail]));
                                                                } else {
                                                                    setScore(prev => (prev + 1));
                                                                }
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
                        <div className='w-full flex flex-col items-center justify-center mt-10'>
                            <p className='text-center text-muted-foreground'>If you believe an email is legitimate, click the link in its body, otherwise click "Report".</p>
                            <p className="text-muted-foreground/70 text-center hover:underline select-none cursor-pointer w-fit" onClick={() => setOpenHTPDialog(true)}>How to play?</p>
                        </div>
                    </motion.div>}
                </div>
            }
            <Dialog open={openHTPDialog} onOpenChange={(value) => setOpenHTPDialog(value)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>How To Play</DialogTitle>
                    </DialogHeader>
                    <p className='text-muted-foreground text-sm'>
                        Welcome to phisher.io! In this game, you will sift through the inbox of an employee at the Leicester County Council.

                        You will be given {TOTAL_EMAILS} emails, some of which are phishing emails attempting to steal your details. If you believe an email is a phishing email, select "Report". Otherwise, click the link in the email's body to move onto the next email.

                        At the end of the game, you will be given a score out of {TOTAL_EMAILS}.
                    </p>
                </DialogContent>
            </Dialog>
            <Dialog open={openScoreDialog}>
                <DialogContent className="[&>button:last-child]:hidden">
                    <DialogTitle>Congratulations!</DialogTitle>
                    <div className="flex flex-col items-center justify-center text-center">
                        <h2 className='text-md'>In total, you correctly identified {score} out of the {emails.length} total emails.</h2>
                        <h3 className='text-sm text-muted-foreground'>That's {((score / emails.length) * 100).toFixed(2)}%!</h3>
                        <Button className='mt-4' onClick={() => {
                            setOpenScoreDialog(false);
                            setViewingEmail(null);
                            setScore(0);
                            setIncorrectEmails([]);
                            setCompletedEmails(0);
                            setEmails(generateMailList(TOTAL_EMAILS, name));
                        }}>
                            Play Again
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Page