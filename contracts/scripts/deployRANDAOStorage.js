async function main () {
    // We get the contract to deploy
    const RANDAOStorage = await ethers.getContractFactory('RANDAOStorage');
    console.log('Deploying RANDAOStorage...');
    const randaoStorage = await RANDAOStorage.deploy("0x8d41105949fc6C418DfF1A76Ff5Ae69128Ade55a", 7381173);
    await randaoStorage.deployed();
    console.log('RANDAOStorage deployed to:', randaoStorage.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  