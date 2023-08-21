

// SPDX-License-Identifier: MIT
// WARNING! This smart contract has not been audited.
// DO NOT USE THIS CONTRACT FOR PRODUCTION
// This is an example contract to demonstrate how to integrate an application with the audited production release of AxiomV1.
pragma solidity 0.8.19;

import {IAxiomV1} from "./utils/IAxiomV1.sol";
import {Ownable} from "./utils/Ownable.sol";
import {RLPReader} from "./utils/RLPReader.sol";

contract RANDAOStorage is Ownable {
    using RLPReader for RLPReader.RLPItem;
    using RLPReader for bytes;

    IAxiomV1 public axiomV1Contract;
    uint32 public mergeBlock;

    // mapping between blockNumber and prevRandao
    mapping(uint32 => uint256) public prevRandaos;

    event RandaoProof(uint32 blockNumber, uint256 prevRandao);

    event UpdateAxiomAddress(address newAddress);

    // TODO: get the Axiom address from here: https://docs.axiom.xyz/transparency-and-security/contract-addresses
    constructor(address _axiomAddress, uint32 _mergeBlock) {
        axiomV1Contract = IAxiomV1(_axiomAddress);
        mergeBlock = _mergeBlock;
        emit UpdateAxiomAddress(_axiomAddress);
    }

    // TODO: A script will be calling this function
    // Starter code for the script: https://cryptomarketpool.com/send-a-transaction-to-the-ethereum-blockchain-using-python-and-web3-py/
    function verifyRandao(IAxiomV1.BlockHashWitness calldata witness, bytes calldata header) external {
        if (block.number - witness.blockNumber <= 256) {
            require(
                axiomV1Contract.isRecentBlockHashValid(witness.blockNumber, witness.claimedBlockHash),
                "Block hash was not validated in cache"
            );
        } else {
            require(axiomV1Contract.isBlockHashValid(witness), "Block hash was not validated in cache");
        }

        require(witness.blockNumber > mergeBlock, "prevRandao is not valid before merge block");

        RLPReader.RLPItem[] memory headerItems = header.toRlpItem().toList();
        uint256 prevRandao = headerItems[13].toUint();

        prevRandaos[witness.blockNumber] = prevRandao;
        emit RandaoProof(witness.blockNumber, prevRandao);
    }
}
