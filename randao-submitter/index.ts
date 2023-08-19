// Setup: npm install alchemy-sdk
import { Alchemy, Network, AlchemyEventType } from "alchemy-sdk";

// Optional config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_GOERLI, // Replace with your network.
};

const alchemy = new Alchemy(settings);

// Subscription for new blocks on Eth Mainnet.
alchemy.ws.on("block", (blockNumber) =>
  console.log("The latest block number is", blockNumber)
);