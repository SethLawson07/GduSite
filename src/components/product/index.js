import React, { useEffect, useState, useContext } from "react";
import "./style.css";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useSelector, useDispatch } from "react-redux";

import { MyContext } from "../../App";
import { addToCart, selectCartItems } from "../../state/cart/cartSlice";
import QuantitySelector from "../../pages/cart/qteselector";
import { calculateDiscountPrice } from "../../utils";

const Product = (props) => {
  const [productData, setProductData] = useState();
  const context = useContext(MyContext);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    setProductData(props.item);
  }, [props.item]);

  const setProductCat = () => {
    sessionStorage.setItem("parentCat", productData.parentCatName);
    sessionStorage.setItem("subCatName", productData.subCatName);
  };

  const isProductInCart = () => {
    return cartItems.some((item) => item.id === productData.id);
  };

  const addToCartHandler = (item) => {
    dispatch(addToCart(item));
  };

  const getProductQuantityInCart = () => {
    const cartItem = cartItems.find((item) => item.id === productData.id);
    return cartItem ? cartItem.quantity : 0;
  };



  return (
    <div className="productThumb" onClick={setProductCat}>
      {props.brand !== null && props.brand !== "" && (
        <span className={`badge ${props.brand}`}>{props.brand}</span>
      )}

      {productData !== undefined && (
        <>
          <Link to={`/product/${productData.slugproduct}`}>
            <div className="imgWrapper">
              <div className="p-2 wrapper mb-0">
                <img
                  src={productData.images[0] + "?im=Resize=(500,500)"}
                  className="w-100"
                />
              </div>

              {/* <div className="overlay transition">
                <ul className="list list-inline mb-0">
                  <li className="list-inline-item">
                    <Link className="cursor" tooltip="Add to Wishlist">
                      <FavoriteBorderOutlinedIcon />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="cursor" tooltip="Compare">
                      <CompareArrowsOutlinedIcon />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="cursor" tooltip="Quick View">
                      <RemoveRedEyeOutlinedIcon />
                    </Link>
                  </li>
                </ul>
              </div> */}
            </div>
          </Link>

          <div className="info">
            <h4 className="title">
              <Link to={`/product/${productData.slugproduct}`}>
                {productData.name.substr(0, 50) + ""}
              </Link>
            </h4>
            <div className="d-flex align-items-center mt-3">
              <div className="d-flex align-items-center w-100">
                <span className="price text-g font-weight-bold">
                  {calculateDiscountPrice(productData.price,productData.discount)} 
                </span>{" "}
                {productData.discount !== "0" && (
                  <span className="oldPrice ml-auto">
                    {productData.price} Fcfa
                  </span>
                )}
              </div>
            </div>
            <h4 className="discount">
              {productData.discount !== "0" && (
                <span>{productData.discount} Fcfa de reduction</span>
              )}
            </h4>

            {isProductInCart() ? (
              <QuantitySelector
                itemId={productData.id}
                quantity={getProductQuantityInCart()}
              />
            ) : (
              <Button
                className="w-100 transition mt-3"
                onClick={() => addToCartHandler(productData)}
              >
                <ShoppingCartOutlinedIcon />
                Ajouter au panier
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
