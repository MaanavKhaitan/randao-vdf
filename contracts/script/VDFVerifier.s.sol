// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import { VDFVerifier } from '../src/VDFVerifier.sol';

contract VDFVerifierScript is Script {
    function setUp() public {}

    function run() public {
        vm.broadcast();
        new VDFVerifier();
    }
}