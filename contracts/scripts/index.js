
// scripts/index.js
async function main () {
    // Check that the verifier contract works
    // const VDFVerifier = await ethers.getContractFactory('Groth16Verifier');
    // const vdfVerifier = await VDFVerifier.attach('0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512');
    // const verification = await vdfVerifier.verifyProof(["0x2bc3625a448376401598aee5c2c324eefaa24e8aa466c8d74e9bc9707ba28f42", "0x11ba832c9bccadf9ad9ea259f8df2d0fe3a0834458cf5a1e67bc6f6cf24313cd"],[["0x090bc25eb427a97c5659ffb15e6aefa961828e523d4e6736c4b0c4e724053dfa", "0x2cd6b7ca229c163eeb37c0c435762948f5a771748c7ea75a900239a8c86e3b9d"],["0x0b765a90d6f33c575ad03ffc8ca75a75527d0bc3e99ffa5bcb8db0389adb1713", "0x0466c11743e7052a6697b64ff4f4283577a7936f5a0e5e0096c6b99ba103950c"]],["0x179a46c73e2ee71279e592c53dc221a81ae75b38746fd7f44c5939b9557f35c9", "0x17331bf5f68eab3af20e857834c219841d281ea52502f916751a171ce54c0faa"],["0x1781ee569a24d0b9e0ae90dd61db7073b070c38eeb6fa3931c6d5016c1fd9cd9","0x0000000000000000000000000000000000000000000000000000000000000005"]);
    // console.log("This is verification: ", verification);

    // Initialize the storage contract
    const address = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
    const RANDAOStorage = await ethers.getContractFactory('RANDAOStorage');
    const randaoStorage = await RANDAOStorage.attach(address);

    let tx = await randaoStorage.verifyRANDAO(
      
    )

    // const RandomnessProvider = await ethers.getContractFactory('RandomnessProvider');
    // const randomnessProvider = await RandomnessProvider.attach('0x610178dA211FEF7D417bC0e6FeD39F05609AD788');
    // // Check that request randomness works
    // let tx = await randomnessProvider.requestRandomness(22);
    // let receipt = await tx.wait();
    // console.log("This is receipt: ", receipt.events[0].topics);

    // // Check that randomness can be submitted
    // let submitTx = await randomnessProvider.submitVDFRandomness(22,
    //     ["0x2bc3625a448376401598aee5c2c324eefaa24e8aa466c8d74e9bc9707ba28f42", "0x11ba832c9bccadf9ad9ea259f8df2d0fe3a0834458cf5a1e67bc6f6cf24313cd"],[["0x090bc25eb427a97c5659ffb15e6aefa961828e523d4e6736c4b0c4e724053dfa", "0x2cd6b7ca229c163eeb37c0c435762948f5a771748c7ea75a900239a8c86e3b9d"],["0x0b765a90d6f33c575ad03ffc8ca75a75527d0bc3e99ffa5bcb8db0389adb1713", "0x0466c11743e7052a6697b64ff4f4283577a7936f5a0e5e0096c6b99ba103950c"]],["0x179a46c73e2ee71279e592c53dc221a81ae75b38746fd7f44c5939b9557f35c9", "0x17331bf5f68eab3af20e857834c219841d281ea52502f916751a171ce54c0faa"],["0x1781ee569a24d0b9e0ae90dd61db7073b070c38eeb6fa3931c6d5016c1fd9cd9","0x0000000000000000000000000000000000000000000000000000000000000005"]
    // );
    // let submitReceipt = await submitTx.wait();
    // console.log("This is submitReceipt: ", submitReceipt.events[0].topics);

    // // Check that randomness can't be submitted without a valid proof
    // let submitFakeProofTx = await randomnessProvider.submitVDFRandomness(22,
    //     ["0x2bc3625a448376401598aee5c2c324eefaa24e8aa466c8d74e9bc9707ba28f42", "0x11ba832c9bccadf9ad9ea259f8df2d0fe3a0834458cf5a1e67bc6f6cf24313cd"],[["0x090bc25eb427a97c5659ffb15e6aefa961828e523d4e6736c4b0c4e724053dfa", "0x2cd6b7ca229c163eeb37c0c435762948f5a771748c7ea75a900239a8c86e3b9d"],["0x0b765a90d6f33c575ad03ffc8ca75a75527d0bc3e99ffa5bcb8db0389adb1713", "0x0466c11743e7052a6697b64ff4f4283577a7936f5a0e5e0096c6b99ba103950c"]],["0x179a46c73e2ee71279e592c53dc221a81ae75b38746fd7f44c5939b9557f35c9", "0x17331bf5f68eab3af20e857834c219841d281ea52502f916751a171ce54c0faa"],["0x1781ee569a24d0b9e0ae90dd61db7073b070c38eeb6fa3931c6d5016c1fd9cd9","0x0000000000000000000000000000000000000000000000000000000000000002"]
    // );
    // let submitFakeProofReceipt = await submitTx.wait();
    // console.log("This is submitFakeProofReceipt: ", submitFakeProofReceipt);

    // // Check that randomness can be fetched
    // let fetchedRandomness = await randomnessProvider.fetchRandomness(22);
    // console.log("This is fetchedRandomness: ", fetchedRandomness);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  