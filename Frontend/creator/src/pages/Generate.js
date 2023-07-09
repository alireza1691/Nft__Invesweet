import React, { useEffect, useState } from "react";
import CreatorC from "../../Blockchain/Creator.json";
import ItemCreator from "../../Blockchain/ERC721ProductCreator.json";
import { ethers } from "ethers";
// const { useStorageUpload,ThirdwebStorage } = require("@thirdweb-dev/storage");
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { useStorageUpload } from "@thirdweb-dev/react";
// import * as fs from 'fs';
// require("dotenv").config()
export default function Generate({ signer }) {
  // creator address on mumbai:    0x46035ac7e3bd5aa9150276c38fd19947e897259e

  const storage = new ThirdwebStorage();

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");
  const [maxSupply, setMaxSupply] = useState("");
  const [imgUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(null);
  const [deactive, setDeactiver] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  const type1CreatorAddress = "0x46035ac7e3bd5aa9150276c38fd19947e897259e"
  const type2CreatorAddress = "0x994F56F982Ceeca068CFB8E275E9e4e640F8EE4A"

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

  async function supplyHandler() {
    if (deactive == false) {
      setDeactiver(true);
      setMaxSupply(0);
      console.log(deactive);
    } else {
      setDeactiver(false);
      console.log(deactive);
    }
  }
  async function uploadToIpfs() {
    const uploadUrl = await upload({
      data: [image],
      options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
    });
    // alert(uploadUrl);
    setImageUrl(uploadUrl);
    console.log(uploadUrl);
  }

  async function generateType1() {
    await uploadToIpfs();
    const contractInstance = new ethers.Contract(
      "0x46035ac7e3bd5aa9150276c38fd19947e897259e",
      CreatorC,
      signer
    );
    await contractInstance.createERC721(
      name,
      symbol,
      price,
      maxSupply,
      imgUrl,
      { value: ethers.utils.parseEther("0.01") }
    );
  }
  async function generateType2() {
    const contractInstance = new ethers.Contract(
      type2CreatorAddress,
      ItemCreator,
      signer
    );
    await contractInstance.createERC721(
      name,
      symbol,
      { value: ethers.utils.parseEther("0.01") }
    );
  }

  return (
    <>
      <div className="boxCreate">
        <div
          className="tabs"
          style={{
            paddingBottom: "20px",
            border: "none",
            "border-bottom": "1px solid grey",
            borderColor: "#b3c6cc",
          }}
        >
          <button
            className={`tab ${activeTab === "tab1" ? "active" : ""}`}
            onClick={() => handleTabClick("tab1")}
            style={
              activeTab == "tab1"
                ? {
                    border: "none",
                    borderColor: "#b3c6cc",
                    borderRadius: "5px",
                    backgroundColor: "#467889",
                    color: "white",
                  }
                : {
                    border: "none",
                    borderColor: "#b3c6cc",
                    backgroundColor: "white",
                    color: "#467889",
                  }
            }
          >
            Type 1 NFT
          </button>
          <button
            className={`tab ${activeTab === "tab2" ? "active" : ""}`}
            onClick={() => handleTabClick("tab2")}
            style={
              activeTab == "tab2"
                ? {
                    border: "none",
                    borderColor: "#b3c6cc",
                    borderRadius: "5px",
                    backgroundColor: "#467889",
                    color: "white",
                  }
                : {
                    border: "none",
                    borderColor: "#b3c6cc",
                    backgroundColor: "white",
                    color: "#467889",
                  }
            }
          >
            Advanced NFT
          </button>
          <button
            className={`tab ${activeTab === "tab3" ? "active" : ""}`}
            onClick={() => handleTabClick("tab3")}
            style={
              activeTab == "tab3"
                ? {
                    border: "none",
                    borderColor: "#b3c6cc",
                    borderRadius: "5px",
                    backgroundColor: "#467889",
                    color: "white",
                  }
                : {
                    border: "none",
                    borderColor: "#b3c6cc",
                    backgroundColor: "white",
                    color: "#467889",
                  }
            }
          >
            Tab 3
          </button>
          <button
            className={`tab ${activeTab === "tab4" ? "active" : ""}`}
            onClick={() => handleTabClick("tab4")}
            style={
              activeTab == "tab4"
                ? {
                    border: "none",
                    borderColor: "#b3c6cc",
                    borderRadius: "5px",
                    backgroundColor: "#467889",
                    color: "white",
                  }
                : {
                    border: "none",
                    borderColor: "#b3c6cc",
                    backgroundColor: "white",
                    color: "#467889",
                  }
            }
          >
            Tab 4
          </button>
          <button
            className={`tab ${activeTab === "tab5" ? "active" : ""}`}
            onClick={() => handleTabClick("tab5")}
            style={
              activeTab == "tab5"
                ? {
                    border: "none",
                    borderColor: "#b3c6cc",
                    borderRadius: "5px",
                    backgroundColor: "#467889",
                    color: "white",
                  }
                : {
                    border: "none",
                    borderColor: "#b3c6cc",
                    backgroundColor: "white",
                    color: "#467889",
                  }
            }
          >
            Tab 5
          </button>
        </div>
        <div className="tab-content">
          <div className={`tab-pane ${activeTab === "tab1" ? "active" : ""}`}>
            <div>
              <h6
                style={{
                  color: "#467889",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
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
              {!deactive ? (
                <input
                  className="input"
                  placeholder="Enter max supply..."
                  style={{ color: "black", width: "50%", margin: "5px" }}
                  onChange={(e) => setMaxSupply(e.target.value)}
                ></input>
              ) : (
                <input
                  className="input"
                  placeholder="Unlimited supply"
                  style={{ color: "grey", width: "50%", margin: "5px" }}
                  disabled
                ></input>
              )}

              {/* <button style={{"border":"solid","width":"80px","padding":"5px 10px","margin":"10px","borderRadius":"5px","marginTop":"7px"}} >hi</button> */}
              {/* <div class="dropdown">
            <button class="dropbtn">Max</button>
            <div class="dropdown-content">
                <a href="#">Limit</a>
                <a href="#">Unlimit</a>
            </div>
        </div> */}
              <label style={{ marginTop: "8px" }} className="switch">
                <input
                  type="checkbox"
                  id="unlimited"
                  onClick={() => supplyHandler()}
                />
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
                  width: "auto",
                  width: "280px",
                  height: "auto",
                  height: "280px",
                  border: "2px dashed #ccc",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  cursor: "pointer",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "30px",
                  marginBottom: "15px",
                  position: "relative",
                  textAlign: "center",
                }}
              >
                {image ? (
                  <img
                    src={image}
                    alt="dropped image"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <p>Drag and drop an image here</p>
                )}
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  marginRight: "auto",
                  marginLeft: "auto",
                  marginBottom: "30px",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {/* {image && <img src={image} alt="uploaded image" style={{ width: '300px', height: '300px' }} />} */}
              </div>
              <div className="submitbtn">
                <button onClick={() => generateType1()}>Submit</button>
              </div>
              <p style={{ fontSize: "12px", fontFamily: "sans-serif" }}>
                To send transaction you may need test token,{" "}
                <a href="https://mumbaifaucet.com/">claim test token </a>
              </p>
            </div>
          </div>
        
        <div className={`tab-pane ${activeTab === "tab2" ? "active" : ""}`}>
          <div>
            <h6
              style={{ color: "#467889", fontWeight: "bold", fontSize: "18px" }}
            >
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
            <p style={{ fontSize: "16px", fontFamily: "sans-serif" ,marginTop:"5px", color: "#467889", fontSize: "18px" }}>
              After generating collection, you can enter different items in dashboard{" "}
            </p>
            <div className="submitbtn">
              <button onClick={() => generateType2()}>Submit</button>
            </div>
            <p style={{ fontSize: "12px", fontFamily: "sans-serif" }}>
              To send transaction you may need test token,{" "}
              <a href="https://mumbaifaucet.com/">claim test token </a>
            </p>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
