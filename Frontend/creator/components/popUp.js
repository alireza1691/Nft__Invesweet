import { Modal, Input, Card } from "web3uikit";
import { React ,useState, useEffect } from 'react'

export default function popUp() {


    let imageURI = "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"

    
    return (
        <div>
        <Modal >
            <Card title={"something"} description={"another thing"} style={{"height":"260px","width":"260px", "left":"48px"}} onClick={handleCardClick}>
                    <Image loader={()=>imageURI} src={imageURI} height="260" width="260"/>
            </Card>
            <Input label="" name="" type=""/>
        </Modal>
        </div>
    )
}