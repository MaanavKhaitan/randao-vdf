// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

/// @title Randomness Provider Interface
/// @author AmanGotchu <aman@paradigm.xyz>
/// @author sinasab <sina@paradigm.xyz>
/// @notice Interface for contracts providing randomness.
interface IVDFVerifier {
  function verify(
    uint256[5] calldata proofPublicInput
  ) external view returns (bool);
}
