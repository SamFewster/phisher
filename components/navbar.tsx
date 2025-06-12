"use client"
import { useTheme } from 'next-themes'
import Link from 'next/link'
import React from 'react'
import Logo from './logo'
import { ThemeSwitcher } from './ui/kibo-ui/theme-switcher'

const Navbar = () => {
    const { theme, setTheme } = useTheme()
    return (
        <div className='fixed p-2 flex justify-between w-full z-[10]'>
            <Link href="/">
                <Logo />
            </Link>
            <ThemeSwitcher defaultValue="system" value={theme as "dark" | "light" | "system" | undefined} onChange={setTheme} />
        </div>
    )
}

export default Navbar