import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import "bulma/css/bulma.css";
import { useState, useEffect, React } from "react";
import { _, fill } from "lodash";
import "bootstrap/dist/css/bootstrap.css";

export default function Home({ signer }) {

  // const [tabHandler, setTabHandler] = useState("tab-erc721");
  // useEffect(() => {
  //   console.log(tabHandler);
  // }, [tabHandler]);

  return (
 
    <div style={{ height: "1024px" }}>
      <div className="row">
        <div className="column" style={{ backgroundColor: "white" }}>
          <div style={{ marginTop: "100px" }}>
            <h1
              style={{
                textAlign: "center",
                color: "#467889",
                fontFamily: "impact",
                fontSize: "65px",
                fontWeight: "bold",
                width: "90%",
                textShadow:
                  "0px 3px 0px #b2a98f, 0px 14px 10px rgba(0,0,0,0.15),0px 10px 2px rgba(0,0,0,0.1),0px 34px 30px rgba(0,0,0,0.1)",
              }}
            >
              Tokenize your assets/products
            </h1>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#467889",
                marginTop: "50px",
                fontFamily: "monospace",
                borderRadius: "10px",
                padding: "10px",
                textAlign: "left",
                textShadow: "2px 4px 3px rgba(0,0,0,0.1)",
              }}
            >
              Tokenize your asset, make your tickets, create your collection
            </p>
            {/* <p style={{"fontSize":"20px","fontWeight":"600","color":"#467889","marginTop":"50px","fontFamily":"monospace","backgroundColor":"#E9F3F7","borderRadius":"10px","padding":"10px"}} >Tokenize each asset you need as NFT</p> */}
          </div>
        </div>

        <div className="column" style={{ backgroundColor: "white" }}>
          <div className="logoHover">
            <Image
              src="/logo.png"
              width={480}
              height={300}
              className="logoHover"
              style={{ paddingLeft: "30px" }}
              alt="logo loading..."
            ></Image>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "150px" }} className="row">
        <div className="column" style={{ backgroundColor: "white" }}>
          <div style={{ textAlign: "justify", alignItems: "center" }}>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#467889",
                marginTop: "50px",
                fontFamily: "monospace",
                backgroundColor: "#E9F3F7",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              Main aim of Invesweet is increaseing NFT usage in real life. Users
              are able to create own collections depends on what they need.
            </p>
          </div>
        </div>
        <div className="column" style={{ backgroundColor: "white" }}></div>
        <div className="column" style={{ backgroundColor: "white" }}></div>
      </div>
      <div className="row">
        <div className="column" style={{ backgroundColor: "white" }}></div>
        <div className="column" style={{ backgroundColor: "white" }}>
          <div className="coinHover"> </div>
        </div>
        <div
          className="column"
          style={{ backgroundColor: "white", textAlign: "justify" }}
        >
          <p
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#467889",
              marginTop: "50px",
              fontFamily: "monospace",
              backgroundColor: "#E9F3F7",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            After generate NFT contract users can share mint link to own
            users/costumers that they can mint their own NFTs using generated
            NFT contract{" "}
          </p>
        </div>
      </div>
      <div className="row">
        <div
          className="column"
          style={{ backgroundColor: "white", textAlign: "justify" }}
        >
          <p
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#467889",
              marginTop: "50px",
              fontFamily: "monospace",
              backgroundColor: "#E9F3F7",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            Generated contract could be art collection , virual product or maybe
            tokenized product, ticket and anything that you might need to
            create/supply and a your community/costumers is able to mint them.
          </p>
        </div>
        <div className="column" style={{ backgroundColor: "white" }}></div>
        <div className="column" style={{ backgroundColor: "white" }}></div>
      </div>
    </div>
  );
}
