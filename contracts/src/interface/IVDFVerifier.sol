// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "./IBlockhashOracle.sol";

/// @title Randomness Provider Interface
/// @author AmanGotchu <aman@paradigm.xyz>
/// @author sinasab <sina@paradigm.xyz>
/// @notice Interface for contracts providing randomness.
interface IVDFVerifier {
  function verify(
    bytes memory g,
    bytes memory pi,
    bytes memory y,
    bytes memory q,
    bytes memory dst,
    uint256 nonce,
    uint256 delay
  ) public view returns (bool);
}
