// deploy/00_deploy_your_contract.js

const { ethers } = require("hardhat");

const localChainId = "31337";

// const sleep = (ms) =>
//   new Promise((r) =>
//     setTimeout(() => {
//       console.log(`waited for ${(ms / 1000).toFixed(3)} seconds`);
//       r();
//     }, ms)
//   );
const _metadataUri =
  "https://gateway.pinata.cloud/ipfs/https://gateway.pinata.cloud/ipfs/QmX2ubhtBPtYw75Wrpv6HLb1fhbJqxrnbhDo1RViW3oVoi";

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  await deploy("ScaffoldGods", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [_metadataUri],
    log: true,
    waitConfirmations: 5,
  });

  // Getting a previously deployed contract
  const scaffoldGods = await ethers.getContract("ScaffoldGods", deployer);
  await scaffoldGods.transferOwnership(
    "0xf4030DdD79fc7Fd49b25C976C5021D07568B4F91"
  );
  /*  
    

    //const ScaffoldGods = await ethers.getContractAt('ScaffoldGods', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const ScaffoldGods = await deploy("ScaffoldGods", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const ScaffoldGods = await deploy("ScaffoldGods", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */

  // Verify from the command line by running `yarn verify`

  // You can also Verify your contracts with Etherscan here...
  // You don't want to verify on localhost
  try {
    if (chainId !== localChainId) {
      await run("verify:verify", {
        address: scaffoldGods.address,
        contract: "contracts/ScaffoldGods.sol:ScaffoldGods",
        constructorArguments: [_metadataUri],
      });
    }
  } catch (error) {
    console.error(error);
  }
};
module.exports.tags = ["ScaffoldGods"];
