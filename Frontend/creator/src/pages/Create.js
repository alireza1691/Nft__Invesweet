import React, { useEffect, useState } from "react";
import CreatorC from "../../Blockchain/Creator.json";
import { ethers } from "ethers";

export default function Create({ signer }) {
  // creator address on mumbai:    0xaff6b98ea4dff833ca91dda2c3c0e9c6a5b090aa

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");
  const [maxSupply, setMaxSupply] = useState("");
  const [imgUrl, setImageUrl] = useState("");

  useEffect(() => {
    console.log(symbol);
  }, [symbol]);

  async function generate() {
    const contractInstance = new ethers.Contract(
      "0xaff6b98ea4dff833ca91dda2c3c0e9c6a5b090aa",
      CreatorC,
      signer
    );
    await contractInstance.createERC721(name, symbol, price, maxSupply, imgUrl);
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
        <input
          className="input"
          placeholder="Enter max supply..."
          style={{ color: "black", width: "50%", margin: "5px" }}
          onChange={(e) => setMaxSupply(e.target.value)}
        ></input>
        {/* <button style={{"border":"solid","width":"80px","padding":"5px 10px","margin":"10px","borderRadius":"5px","marginTop":"7px"}} >hi</button> */}
        {/* <div class="dropdown">
            <button class="dropbtn">Max</button>
            <div class="dropdown-content">
                <a href="#">Limit</a>
                <a href="#">Unlimit</a>
            </div>
        </div> */}
        <label style={{ marginTop: "8px" }} className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
        <input
          className="input"
          placeholder="Enter image URL..."
          style={{ color: "black", width: "50%", margin: "5px" }}
          onChange={(e) => setImageUrl(e.target.value)}
        ></input>
        <div className="submitbtn">
          <button onClick={() => generate()}>Submit</button>
        </div>
      </div>
    </div>
  );
}
