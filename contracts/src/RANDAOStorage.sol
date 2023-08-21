

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

    address public axiomAddress;
    uint32 public mergeBlock;

    // mapping between blockNumber and prevRandao
    mapping(uint32 => uint256) public prevRandaos;

    event RandaoProof(uint32 blockNumber, uint256 prevRandao);

    event UpdateAxiomAddress(address newAddress);

    // TODO: get the Axiom address from here: https://docs.axiom.xyz/transparency-and-security/contract-addresses
    constructor(address _axiomAddress, uint32 _mergeBlock) {
        axiomAddress = _axiomAddress;
        mergeBlock = _mergeBlock;
        emit UpdateAxiomAddress(_axiomAddress);
    }

    function updateAxiomAddress(address _axiomAddress) external onlyOwner {
        axiomAddress = _axiomAddress;
        emit UpdateAxiomAddress(_axiomAddress);
    }

    function verifyRandao(IAxiomV1.BlockHashWitness calldata witness, bytes calldata header) external {
        if (block.number - witness.blockNumber <= 256) {
            require(
                IAxiomV1(axiomAddress).isRecentBlockHashValid(witness.blockNumber, witness.claimedBlockHash),
                "Block hash was not validated in cache"
            );
        } else {
            require(IAxiomV1(axiomAddress).isBlockHashValid(witness), "Block hash was not validated in cache");
        }

        require(witness.blockNumber > mergeBlock, "prevRandao is not valid before merge block");

        RLPReader.RLPItem[] memory headerItems = header.toRlpItem().toList();
        uint256 prevRandao = headerItems[13].toUint();

        prevRandaos[witness.blockNumber] = prevRandao;
        emit RandaoProof(witness.blockNumber, prevRandao);
    }
}
