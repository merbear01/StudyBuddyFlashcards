import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Image from 'next/image';
import Script from 'next/script';  // Import Script component from Next.js


const inter = Inter({ subsets: ["latin"] });

export const metadata={
    title: "STUDY BUDDY",
    description: "Create and study flashcards with ease",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ClerkProvider>
            <header className="app-header">
                <div className="logo-container">
                    <Image
                        src="/creativity.png" // Path to the logo file in the public folder
                        alt="Study Buddy Flashcards Logo"
                        width={50}
                        height={50}
                        priority // Load the image with high priority
                    />
                </div>
            </header>
            <main>
                {children}
            </main>
        </ClerkProvider>
        <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-Q5QB8JDFPK"
            strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
            {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-Q5QB8JDFPK');
                    `}
        </Script>
        </body>
        </html>
    );
}
