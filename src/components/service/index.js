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
import {
  addserviceToCart,
  selectCartServices,
} from "../../state/cart/cartserviceSlice";
import { useDispatch, useSelector } from "react-redux";
import QuantitySelector from "../../pages/cart/qteselector";

const Service = (props) => {
  const [isData, setIsData] = useState();
  const [isAdded, setIsAdded] = useState(false);
  const context = useContext(MyContext);
  const dispatch = useDispatch();
  const cartServices = useSelector(selectCartServices);

  useEffect(() => {
    setIsData(props.item);
  }, [props.item]);

  const setServiceCat = () => {
    sessionStorage.setService("parentCat", isData.parentCatName);
    sessionStorage.setService("subCatName", isData.subCatName);
  };

  const isServiceInCart = () => {
    return cartServices.some((service) => service.id === isData.id);
  };

  // const isServiceInWishList = () => {
  //   return wishList.some((service) => service.id === productData.id);
  // };

  const addToCartHandler = (service) => {
    dispatch(addserviceToCart(service));
  };

  // const addToWishListHandler = (service) => {
  //   dispatch(addToWishList(service));
  // };

  // const handleRemoveService = (itemId) => {
  //   dispatch(removeFromWishList(itemId));
  // };

  const getServiceQuantityInCart = () => {
    const cartService = cartServices.find(
      (service) => service.id === isData.id
    );
    return cartService ? cartService.quantity : 0;
  };

  return (
    <div className="productThumb mr-5">
      {props.brand !== null && props.brand !== undefined && (
        <span className={`badge ${props.brand}`}>{props.brand}</span>
      )}

      {isData !== undefined && (
        <>
          <Link to={`/typeservice/${isData.slugitemservice}`}>
            <div className="imgWrapper">
              <div className="p-0 wrapperm mb-0">
                <img
                  src={isData.image[0]}
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
            {/* <span className='d-block catName'>{isData.brand}</span> */}
            <Link
              style={{ textDecoration: "none" }}
              to={`/typeservice/${isData.slugitemservice}`}
            >
              <h4 className="title">{isData.title.substr(0, 50) + ""}</h4>
              {/* <Rating name='half-rating-read' value={parseFloat(isData.rating)} precision={0.5} readOnly /> */}
              {/* <span className='brand d-block text-g'>By <Link className='text-g'>{isData.brand}</Link></span> */}

              <div className="d-flex align-items-center mt-3">
                <div className="d-flex align-items-center w-100">
                  <span className="price text-g font-weight-bold">
                    {isData.price} Fcfa
                  </span>{" "}
                  {/* <span className='oldPrice ml-auto'>{isData.oldPrice} Fcfa</span> */}
                </div>
              </div>
            </Link>
            <div className="quantity-container">
              {isServiceInCart() ? (
                <QuantitySelector
                  type="service"
                  id={isData.id}
                  quantity={getServiceQuantityInCart()}
                  className="qservice"
                />
              ) : (
                <Button
                  className="w-100 transition  rounded-button"
                  onClick={() => addToCartHandler(isData)}
                >
                  <ShoppingCartOutlinedIcon
                    className="iconAddCart"
                    fontSize="large"
                  />
                  Ajouter au panier
                </Button>
              )}{" "}
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
