import React, { useEffect, useState } from "react";
import axios from 'axios';
import DrugList from '../components/drug/DrugList';

function Drug(){
    const [drugList, setDrugs] = useState([]);

    useEffect(() => {
        axios.get('/drug')
            .then(res => {
                if (res.data.success){
                    setDrugs(res.data.drug)
                } else {
                    alert('정보 부르기 실패!')
                }
            });
    }, []);

    return(
        <>
            <DrugList drugList={drugList}/>
        </>
    );
}

export default Drug;