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