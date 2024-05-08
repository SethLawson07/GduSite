import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import Slider from "react-slick";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Product from "../../components/product";
import { MyContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCartItems } from "../../state/cart/cartSlice";
import QuantitySelector from "../cart/qteselector";
import {
  addToWishList,
  selectWishListItems,
} from "../../state/wishlist/wishListSlice";
import "./style.css";

const DetailsPage = (props) => {
  const [bigImageSize, setBigImageSize] = useState([1500, 1500]);
  const [smlImageSize, setSmlImageSize] = useState([150, 150]);

  const [activeSize, setActiveSize] = useState(0);

  const [inputValue, setinputValue] = useState(1);

  const [activeTabs, setActiveTabs] = useState(0);

  const [currentProduct, setCurrentProduct] = useState({});
  const [isAdded, setIsadded] = useState(false);

  const context = useContext(MyContext);

  const [prodCat, setProdCat] = useState({
    parentCat: sessionStorage.getItem("parentCat"),
    subCatName: sessionStorage.getItem("subCatName"),
  });

  const [relatedProducts, setRelatedProducts] = useState([]);

  const [rating, setRating] = useState(0.0);

  const [isAlreadyAddedInCart, setisAlreadyAddedInCart] = useState(false);

  const [reviewFields, setReviewFields] = useState({
    review: "",
    userName: "",
    rating: 0.0,
    productId: 0,
    date: "",
  });

  const zoomSliderBig = useRef();
  const zoomSlider = useRef();

  let { id } = useParams();

  var settings2 = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrows: false,
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    vertical: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    fade: false,
    arrows: context.windowWidth > 992 ? true : false,
  };

  var related = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    fade: false,
    arrows: context.windowWidth > 992 ? true : false,
  };

  const goto = (index) => {
    zoomSlider.current.slickGoTo(index);
    zoomSliderBig.current.slickGoTo(index);
  };

  const isActive = (index) => {
    setActiveSize(index);
  };

  const plus = () => {
    setinputValue(inputValue + 1);
  };

  const minus = () => {
    if (inputValue !== 1) {
      setinputValue(inputValue - 1);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    props.data[0]["categories"].length !== 0 &&
      props.data[0]["categories"].map((category) => {
        category.SubCategory.length !== 0 &&
          category.SubCategory.map((subcategory) => {
            subcategory.Item.length !== 0 &&
              subcategory.Item.map((item) => {
                item.Product.map((product) => {
                  if (product.slugproduct === id) {
                    setCurrentProduct(product);
                  }
                });
              });
          });
      });
    //related products code

    const related_products = [];

    const currentItem = props.data[0]["categories"]
      .flatMap((category) =>
        category.SubCategory.flatMap((subcategory) => subcategory.Item)
      )
      .find((item) =>
        item.Product.some((product) => product.slugproduct === id)
      );

    if (currentItem) {
      const currentItemID = currentItem.id;

      props.data[0]["categories"].forEach((category) => {
        category.SubCategory.forEach((subcategory) => {
          subcategory.Item.forEach((item) => {
            if (item.Product.length !== 0 && item.id === currentItemID) {
              item.Product.forEach((product) => {
                if (product.slugproduct !== id) {
                  related_products.push(product);
                }
              });
            }
          });
        });
      });
    }

    if (related_products.length !== 0) {
      setRelatedProducts(related_products);
    }
  }, [id]);

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const wishList = useSelector(selectWishListItems);

  const addToCartHandler = (item) => {
    dispatch(addToCart(item));
  };

  const addToWishListHandler = (item) => {
    dispatch(addToWishList(item));
  };

  const isProductInCart = () => {
    return cartItems.some((item) => item.id === currentProduct.id);
  };

  const isProductInWishList = () => {
    return wishList.some((item) => item.id === currentProduct.id);
  };

  const getProductQuantityInCart = () => {
    const cartItem = cartItems.find((item) => item.id === currentProduct.id);
    return cartItem ? cartItem.quantity : 0;
  };

  const calculateDiscountPrice = (price, discount) => {
    if (!price || !discount) {
      // Handle case where price or discount is undefined
      return "Price or discount not available";
    }

    const priceWithoutSpaces = parseFloat(price.replace(/\s/g, ""));
    const discountWithoutSpaces = parseFloat(discount.replace(/\s/g, ""));
    const discountPrice = priceWithoutSpaces - discountWithoutSpaces;
    return discountPrice.toLocaleString("fr-FR") + " F CFA";
  };

  return (
    <>
      <section className="detailsPage mb-5">
        <br />

        <div className="container detailsContainer pt-3 pb-3">
          <div className="row">
            {/* productZoom code start here */}
            <div className="col-md-1">
              <Slider {...settings} className="zoomSlider" ref={zoomSlider}>
                {currentProduct.images !== undefined &&
                  currentProduct.images.map((imgUrl, index) => {
                    return (
                      <div className="item">
                        <img
                          src={`${imgUrl}?im=Resize=(${smlImageSize[0]},${smlImageSize[1]})`}
                          className="w-100"
                          onClick={() => goto(index)}
                        />
                      </div>
                    );
                  })}
              </Slider>
            </div>

            <div className="col-md-5">
              <div className="productZoom">
                <Slider
                  {...settings2}
                  className="zoomSliderBig"
                  ref={zoomSliderBig}
                >
                  {currentProduct.images !== undefined &&
                    currentProduct.images.map((imgUrl, index) => {
                      return (
                        <div className="item">
                          <InnerImageZoom
                            className="imgzoom"
                            zoomType="hover"
                            zoomScale={1}
                            src={`${imgUrl}?im=Resize=(${bigImageSize[0]},${bigImageSize[1]})`}
                          />
                        </div>
                      );
                    })}
                </Slider>
              </div>
              {/* <Slider {...settings} className="zoomSlider" ref={zoomSlider}>
                {currentProduct.images !== undefined &&
                  currentProduct.images.map((imgUrl, index) => {
                    return (
                      <div className="item">
                        <img
                          src={`${imgUrl}?im=Resize=(${smlImageSize[0]},${smlImageSize[1]})`}
                          className="w-100"
                          onClick={() => goto(index)}
                        />
                      </div>
                    );
                  })}
              </Slider> */}
              <div className="d-flex align-items-center btnSpace">
                <div className="d-flex align-items-center">
                  {isProductInCart() ? (
                    <QuantitySelector
                      itemId={currentProduct.id}
                      quantity={getProductQuantityInCart()}
                    />
                  ) : (
                    <Link
                      style={{ textDecoration: "none" }}
                      className="rounded-button"
                      onClick={() => addToCartHandler(currentProduct)}
                    >
                      <ShoppingCartOutlinedIcon className="iconAddCart"  fontSize="large"/>
                      Ajouter au panier
                    </Link>
                  )}
                  &nbsp;
                  {isProductInWishList() ? (
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/wishlist"
                      className="rounded-button1"
                    >
                      Voir ma liste de souhaits
                    </Link>
                  ) : (
                    <Link
                      style={{ textDecoration: "none" }}
                      className="rounded-button1"
                      onClick={() => addToWishListHandler(currentProduct)}
                    >
                      Ajouter à ma liste de souhaits
                    </Link>
                  )}
                </div>
              </div>
            </div>
            {/* productZoom code ends here */}

            {/* product info code start here */}
            <div className="col-md-6 productInfo">
              <h1>{currentProduct.name}</h1>

              <div className="priceSec d-flex align-items-center mb-3">
                <span className="text-g priceLarge">
                  {calculateDiscountPrice(
                    currentProduct.price,
                    currentProduct.discount
                  )}
                </span>
                <div className="ml-3 d-flex flex-column">
                  {currentProduct.discount !== "0" && (
                    <span className=" oldPrice">
                      {currentProduct.price} Fcfa
                    </span>
                  )}
                </div>
              </div>
              {currentProduct.discount !== "0" && (
                <p className="discount">{currentProduct.discount} gagné</p>
              )}

              <p className="description">{currentProduct.description}</p>

              {/* {currentProduct.weight !== undefined &&
                currentProduct.weight.length !== 0 && (
                  <div className="productSize d-flex align-items-center">
                    <span>Size / Weight:</span>
                    <ul className="list list-inline mb-0 pl-4">
                      {currentProduct.weight.map((item, index) => {
                        return (
                          <li className="list-inline-item">
                            <Link
                              className={`tag ${
                                activeSize === index ? "active" : ""
                              }`}
                              onClick={() => isActive(index)}
                            >
                              {item}g
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

              {currentProduct.size !== undefined &&
                currentProduct.size.length !== 0 && (
                  <div className="productSize d-flex align-items-center">
                    <span>SIZE:</span>
                    <ul className="list list-inline mb-0 pl-4">
                      {currentProduct.size.map((size, index) => {
                        return (
                          <li className="list-inline-item">
                            <Link
                              className={`tag ${
                                activeSize === index ? "active" : ""
                              }`}
                              onClick={() => isActive(index)}
                            >
                              {size}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

              {currentProduct.color !== undefined && currentProduct.color.length !== 0 && (
                  <div className="productSize d-flex align-items-center">
                    <span>COLOR:</span>
                    <ul className="list list-inline mb-0 pl-4">
                      {currentProduct.color.map((COLOR, index) => {
                        return (
                          <li className="list-inline-item">
                            <Link
                              className={`tag ${
                                activeSize === index ? "active" : ""
                              }`}
                              onClick={() => isActive(index)}
                            >
                              {COLOR}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )} */}

              {/* <div className="d-flex align-items-center">
                <div className="d-flex align-items-center">
                  {isProductInCart() ? (
                    <QuantitySelector
                      itemId={currentProduct.id}
                      quantity={getProductQuantityInCart()}
                    />
                  ) : (
                    <Button
                      className="btn-g btn-lg addtocartbtn rounded-button"
                      onClick={() => addToCartHandler(currentProduct)}
                    >
                      <ShoppingCartOutlinedIcon />
                      {isAdded === true || isAlreadyAddedInCart === true
                        ? " Ajouté"
                        : " Ajouter au panier"}
                    </Button>
                  )}
                  {isProductInWishList() ? (
                    <Link
                      to="/wishlist"
                      className="btn-lg addtocartbtn ml-3 wishlist btn-border"
                    >
                      Voir ma liste de souhaits
                    </Link>
                  ) : (
                    <Button
                      className=" btn-lg addtocartbtn  ml-3  wishlist btn-border"
                      onClick={() => addToWishListHandler(currentProduct)}
                    >
                      <FavoriteBorderOutlinedIcon />{" "}
                    </Button>
                  )}
                </div>
              </div> */}
            </div>
            {/* product info code ends here */}
          </div>

          <div className="card mt-5 p-5 detailsPageTabs">
            <div className="customTabs">
              <ul className="list list-inline">
                <li className="list-inline-item">
                  <Button
                    className={`${activeTabs === 0 && "active"}`}
                    onClick={() => {
                      setActiveTabs(0);
                    }}
                  >
                    Description
                  </Button>
                </li>
                {currentProduct.ProductVariant &&
                  currentProduct.ProductVariant.length !== 0 && (
                    <li className="list-inline-item">
                      <Button
                        className={`${activeTabs === 1 && "active"}`}
                        onClick={() => {
                          setActiveTabs(1);
                        }}
                      >
                        Spécifications
                      </Button>
                    </li>
                  )}
              </ul>

              <br />

              {activeTabs === 0 && (
                <div className="tabContent">
                  <p>{currentProduct.description}</p>
                </div>
              )}

              {activeTabs === 1 && (
                <div className="tabContent">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <tbody>
                        {currentProduct.ProductVariant.length !== 0 &&
                          currentProduct.ProductVariant.map(
                            (variant, index) => {
                              return (
                                <React.Fragment key={index}>
                                  {variant.title.map(
                                    (titleItem, titleIndex) => (
                                      <tr
                                        className="stand-up"
                                        key={`${index}_${titleIndex}`}
                                      >
                                        <th>{titleItem}</th>
                                        <td>
                                          <p>{variant.value[titleIndex]}</p>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </React.Fragment>
                              );
                            }
                          )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>

          <br />

          <div className="relatedProducts homeProductsRow2  pt-5 pb-4">
            <h2 className="hd mb-0 mt-0">Produits apparentés</h2>
            <br className="res-hide" />
            <Slider {...related} className="prodSlider">
              {relatedProducts.length !== 0 &&
                relatedProducts.map((product, index) => {
                  return (
                    <div className="item" key={index}>
                      <Product brand={product.brand} item={product} />
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailsPage;
