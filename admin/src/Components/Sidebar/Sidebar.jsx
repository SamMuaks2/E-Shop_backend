import React from 'react'
import "./Sidebar.css"
import { Link } from 'react-router-dom'
import AddProductIcon from "../../assets/Product_Cart.svg"
import ListProductIcon from "../../assets/Product_list_icon.svg"

const Sidebar = () => {
  return (
    <div className="sidebar">
        <Link to={'/addproduct'} style={{textDecoration: "none"}}>
            <div className="sidebar-item">
                <img src= {AddProductIcon} alt="" />
                <p>Add Product</p>
            </div>
        </Link>
        
        <Link to={'/listproduct'} style={{textDecoration: "none"}}>
            <div className="sidebar-item">
                <img src= {ListProductIcon} alt="" />
                <p>Product List</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar