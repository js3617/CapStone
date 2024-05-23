import React from "react";
import API_store from "../hooks/NaverAPI_store";
import StoreInformation from "../components/store/StoreInformation"

function Store(){
    return(
        <>
        <API_store/>
        <StoreInformation/>
        </>
    )
}

export default Store;