import { useEffect } from "react";
import useSWR from "swr";

const NETWORKS = {
  1: "Ethereum Main Network",
  3: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  42: "Kovan Test Network",
  56: "Binance Smart Chain",
  1337: "Ganache",
}

export const useNetwork = (web3: any) => {
  const { mutate, ...rest } = useSWR(
    () => (web3 ? "web3/network" : null),
    async () => {
      const chainId: keyof typeof NETWORKS = await web3.eth.getChainId()
      return NETWORKS[chainId]
    }
  );

  useEffect(() => {
     window.ethereum?.on("chainChanged", (chainId: string) => {
      mutate(NETWORKS[parseInt(chainId, 16) as keyof typeof NETWORKS])
    })
  }, [mutate]);

  return {
    network: {
      mutate,
      ...rest,
    },
  };
};
