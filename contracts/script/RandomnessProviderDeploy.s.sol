// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import { RandomnessProvider } from '../src/RandomnessProvider.sol';

contract RandomnessProviderDeployScript is Script {
    function setUp() public {}

    function run() public {
        vm.broadcast();

        // the merge block info was taken from https://www.investopedia.com/ethereum-completes-the-merge-6666337
        // The Axiom address was taken from https://docs.axiom.xyz/transparency-and-security/contract-addresses
        // TODO: that Axiom address might not be the correct one.
        new RandomnessProvider(
            0x5FbDB2315678afecb367f032d93F642f64180aa3,
            0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512,
            10
        );
    }
}
