const {ethers} = require ("hardhat")
const {expect, assert, Assertion, revertedWith} = require ("chai")
const { it, describe } = require("mocha")
// const { solidity } =  require("ethereum-waffle")
const chai = require('chai')

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
    await creatorContract.setFee(0,1000)
    const creationTX = await signer1WithCreator.createERC721("test","tst",100,100,"test URL",{value: 1000})
    const creationTXMined = await creationTX.wait(1)
    mintedCollectionaddress = await creationTXMined.events[0].args.contractAddress
    nftContract = nftContractFactory.attach(mintedCollectionaddress)
    // nftContract = await .createERC721("test","tst",10,100,"test URL")
    // console.log(creatorContract);
    console.log(mintedCollectionaddress);
  })





  describe("Creator", function () {


    it("Should check if parent of created contract was correct", async function () {
      const parentAdd = await nftContract.getCreator()
      console.log(parentAdd);
      expect(parentAdd).to.equal(creatorContract.address);
    });

    it("it should check balance after", async function () {
      const existBalance = await creatorContract.balance()
      expect(existBalance.toString()).to.equal("1000");
    })

    it("Should mint and get token ID", async function () {
      await (nftContract.connect(signer1)).mint({value: 100})
      const balance = await nftContract.balanceOf(signer1.address)
      const tokenId1Owner = await nftContract.ownerOf(1)
      expect(tokenId1Owner).to.equal(signer1.address);
      expect(balance.toNumber()).to.equal(1);

    })

    it("Should return test url", async function () {
      await (nftContract.connect(signer1)).mint({value: 100})
      // const url = await nftContract.getUri(0)
      const url = await nftContract.baseURI()
      expect(url).to.equal("test URL");

    })
    it("Should increase balance of creator and ERC721 both", async function () {
      await (nftContract.connect(signer1)).mint({value: 100})
      const balance1 = await nftContract.balance()
      const balance2 = await creatorContract.balance()
      expect(balance1.toString()).to.equal("99")
      // Before mint balnce of creator was 1000 because of cration
      expect(balance2.toString()).to.equal("1001")
     })

    it("Should revert if value isn't enough", async function () {
      // await (nftContract.connect(signer1)).mint({value: 500})
       await expect(
        (nftContract.connect(signer1)).mint({value: 50})
        ).to.be.revertedWith(
          "Insufficient mint fee"
        );
  
    })
    it("Should revert if someone want mint more tham max supply", async function () {
      const createTx = await signer1WithCreator.createERC721("test","tst",100,3,"test URL",{value: 1000})
      const minedTx = await createTx.wait(1)
      const addressOfCreated = await minedTx.events[0].args.contractAddress
      const nftInst = nftContractFactory.attach(addressOfCreated)
      // Since we set max supply = 3, to reach max supply we mint as much as max supply (3)
      for (let index = 0; index < 3; index++) {
        await nftInst.mint({value: 100})
      }
      // Now we expect the function will be reverted.
      await expect(nftInst.mint({value: 100})).to.be.rejectedWith("Maximun number was minted");

    })
    it("Should revert if msg.value of creation tx was less than fee", async function () {
      // If msg.value < 1000 should revert.
      await expect(signer1WithCreator.createERC721("test","tst",100,100,"test URL",{value: 900})).to.be.revertedWith("create requires fee")

    })


    it("Should withdraw in creator by owner", async function () {
      const deployerConnectWithCreator = creatorContract.connect(deployer)
      const balanceBeforeWithdraw = await deployerConnectWithCreator.balance()
      await deployerConnectWithCreator.withdraw(1000)
      const balanceAfterWithdraw = await deployerConnectWithCreator.balance()
      expect(balanceBeforeWithdraw.toNumber()).to.equal(1000);
      expect(balanceAfterWithdraw.toNumber()).to.equal(0);

    })

    it("Should revert withdraw if msg.sender != owner", async function () {
      const anotherSignerWithCreator = creatorContract.connect(signer2)
      expect(anotherSignerWithCreator.withdraw(1000)).to.be.revertedWith("Ownable: caller is not the owner")

    })

    // d
    /*
    withdraw in both
    get uri
    check balance
    check owner

    */






    // it("Should mint and get token ID", async function () {
      
    //   expect(balance.toNumber()).to.equal(1);

    // })
    // it("Should mint and get token ID", async function () {
      
    //   expect(balance.toNumber()).to.equal(1);

    // })


  });

});
