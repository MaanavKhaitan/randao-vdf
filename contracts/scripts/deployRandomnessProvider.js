async function main () {
    // We get the contract to deploy
    const RandomnessProvider = await ethers.getContractFactory('RandomnessProvider');
    console.log('Deploying RandomnessProvider...');
    const randomnessProvider = await RandomnessProvider.deploy("0xE1Bb2379D0587b73DF50C47ecCf5ce36084B85f1", "0xe7087B54CD55Ef9C418d20A948612C026BB0e453");
    await randomnessProvider.deployed();
    console.log('RandomnessProvider deployed to:', randomnessProvider.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  