import React from 'react';

const ProductList = ({ productList }) => {
    return (
        <div>
            {productList.map(product => {
                return (<div key={product._id}>
                    {product.drugName}
                </div>)
            })}
        </div>
    );
};

export default ProductList;