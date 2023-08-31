const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID as string;

export const loadContract = async (web3: any, contractName: string) => {
  console.log('NETWORK ID', NETWORK_ID)
  const res = await fetch(`/contracts/${contractName}.json`);

  const Artifact = await res.json();

  let contract = null;

  try {
    contract = new web3.eth.Contract(
      Artifact.abi,
      Artifact.networks[NETWORK_ID].address
    );
  } catch (e) {
    console.error(e);
  }

  return contract;
};
