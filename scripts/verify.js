const hre = require("hardhat");
const { getAddress } = require("./util");

async function main() {
    console.log(`\n=====> Start verification on ${hre.network.name} <=====`);

    // Verify ConduitController
    const conduitControllerAddress = getAddress(`${hre.network.name}_ConduitController`);
    console.log("Verifying ConduitController...");
    await hre.reef.verifyContract(conduitControllerAddress, "ConduitController", [], {
        compilerVersion: "v0.8.14+commit.80d49f37",
        optimization: true,
        runs: 1000000,
    });

    // Verify Seaport
    const seaportAddress = getAddress(`${hre.network.name}_Seaport`);
    console.log("Verifying Seaport...");
    await hre.reef.verifyContract(seaportAddress, "Seaport", [conduitControllerAddress], {
        compilerVersion: "v0.8.17+commit.8df45f5f",
        optimization: true,
        runs: 4_294_967_295,
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
