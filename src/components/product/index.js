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
import { Add } from "@mui/icons-material";
import {
  addToWishList,
  removeFromWishList,
  selectWishListItems,
} from "../../state/wishlist/wishListSlice";

const Product = (props) => {
  const [productData, setProductData] = useState();
  const context = useContext(MyContext);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const wishList = useSelector(selectWishListItems);

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

  const isProductInWishList = () => {
    return wishList.some((item) => item.id === productData.id);
  };

  const addToCartHandler = (item) => {
    dispatch(addToCart(item));
  };

  const addToWishListHandler = (item) => {
    dispatch(addToWishList(item));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromWishList(itemId));
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
          {/* <Link to={`/product/${productData.slugproduct}`}> */}
          <div className="imgWrapper">
            <div className="heartIcon">
              {isProductInWishList() ? (
                <div
                  className="circleIconContainer"
                  onClick={() => handleRemoveItem(productData.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#2D73E3"
                    class="w-8 h-8"
                  >
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>{" "}
                </div>
              ) : (
                <div
                  className="circleIconContainer"
                  onClick={() => addToWishListHandler(productData)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#2D73E3"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="p-0 wrapperm mb-4">
              {/* <img
                  src={productData.images[0] + "?im=Resize=(500,500)"}
                  // src={productData.images[0]}
                  className="w-100"
                /> */}
              <img
                src={productData.images[0]}
                className="w-100"
                style={{
                  objectFit: "cover",
                  width: "200px",
                  height: "250px",
                  cursor: "auto",
                }}
              />
            </div>
          </div>
            <div className="info">
            <Link style={{ textDecoration: 'none' }} to={`/product/${productData.slugproduct}`}>

              <h4 className="title">
                {/* <Link to={`/product/${productData.slugproduct}`}> */}
                  {productData.name.substr(0, 50) + ""}
                {/* </Link> */}
              </h4>
              <div className="d-flex align-items-center mt-3">
                <div className="d-flex align-items-center w-100">
                  <p className="price text-g font-weight-bold">
                    {calculateDiscountPrice(
                      productData.price,
                      productData.discount
                    )}
                  </p>{" "}
                  {productData.discount !== "0" && (
                    <p className="oldPrice ml-auto">
                      {productData.price} Fcfa
                    </p>
                  )}
                </div>
              </div>
              <h4 className="discount1">
                {productData.discount !== "0" ? (
                  <span>{productData.discount} Fcfa de réduction</span>
                ) : (
                  <span>&nbsp;</span>
                )}
              </h4>
              </Link>

              {isProductInCart() ? (
                <QuantitySelector
                  itemId={productData.id}
                  quantity={getProductQuantityInCart()}
                  className="text-center" // Ajout de la classe pour centrer le composant
                />
              ) : (
                <Button
                  className="w-100 transition mt-3 rounded-button"
                  onClick={() => addToCartHandler(productData)}
                >
                  <ShoppingCartOutlinedIcon className="iconAddCart" />
                  Ajouter au panier
                </Button>
              )}
            </div>{" "}
        </>
      )}
    </div>
  );
};

export default Product;
