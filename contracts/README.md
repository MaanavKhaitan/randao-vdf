# How to use the contracts
First, start a local node:
```
anvil
```
To deploy `RANDAOStorage`:
```
# first private key in the account list automatically created by anvil
export PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
forge script script/RANDAOStorageDeploy.s.sol:RANDAOStorageDeployScript --fork-url http://localhost:8545 --private-key $PRIVATE_KEY --broadcast
```

To deploy `VDFVerifier`:
```
# first private key in the account list automatically created by anvil
export PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
forge script script/VDFVerifierDeploy.s.sol:VDFVerifierDeployScript --fork-url http://localhost:8545 --private-key $PRIVATE_KEY --broadcast
```

To deploy `RandomnessProvider`:
```
# first private key in the account list automatically created by anvil
export PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
forge script script/RandomnessProviderDeploy.s.sol:RandomnessProviderDeployScript --fork-url http://localhost:8545 --private-key $PRIVATE_KEY --broadcast
```
Note: the deployer for `RandomnessProvider` does not currently automatically get the addresses of the previous two contracts.


----

New way:
```
forge create --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 src/RANDAOStorage.sol:RANDAOStorage --constructor-args 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720 18

forge create --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 src/VDFVerifier.sol:Groth16Verifier

forge create --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 src/RandomnessProvider.sol:RandomnessProvider --constructor-args 0x5fbdb2315678afecb367f032d93f642f64180aa3 0xe7f1725e7734ce288f8367e1bb143e90bb3f0512
```

What we tried last:
```
cast call 0x5fbdb2315678afecb367f032d93f642f64180aa3 "verifyRANDAO({uint32, bytes32, bytes32, uint32, bytes32[10]}, bytes)()" [16509301, 0x034ca3921f2ab605c8681288ba4c9818978a12e69c57e82350301fb58e1a9a6b, 0xf21f9ac46b21ce128bf245ac8c5dcd12ab1bf6a0cb0e3c7dc4d33cc8871d8ab3, 1024, [0x1 0x2 0x3 0x4 0x5 0x6 0x7 0x8 0x9 0x10]] 0x100
```