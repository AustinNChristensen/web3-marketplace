"use client";

import { useAccount } from "@/hooks/useAccount";
import { useWeb3 } from "@/providers/web3";
import { ActiveLink } from "../ActiveLink";
import { Button } from "../Button";

export const Navbar = () => {
  const { connect, isLoading, web3, isMetamaskInstalled } = useWeb3();
  const { account } = useAccount(web3);

  return (
    <section>
       <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
         <nav className="relative" aria-label="Global">
           <div className="flex justify-between items-center">
             <div>
               <ActiveLink
                 href="/"
               >
                 Home
               </ActiveLink>
               <ActiveLink
                 href="/courses"
               >
                 Courses
               </ActiveLink>
             </div>
             <div>
               <ActiveLink
                 href="/"
               >
                 Wishlist
               </ActiveLink>
               {isLoading ? (
                 <Button onClick={connect} disabled={true}>
                   Loading...
                 </Button>
               ) : isMetamaskInstalled ? (
                   account.data ?
                     account.isAdmin ? (
                     <Button onClick={connect}>Hello Admin</Button>
                 ) :   <Button onClick={connect}>{account.data}</Button> : (
                   <Button onClick={connect}>Connect</Button>
                 )
               ) : (
                 <a
                   href={
                     "https://support.metamask.io/hc/en-us/articles/360015489531-Getting-started-with-MetaMask"
                   }
                   target={"_blank"}
                   rel={"noreferrer"}
                   className="px-8 py-3 border rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                 >
                   Install Metamask
                 </a>
               )}
             </div>
           </div>
         </nav>
       </div>
    </section>
  );
};
