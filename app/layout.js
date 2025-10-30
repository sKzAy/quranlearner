import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AOSAnimate from "./components/aos";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Quran Explorer",
  description: "A website for you to learn YOUR Quran.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        <AOSAnimate/>
        <Toaster/>
         {/* <Footer/> */}
      </body>
    </html>
    </ClerkProvider>
  );
}
