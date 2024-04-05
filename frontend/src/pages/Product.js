import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/product/ProductList';

const Product = () => {
    const [productList, setProduct] = useState([]);

    useEffect(() => {
        axios.get('/product')
            .then(res => {
                if (res.data.success){
                    setProduct(res.data.product);
                }else {
                    alert('안녕하세요')
                }
            });
    }, []);
    return (
        <>
        <h1>Product</h1>
        <ProductList productList={productList}/>
        </>
    );
}

export default Product;