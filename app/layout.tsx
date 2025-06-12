import type { Metadata } from "next";
import "./globals.css";
import "../styles/fonts.css"
import { ThemeProvider } from "@/components/theme-provider";
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
                className={`antialiased min-h-screen`}
                style={{
                    fontFamily: "Space Grotesk"
                }}
                suppressHydrationWarning
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar />
                    <div className="pt-10 min-h-screen flex flex-col">
                        {children}
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
