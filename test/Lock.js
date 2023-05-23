const {ethers} = require ("hardhat")
const {expect, assert} = require ("chai")


describe("All", function () {

  let creatorContract, nftContract, deployer, signer1, signer2, signer1WithCreator, nftContractFactory, mintedCollectionaddress

  beforeEach(async function () {
    const addresses = await ethers.getSigners()
    deployer = addresses[0]
    signer1 = addresses[1]
    signer2 = addresses[2]
    const creatorContractFactory = await ethers.getContractFactory("Creator")
    creatorContract = await creatorContractFactory.deploy()
    nftContractFactory = await ethers.getContractFactory("ERC721V1")
    signer1WithCreator =  creatorContract.connect(signer1)
    await creatorContract.setFee(0,10)
    const creationTX = await signer1WithCreator.createERC721("test","tst",10,100,"test URL",{value: 10})
    const creationTXMined = await creationTX.wait(1)
    mintedCollectionaddress = await creationTXMined.events[0].args.contractAddress
    // nftContract = await .createERC721("test","tst",10,100,"test URL")
    // console.log(creatorContract);
    console.log(mintedCollectionaddress);
  })




  describe("Creator", function () {


    it("Should check if parent of created contract was correct", async function () {
      const nftIns = await nftContractFactory.attach(mintedCollectionaddress)
      const parentAdd = await nftIns.getCreator()
      console.log(parentAdd);
      expect(parentAdd).to.equal(creatorContract.address);
    });

  });

});
