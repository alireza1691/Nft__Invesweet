async function main() {
    const lastVersionAddress = " enter address here ..."
    const ERC721Upgreadable = await ethers.getContractFactory("ERC721Upgreadable")
    let ERC721V2 = await upgrades.upgradeProxy(lastVersionAddress, ERC721Upgreadable)
    console.log("Your upgraded proxy is done!", ERC721V2.address)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })