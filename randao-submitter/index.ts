import { Axiom, AxiomConfig } from "@axiom-crypto/core";
import * as fs from "fs";
import { ethers } from "ethers";

let blockNumber = 9571689;

const config: AxiomConfig = {
    providerUri: "rpc_url",
    version: "v1",
};
const ax = new Axiom(config);

const blockHashWitness = await ax.block.getBlockHashWitness(blockNumber);
const rlpHeader = await ax.block.getBlockRlpHeader(blockNumber);

const storageData = fs.readFileSync("../contracts/artifacts/contracts/RANDAOStorage.sol/RANDAOStorage.json", 'utf-8');
const storageContract = JSON.parse(storageData);

const alchemyProvider = new ethers.AlchemyProvider("goerli", "api_key");
const signer = new ethers.Wallet("private_key", alchemyProvider);
const randaoStorageContract = new ethers.Contract("0xE1Bb2379D0587b73DF50C47ecCf5ce36084B85f1", storageContract.abi, signer);

const tx = await randaoStorageContract.verifyRANDAO(blockHashWitness, rlpHeader);
await tx.wait();