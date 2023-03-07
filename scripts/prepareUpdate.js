// scripts/prepare_upgrade.js
async function main() {
    const proxyAddress = 'FILL_ME_IN'
    const ERC721Upgreadable = await ethers.getContractFactory("ERC721Upgreadable")
    console.log("Preparing upgrade...")
    const ERC721V2Address = await upgrades.prepareUpgrade(proxyAddress, ERC721Upgreadable)
    console.log("BoxV2 at:", ERC721V2Address)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })