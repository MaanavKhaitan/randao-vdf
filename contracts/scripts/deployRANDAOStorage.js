async function main () {
    // We get the contract to deploy
    const RANDAOStorage = await ethers.getContractFactory('RANDAOStorage');
    console.log('Deploying RANDAOStorage...');
    const randaoStorage = await RANDAOStorage.deploy("0xDb50DB7aB00ACf5554E1C964540de9b4f4c4dA8a", 7381173);
    await randaoStorage.deployed();
    console.log('RANDAOStorage deployed to:', randaoStorage.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  