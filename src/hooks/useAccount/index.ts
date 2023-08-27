'use client';
import { useEffect } from "react";
import useSWR from "swr";

const adminAddresses = ['0xf0f99ab334921dd13a1d7ff08ca134f5e39477f5bcd2b77d5b8cb1915f6f3811'];

export const useAccount = (web3: any) => {
  const { mutate, ...rest } = useSWR(
    () => (web3 ? "web3/accounts" : null),
    async () => {
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
    }
  );

  useEffect(() => {
    // @ts-ignore
    window.ethereum?.on("accountsChanged", (accounts: any[]) =>
      mutate(accounts[0] ?? null)
    );
  }, [mutate]);

    return {
        account: {
            mutate,
            ...rest,
            isAdmin: web3 ? adminAddresses.includes(web3.utils.keccak256(rest.data ?? '')) : false,
        }
    };
};
