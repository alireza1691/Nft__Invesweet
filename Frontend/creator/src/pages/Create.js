import React, { useEffect, useState } from "react";
import CreatorC from "../../Blockchain/Creator.json";
import { ethers } from "ethers";
// const { useStorageUpload,ThirdwebStorage } = require("@thirdweb-dev/storage");
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { useStorageUpload } from "@thirdweb-dev/react"
// import {fs} from 'fs';

export default function Create({ signer }) {
  // creator address on mumbai:    0x46035ac7e3bd5aa9150276c38fd19947e897259e

  const storage = new ThirdwebStorage();

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");
  const [maxSupply, setMaxSupply] = useState("");
  const [imgUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(null);
  const [deactive, setDeactiver] = useState(false)


  const { mutateAsync: upload, isLoading } = useStorageUpload();


  useEffect(() => {
    console.log(symbol);
  }, [symbol]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };


  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  async function supplyHandler () {
    if (deactive == false) {
      setDeactiver(true)
      setMaxSupply(0)
      console.log(deactive);
    } else {
      setDeactiver(false)
      console.log(deactive);
    }
    
  }
  async function uploadToIpfs () {
    const uploadUrl = await upload({
      data: [image],
      options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
    });
    // alert(uploadUrl);
    setImageUrl(uploadUrl)
    console.log(uploadUrl);
  }

  async function generate() {
    await uploadToIpfs()
    const contractInstance = new ethers.Contract(
      "0x46035ac7e3bd5aa9150276c38fd19947e897259e",
      CreatorC,
      signer
    );
    await contractInstance.createERC721(name, symbol, price , maxSupply, imgUrl,{value: ethers.utils.parseEther("0.01")});
  }


  return (
    <div className="boxCreate">
      <div>
        <h6 style={{ color: "#467889", fontWeight: "bold", fontSize: "18px" }}>
          Create your NFTs
        </h6>
        <input
          className="input"
          placeholder="Enter name..."
          style={{ color: "black", width: "50%", margin: "5px" }}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          className="input"
          placeholder="Enter symbol..."
          style={{ color: "black", width: "50%", margin: "5px" }}
          onChange={(event) => setSymbol(event.target.value)}
        ></input>
        <input
          className="input"
          placeholder="Enter price..."
          style={{ color: "black", width: "50%", margin: "5px" }}
          onChange={(e) => setPrice(e.target.value)}
        ></input>
        {!deactive ? (<input
          className="input"
          placeholder="Enter max supply..."
          style={{ color: "black", width: "50%", margin: "5px" }}
          onChange={(e) => setMaxSupply(e.target.value)}
        ></input>) : (<input
        className="input"
        placeholder="Unlimited supply"
        style={{ color: "grey", width: "50%", margin: "5px" }}
        disabled
      ></input>)}
        
        {/* <button style={{"border":"solid","width":"80px","padding":"5px 10px","margin":"10px","borderRadius":"5px","marginTop":"7px"}} >hi</button> */}
        {/* <div class="dropdown">
            <button class="dropbtn">Max</button>
            <div class="dropdown-content">
                <a href="#">Limit</a>
                <a href="#">Unlimit</a>
            </div>
        </div> */}
        <label style={{ marginTop: "8px" }} className="switch">
          <input type="checkbox" id="unlimited"onClick={() => supplyHandler()}/>
          <span className="slider round"></span>
        </label>

        {/* <input
          className="input"
          placeholder="Enter image URL..."
          style={{ color: "black", width: "50%", margin: "5px" }}
          onChange={(e) => setImageUrl(e.target.value)}
        ></input>
         */}
        <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        width: 'auto',
        width:  '280px',
        height: 'auto',
        height: '280px',
        border: '2px dashed #ccc',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        cursor: 'pointer',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '30px',
        marginBottom: '15px',
        position: 'relative',
        textAlign: 'center'
      }}
    >
      {image ? (
        <img src={image} alt="dropped image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <p>Drag and drop an image here</p>
      )}
    </div>
    <div style={{backgroundColor: "white", marginRight:"auto",marginLeft:"auto", marginBottom:"30px"}}>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {/* {image && <img src={image} alt="uploaded image" style={{ width: '300px', height: '300px' }} />} */}
    </div>
        <div className="submitbtn">
          <button onClick={() => generate()}>Submit</button>
        </div>
        <p style={{"fontSize":"12px", "fontFamily":"sans-serif"}}>To send transaction you may need test token, <a href="https://mumbaifaucet.com/">claim test token </a></p>
      </div>
    </div>
  );
}
