import React from "react";
import API_pharmacy from "../hooks/NaverAPI_pharmacy";
import PharmacyInformation from "../components/pharmacy/PharmacyInformation"

function Pharmacy(){
    return(
        <>
        <API_pharmacy/>
        <PharmacyInformation/>
        </>
    )
}

export default Pharmacy;