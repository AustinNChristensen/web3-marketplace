import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { Web3Provider } from "@/providers/web3";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <Web3Provider>
      <html lang="en">
         <body className={inter.className}>
           <div>
             <div className="relative bg-white overflow-hidden">
               <div className="relative max-w-7xl mx-auto px-4">
                 <Navbar />
                 {children}
               </div>
               <Footer />
             </div>
           </div>
         </body>
       </html>
    </Web3Provider>
  );
}
