import React, { useEffect, useState } from 'react'
import "./ListProduct"

const ListProduct = () => {
  const [allproducts, setAllproducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts').then((res) => res.json()).then((data) => {setAllproducts(data)});
  }

  useEffect(() => {
    fetchInfo();
  }, [])

  return (
    <div className="list-product">
        <h1>Products List</h1>

        <div className="listproduct-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>

        <div className="listproduct-allproducts">
          <hr />

          {allproducts.map}
        </div>
    </div>
  )
}

export default ListProduct