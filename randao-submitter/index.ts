// Setup: npm install alchemy-sdk
import { Alchemy, BlockTag, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_GOERLI, // Replace with your network.
};

const alchemy = new Alchemy(settings);

// This is the "randomnessRequested" event topic we want to watch.
const randomnessRequestedTopic = "";
// This is the contract we want to watch.
const contractAddress = "";

// Create the log options object.
const randomnessRequestedEvents = {
    address: contractAddress,
    topics: [randomnessRequestedTopic],
  };

let blocksRequested: number[] = [];
  
const recordRandomnessRequested = (txn: any) => {
    // TODO: Get the block number from the randomness request.
    let blockNumber = 420;

    // If we haven't already seen this block number, add it to the list.
    if (!blocksRequested.includes(blockNumber)) {
      blocksRequested.push(blockNumber);
      console.log(`Randomness requested in block ${blockNumber}`);
    }
};

// Listen for randomnessRequested events.
alchemy.ws.on(randomnessRequestedEvents, recordRandomnessRequested);

// Subscription for new blocks.
alchemy.ws.on("block", async (blockNumber) => {
    console.log("The latest block number is", blockNumber);
    if (blocksRequested.includes(blockNumber)) {
        let number: BlockTag = blockNumber;
        let response = await alchemy.core.getBlock(number)

        //Logging the RANDAO
        console.log(response.difficulty);

        // TODO: Submit a transaction onchain to provide the RANDAO to the contract
        console.log("Fulfilled randomness for block", blockNumber);
    }
}
);