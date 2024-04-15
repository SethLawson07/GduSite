import React, { useState, useEffect } from "react";
import "./style.css";

import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { topProducts } from "../../../services/product";

const TopProducts = (props) => {
  const [topProductsData, setTopProductsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await topProducts();
        setTopProductsData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="topSelling_box">
        <h3>{props.title}</h3>

        {/* {topProductsData.slice(props.index,props.index+3).map((product, index) => ( */}
        {topProductsData.map((product, index) => (
                              // <Link to={`/product/${topProductsData.slugproduct}`}>

          <div className="items d-flex align-items-center" key={index}>
            <div className="img">
              <Link to="">
                <img src={product.images[0]} alt="Product" className="w-100" />
              </Link>
            </div>

            <div className="info px-3">
              <Link to={`/product/${product.slugproduct}`}>
                <h4>{product.name}</h4>
              </Link>
              <Rating
                name="half-rating-read"
                defaultValue={product.rating}
                precision={0.5}
                readOnly
              />
              <div className="d-flex align-items-center">
                <span className="price text-g font-weight-bold">{product.price} Fcfa</span>{" "}
                <span className="oldPrice">{product.oldPrice} Fcfa</span>
              </div>
            </div>
          </div> 
          // </Link>
        ))}
      </div>
      
    </>
  );
};

export default TopProducts;
