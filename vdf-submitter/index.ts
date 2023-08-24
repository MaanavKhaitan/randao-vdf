import { Alchemy, BlockTag, Network, Utils, Wallet } from "alchemy-sdk";
import { generateProof } from "./utils/snark-utils";
import * as fs from "fs";
import { ethers } from "ethers";

// changes for each run of the script
const BLOCK_NUMBER = 12;

const VDF_WASM_FILE_PATH = "utils/mimc_vdf.wasm";
const VDF_ZKEY_FILE_PATH = "utils/mimc_vdf.zkey";

const ABI_FILE_PATH = '../contracts/artifacts/contracts/RandomnessProvider.sol/RandomnessProvider.json';

const RANDOMNESS_PROVIDER_ADDRESS = "0x1111111111111111111111111111111111111111111"

const settings = {
  apiKey: "", // Replace with your Alchemy API Key.
  network: Network.ETH_GOERLI, // Replace with your network.
};

async function main() { 
  const alchemy = new Alchemy(settings);

  // Read the JSON file
  const randomnessProviderData = fs.readFileSync(ABI_FILE_PATH, 'utf-8');
  // Parse the JSON data
  const randomnessProviderContract = JSON.parse(randomnessProviderData);

  // Provider
  const alchemyProvider = new ethers.AlchemyProvider("goerli", "your-api-key");

  // Signer
  const signer = new ethers.Wallet("your-private-key", alchemyProvider);

  // Contract
  const randomnessProvider = new ethers.Contract(RANDOMNESS_PROVIDER_ADDRESS, randomnessProviderContract.abi, signer);

  // calculate the VDF and generate a proof
  const [vdfProof, vdfPublicSignals] = await generateProof(
      { a: 25, b: 77 },
      VDF_WASM_FILE_PATH,
      VDF_ZKEY_FILE_PATH
  );

  console.log("vdfProof", vdfProof);
  console.log("vdfPublicSignals", vdfPublicSignals);

  const tx = await randomnessProvider.submitVDFRandomness(
    BLOCK_NUMBER,
    vdfProof[0],
    vdfProof[1],
    vdfProof[2],
    vdfPublicSignals
  );

  await tx.wait();

}

main();








// import { Alchemy, BlockTag, Network, Utils, Wallet } from "alchemy-sdk";
// import { generateProof } from "./utils/snark-utils";

// const VDF_WASM_FILE_PATH = "utils/mimc_vdf.wasm";
// const VDF_ZKEY_FILE_PATH = "utils/mimc_vdf.zkey";

// const RANDOMNESS_PROVIDER_ADDRESS = "0x1111111111111111111111111111111111111111111"

// const settings = {
//   apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
//   network: Network.ETH_GOERLI, // Replace with your network.
// };

// const alchemy = new Alchemy(settings);
// const wallet = new Wallet(process.env.PRIVATE_KEY, alchemy);

// // calculate the VDF and generate a proof
// const [vdfProof, vdfPublicSignals] = await generateProof(
//     { a: BigInt },
//     VDF_WASM_FILE_PATH,
//     VDF_ZKEY_FILE_PATH
// );

// // prepare the transaction
// const transaction = {
//   to: RANDOMNESS_PROVIDER_ADDRESS,
//   value: Utils.parseEther("0.001"),
//   gasLimit: "21000",
//   maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
//   maxFeePerGas: Utils.parseUnits("20", "gwei"),
//   nonce: await alchemy.core.getTransactionCount(wallet.getAddress()),
//   type: 2,
//   chainId: 5, // Corresponds to ETH_GOERLI
// };

// const rawTransaction = await wallet.signTransaction(transaction);
// await alchemy.transact.sendTransaction(rawTransaction);

// https://docs.alchemy.com/reference/using-the-alchemy-sdk#how-to-send-a-transaction-to-the-blockchain
// wallet: https://stackoverflow.com/questions/75101978/re-send-a-transaction-using-alchemy-to-speed-up-erc20-transaction
// https://ethereum.stackexchange.com/questions/145266/not-able-to-send-transaction-using-alchemy-sdk
// :( https://www.alchemy.com/blog/goerli-faucet-deprecation