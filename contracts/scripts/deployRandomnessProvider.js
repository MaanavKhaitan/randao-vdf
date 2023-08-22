async function main () {
    // We get the contract to deploy
    const RandomnessProvider = await ethers.getContractFactory('RandomnessProvider');
    console.log('Deploying RandomnessProvider...');
    const randomnessProvider = await RandomnessProvider.deploy("0x5FbDB2315678afecb367f032d93F642f64180aa3", "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
    await randomnessProvider.deployed();
    console.log('RandomnessProvider deployed to:', randomnessProvider.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  