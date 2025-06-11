import type { Metadata } from "next";
import "./globals.css";
import "../styles/fonts.css"
import { ThemeProvider } from "@/components/theme-provider";
import { Space_Grotesk } from "next/font/google"
import Logo from "@/components/logo";
import { ThemeSwitcher } from "@/components/ui/kibo-ui/theme-switcher";
import { useTheme } from "next-themes";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
    title: "phisher.io",
    description: "The #1 cybersecuity education platform",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`antialiased`}
                style={{
                    fontFamily: "Space Grotesk"
                }}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar />
                    <div className="pt-10">
                        {children}
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
