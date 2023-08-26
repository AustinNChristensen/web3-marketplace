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

const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID]

export interface IUseNetworkReturn {
  network: {
    data: string | undefined;
    mutate: any;
    target: string | undefined;
    isSupported: boolean;
    error: any;
    hasFinishedFirstFetch: boolean;
  };
}

export const useNetwork = (web3: any): IUseNetworkReturn => {
  const { data, error, mutate, ...rest } = useSWR(
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
      data,
      mutate,
      error,
      target: targetNetwork,
      hasFinishedFirstFetch: data || error,
      isSupported: targetNetwork === data,
      ...rest,
    },
  };
};
