import React from 'react'
import { useState, useEffect } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProducts(result);
    }

    console.warn(products);

    const searchHandler = async (event) => {
        let key = event.target.value;
        if(key) {
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json()
            if(result){
                setProducts(result)
            }
        } else {
            getProducts();
        }
        
    }

  return (
    <div className="product-list">
        <div className="table_section">
      <input type="" className="search-product-box" placeholder="Search customer..." onChange={searchHandler} />
      
      <table>
    <thead>
      <tr>
        <th>#</th>
        <th><b>Date ↓</b></th>
        <th>Status</th>
        <th>Customer</th>
        <th>Purchased</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
    {
        products.length > 0 ? products.map((item, index) =>
      <tr  key={item}>
        <td>#{index+1019}</td>
        <td>{item.date}</td>
        <td>{item.status}</td>
        <td>{item.name}</td>
        <td>{item.category}</td>
        <td>${item.price}     ...</td>
      </tr>
       )
       :
       <h1>No Result Found</h1>
     }
    </tbody>
  </table>
</div>
     
    
       
    </div>
  )
}

export default ProductList
