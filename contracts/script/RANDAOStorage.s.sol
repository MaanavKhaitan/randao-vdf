// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import { RANDAOStorage } from '../src/RANDAOStorage.sol';

contract RANDAOStorageScript is Script {
    function setUp() public {}

    function run() public {
        vm.broadcast();

        // the merge block info was taken from https://www.investopedia.com/ethereum-completes-the-merge-6666337
        // The Axiom address was taken from https://docs.axiom.xyz/transparency-and-security/contract-addresses
        // TODO: that Axiom address might not be the correct one.
        new RANDAOStorage(0xDb50DB7aB00ACf5554E1C964540de9b4f4c4dA8a, 15537393);
    }
}