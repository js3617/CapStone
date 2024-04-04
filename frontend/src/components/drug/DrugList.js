import React from "react";

const DrugList = ({ drugList }) => {
    return (
        <div>
            {drugList.map(drug => {
                return (<div key={drug._id}>
                        {drug.drugName}
                    </div>)
            })}
        </div>
    );
};

export default DrugList;