// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

/// @title Randomness Provider Interface
/// @author AmanGotchu <aman@paradigm.xyz>
/// @author sinasab <sina@paradigm.xyz>
/// @notice Interface for contracts providing randomness.
interface IRandomnessProvider {
    /// @notice Emits a randomness request for a specific block.
    event RandomnessRequested(address indexed requester, uint256 indexed randomnessBlock);

    /// @notice Emits the fullfillment of randomness at a specific block.
    event RandomnessFulfilled(uint256 indexed fulfilledBlock, uint256 randomSeed);

    /// @notice Requests randomness and returns the block number tied to the request.
    function requestRandomness(uint256 targetBlockNum) external;

    /// @notice Returns >= 1 random values from a specific block.
    function fetchRandomness(uint256 blockNum) external view returns (uint256);
}
