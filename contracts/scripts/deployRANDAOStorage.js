async function main () {
    // We get the contract to deploy
    const RANDAOStorage = await ethers.getContractFactory('RANDAOStorage');
    console.log('Deploying RANDAOStorage...');
    const randaoStorage = await RANDAOStorage.deploy("0xa0Ee7A142d267C1f36714E4a8F75612F20a79720", 18);
    await randaoStorage.deployed();
    console.log('RANDAOStorage deployed to:', randaoStorage.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  