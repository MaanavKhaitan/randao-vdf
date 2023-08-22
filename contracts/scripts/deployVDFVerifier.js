async function main () {
    // We get the contract to deploy
    const VDFVerifier = await ethers.getContractFactory('Groth16Verifier');
    console.log('Deploying VDFVerifier...');
    const vdfVerifier = await VDFVerifier.deploy();
    await vdfVerifier.deployed();
    console.log('VDFVerifier deployed to:', vdfVerifier.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  