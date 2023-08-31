export const convertValueToHex = (value: string | number, web3: any) => {
  let hexValue = web3.utils.utf8ToHex(value);

  while (hexValue.slice(2).length < 32) {
    hexValue += "0";
  }

  return hexValue;
};
