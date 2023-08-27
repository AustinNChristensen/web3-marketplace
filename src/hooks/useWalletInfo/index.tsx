import { useWeb3 } from "@/providers/web3";
import { useAccount } from "../useAccount";
import { useNetwork } from "../useNetwork";

export const useWalletInfo = () => {
  const { web3 } = useWeb3();
  const { account } = useAccount(web3);
  const { network } = useNetwork(web3);

  return {
    account,
    network,
    canPurchaseCourse: !!(account.data && network.isSupported),
  };
};
