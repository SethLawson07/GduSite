import React, { useEffect, useState, useContext } from "react";
import "./style.css";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import { MyContext } from "../../App";

const Service = (props) => {
  const [tsData, setTsData] = useState();
  const [isAdded, setIsAdded] = useState(false);
  const context = useContext(MyContext);

  useEffect(() => {
    setTsData(props.item);
  }, [props.item]);

  const setProductCat = () => {
    sessionStorage.setItem("parentCat", tsData.parentCatName);
    sessionStorage.setItem("subCatName", tsData.subCatName);
  };

  const addToCart = (item) => {
    context.addToCart(item);
    // Ajoutez le produit au localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.push(item);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    setIsAdded(true);
  };

  return (
    <div className="productThumb" onClick={setProductCat}>
      {props.brand !== null && props.brand !== undefined && (
        <span className={`badge ${props.brand}`}>{props.brand}</span>
      )}

      {tsData !== undefined && (
        <>
          <Link to={`/typeservice/${tsData.slugitemservice}`}>
            <div className="imgWrapper">
              <div className="p-0 wrapperm mb-0">
                <img
                  src={tsData.image[0]}
                  className="w-100"
                  style={{
                    objectFit: "cover",
                    width: "200px",
                    height: "250px",
                  }}
                />
              </div>
            </div>
          </Link>

          <div className="info">
            {/* <span className='d-block catName'>{tsData.brand}</span> */}
            <h4 className="title">
              <Link>{tsData.title.substr(0, 50) + ""}</Link>
            </h4>
            {/* <Rating name='half-rating-read' value={parseFloat(tsData.rating)} precision={0.5} readOnly /> */}
            {/* <span className='brand d-block text-g'>By <Link className='text-g'>{tsData.brand}</Link></span> */}

            <div className="d-flex align-items-center mt-3">
              <div className="d-flex align-items-center w-100">
                <span className="price text-g font-weight-bold">
                  {tsData.price} Fcfa 
                </span>{" "}
                {/* <span className='oldPrice ml-auto'>{tsData.oldPrice} Fcfa</span> */}
              </div>
            </div>

            {/* <Button className="w-100 transition mt-3 rounded-button">
              Voir plus
            </Button> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Service;
