async function main () {
    // We get the contract to deploy
    const RandomnessProvider = await ethers.getContractFactory('RandomnessProvider');
    console.log('Deploying RandomnessProvider...');
    const randomnessProvider = await RandomnessProvider.deploy("0x21F9B303B83bBDAA4a2bD57d033c2f3c21dF9CED", "0xe7087B54CD55Ef9C418d20A948612C026BB0e453");
    await randomnessProvider.deployed();
    console.log('RandomnessProvider deployed to:', randomnessProvider.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  