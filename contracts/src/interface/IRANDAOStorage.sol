// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

/// @title Randomness Provider Interface
/// @author AmanGotchu <aman@paradigm.xyz>
/// @author sinasab <sina@paradigm.xyz>
/// @notice Interface for contracts providing randomness.
interface IRANDAOStorage {
    /// @notice Returns the RANDAO value for the requested block
    function getRANDAO(uint256 blockNum) external pure returns (uint256);
}
