// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {IRandomnessProvider} from "./interface/IRandomnessProvider.sol";
import {IRANDAOStorage} from "./interface/IRANDAOStorage.sol";
import {IVDFVerifier} from "./interface/IVDFVerifier.sol";

contract RandomnessProvider is IRandomnessProvider {

    IVDFVerifier public vdfVerifier;
    IRANDAOStorage public randaoStorage;

    mapping(uint256 => uint256) public blockNumToVDFRandomness;

    error RandomnessNotAvailable(uint256);
    error RequestedRandomnessFromPast(uint256);
    error RequestedZeroRandomValues();

    /// @notice Sets the addresses of the contracts that store RANDAO values and verify the relevant VDF.
    /// @param _randaoStorage Address of the RANDAO storage contract.
    /// @param _vdfVerifier Address of the VDF verifier contract.
    constructor(address _randaoStorage, address _vdfVerifier) {
        randaoStorage = IRANDAOStorage(_randaoStorage);
        vdfVerifier = IVDFVerifier(_vdfVerifier);
    }

    /// @notice Function to be called when a user requests randomness.
    /// In this function, a user can specify the exact future block they want
    /// their randomness to come from. This emits an event that provers
    /// can listen to in order to fufill randomness.
    /// @param targetBlockNum The future block number the requestor
    /// is requesting randomness for.
    function requestRandomness(uint256 targetBlockNum) external {
        // Ensure user is requesting a future block.
        if (targetBlockNum <= block.number) {
            revert RequestedRandomnessFromPast(targetBlockNum);
        }

        emit RandomnessRequested(msg.sender, targetBlockNum);
    }

    /// @notice Verifies and records the VDF output for a block.
    /// @param blockNumber Block number for which the VDF was calculated.
    function submitVDFRandomness(
        uint256 blockNumber,
        uint[2] calldata _pA,
        uint[2][2] calldata _pB,
        uint[2] calldata _pC,
        uint[2] calldata _pubSignals
    ) external {
        // Verify this is a valid RANDAO for this block number
        require(isValidRANDAO(blockNumber, extractRANDAO(_pubSignals)), "Invalid randao for this block.");

        // Verify that the VDF was calculated correctly
        require(vdfVerifier.verifyProof(_pA, _pB, _pC, _pubSignals), "No valid proof provided.");

        // extract the random value (the VDF output) and record it
        uint256 randomness = extractVDFOutput(_pubSignals);
        blockNumToVDFRandomness[blockNumber] = randomness;
        emit RandomnessFulfilled(blockNumber, randomness);
    }

    /// @notice Fetch the VDF generated random value tied to a specific block
    /// with option to generate more random values using the initial RANDAO value
    /// as a seed.
    /// @param blockNum Block number to fetch randomness from.
    function fetchRandomness(uint256 blockNum) public view returns (uint256) {
        uint256 randomness = blockNumToVDFRandomness[blockNum];

        // Ensure RANDAO value is proven AND user isn't trying to fetch
        // randomness from a current or future block.
        if (randomness == 0) {
            revert RandomnessNotAvailable(blockNum);
        }

        return randomness;
    }

    /// @notice Checks if the given randao value is valid for the given block number.
    function isValidRANDAO(uint256 blockNumber, uint256 randao) internal view returns (bool) {
        // Verify this is a valid ranDAO for this block number
        return randaoStorage.getRANDAO(blockNumber) == randao;
    }

    /// @notice Extracts the RANDAO value from the output struct of the VDF function
    function extractRANDAO(uint[2] calldata _pubSignals) internal pure returns (uint256) {
        return _pubSignals[1];
    }

    /// @notice Extracts the VDF output from the output struct of the VDF function
    function extractVDFOutput(uint[2] calldata _pubSignals) internal pure returns (uint256) {
        return _pubSignals[0];
    }
}
