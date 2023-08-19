# randao-vdf
We are making the most secure randomness to date on ethereum. 


## Outline of the Solution without code 
* Black box functionaliy: we have a smart contract $R$ which takes $i$ which is a block number as input. As output, once ready, the contract stores VDF(RANDAO(Block_i)) and emits some event.

## list of the components
* Main smart contract $R$: [write from scratch + mix and match from https://github.com/paradigmxyz/zk-eth-rng/tree/main]
  * gets initial call with block number $i$ and emits RandomnessRequested event
  * Prover submits $x,\pi$, $R$ 
    * calls Axiom smart contract to get $RANDAO_i$ 
    * verifies $\pi$ is a proper proof for $x$ using $RANDAO_i$ as public witness
    * if proof verifiers stores $x$ and emits RandomnessFullfiled event 
* off-chain VDF prover: [Wesolski verifier smart contract: https://github.com/kilic/evmvdf/tree/master, Wesolski prover: https://github.com/iotaledger/vdf]
  * listening to randomness requests events --> learns block number $i$
  * takes the RANDAO$_i$, evalaued $x= VDF(RANDAO_i)$ and produces proof $\pi$ that $x= VDF(RANDAO_i)$
  * posts $x,\pi$ to contract $R$
* Off-chain RANDAO-submitter: [script from scratch]
  * listens to RandomnessRequested and learns $i$
  * submits $blockhash_i$ and $blockheader_i$

### Tasks
* Make Wesolski prover work (Wesolski prover: https://github.com/iotaledger/vdf)
* Make sure Wesolski verifier smart contract: https://github.com/kilic/evmvdf/tree/master accepts Wesolowski prover's proofs. 
  * assume u can only accepttrue statements or something like that
* Wrap Wesolowski prover in off-chain script that calls it and submits to blockchain 
* We should create a mapping from security level, etc, to VDF paraemters. 
  * at least we should determine this ourself.
* Write RANDAO-submitter
  * make sure it works
* Write main contract 
  * make sure that it works
* run tests on everything
* write a smart contract to gamble on die-flip