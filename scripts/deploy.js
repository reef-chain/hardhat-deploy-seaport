const hre = require("hardhat");
const { addAddress } = require("./util");

async function main() {
    const deployer = await hre.reef.getSignerByName("account1");
    console.log(`\n=====> Start deployment on ${hre.network.name} with account ${deployer._substrateAddress} <=====`);

    // Deploy ConduitController
    console.log("Deploying ConduitController...");
    const ConduitController = await hre.reef.getContractFactory("LocalConduitController", deployer);
    const conduitController = await ConduitController.deploy();
    console.log(`ConduitController deployed to ${conduitController.address}`);
    addAddress(`${hre.network.name}_ConduitController`, conduitController.address);
    if (process.env.SKIP_VERIFICATION != "true") {
        console.log("Verifying ConduitController...");
        await hre.reef.verifyContract(conduitController.address, "LocalConduitController", [], {
            compilerVersion: "v0.8.14+commit.80d49f37",
            optimization: true,
            runs: 1000000,
        });
    }

    // Deploy Seaport
    console.log("Deploying Seaport...");
    const Seaport = await hre.reef.getContractFactory("Seaport", deployer);
    const seaport = await Seaport.deploy(conduitController.address);
    console.log(`Seaport deployed to ${seaport.address}`);
    addAddress(`${hre.network.name}_Seaport`, seaport.address);
    if (process.env.SKIP_VERIFICATION != "true") {
        console.log("Verifying Seaport...");
        await hre.reef.verifyContract(seaport.address, "Seaport", [conduitController.address], {
            compilerVersion: "v0.8.17+commit.8df45f5f",
            optimization: true,
            runs: 4_294_967_295,
        });
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
