import { Modal, Input, Card } from "web3uikit";
import { React ,useState, useEffect } from 'react'
import Image from "next/image";

export default function PopUp() {


    let imageURI = "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"

    function clickButtonHandler() {
        console.log("test");
    }

    
    return (
        <div>
        <Modal isVisible={false}>
            <Card title={"something"} description={"another thing"} style={{"height":"260px","width":"260px", "left":"48px"}} onClick={clickButtonHandler()}>
                    <Image loader={()=>imageURI} src={imageURI} height="260" width="260"/>
            </Card>
            <Input label="" name="" type=""/>
        </Modal>
        </div>
    )
}