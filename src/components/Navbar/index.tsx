"use client";
import { useWeb3 } from "@/providers/web3";
import Link from "next/link";
import { Button } from "../Button";
import { useAccount } from "@/hooks/useAccount";

export const Navbar = () => {
  const { connect, isWeb3Loaded, isLoading, web3 } = useWeb3();
  const { account } = useAccount(web3);

  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between items-center">
            <div>
              <Link
                href="/"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Home
              </Link>
              <Link
                href="/courses"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Courses
              </Link>
            </div>
            <div>
              <Link
                href="/"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Wishlist
              </Link>
              {isLoading ? (
                <Button onClick={connect} disabled={true}>
                  Loading...
                </Button>
              ) : isWeb3Loaded ? (
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
