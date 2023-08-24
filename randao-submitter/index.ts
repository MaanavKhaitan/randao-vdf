// Setup: npm install alchemy-sdk
import { Alchemy, BlockTag, Network } from "alchemy-sdk";
import { Axiom, AxiomConfig } from "@axiom-crypto/core";
import * as fs from "fs";
import { ethers } from "ethers";

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const config: AxiomConfig = {
    providerUri: "",
    version: "v1",
};
const ax = new Axiom(config);

const blockHashWitness = await ax.block.getBlockHashWitness(8381173);
console.log(blockHashWitness);
const settings = {
  apiKey: "", // Replace with your Alchemy API Key.
  network: Network.ETH_GOERLI, // Replace with your network.
};

const alchemy = new Alchemy(settings);
const rlpHeader = await ax.block.getBlockRlpHeader(8381173);
console.log(rlpHeader);

// Read the JSON file
const storageData = fs.readFileSync("../contracts/artifacts/contracts/RANDAOStorage.sol/RANDAOStorage.json", 'utf-8');
// Parse the JSON data
const storageContract = JSON.parse(storageData);

// Read the JSON file
const verifierData = fs.readFileSync("../contracts/artifacts/contracts/VDFVerifier.sol/Groth16Verifier.json", 'utf-8');
// Parse the JSON data
const verifierContract = JSON.parse(verifierData);

// Read the JSON file
const providerData = fs.readFileSync("../contracts/artifacts/contracts/RandomnessProvider.sol/RandomnessProvider.json", 'utf-8');
// Parse the JSON data
const providerContract = JSON.parse(providerData);

// Provider
const alchemyProvider = new ethers.AlchemyProvider("goerli", "");

// Signer
const signer = new ethers.Wallet("", alchemyProvider);

// Contract
const randaoStorageContract = new ethers.Contract("0x21F9B303B83bBDAA4a2bD57d033c2f3c21dF9CED", storageContract.abi, signer);

const tx = await randaoStorageContract.verifyRANDAO(blockHashWitness, `${rlpHeader}`);
console.log(tx);
await tx.wait();

// const randomnessProviderContract = new ethers.Contract("0x4a191E11Ff6b14FbcB1ccC3a61c5a9D80814cd22", providerContract.abi, signer);
// const tx = await randomnessProviderContract.requestRandomness(9971613);
// console.log(tx);