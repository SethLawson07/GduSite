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
import "./style.css"
import Product from "../../components/product";
import { MyContext } from "../../App";

const DetailsService = (props) => {
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

  const [reviewsArr, setReviewsArr] = useState([]);

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

    props.data[0]["services"].length !== 0 &&
      props.data[0]["services"].map((service) => {
        service.TypeService.length !== 0 &&
          service.TypeService.map((typeservice) => {
            // subcategory.Item.length !== 0 &&
            // subcategory.Item.map((item) => {
            typeservice.ItemService.map((item) => {
              if (item.slugitemservice === id) {
                setCurrentProduct(item);
              }
            });
            // });
          });
      });

    //related products code

    const related_products = [];

    const currentItem = props.data[0]["services"]
      .flatMap((service) => service.TypeService)
      .find((typeservice) =>
        typeservice.ItemService.some((item) => item.slugitemservice === id)
      );

    if (currentItem) {
      const currentItemID = currentItem.id;

      props.data[0]["services"].forEach((service) => {
        service.TypeService.forEach((typeservice) => {
          typeservice.ItemService.forEach((item) => {
            if (item.id === currentItemID) {
              if (item.slugserviceproduct !== id) {
                related_products.push(item);
              }
            }
          });
        });
      });
    }

    if (related_products.length !== 0) {
      setRelatedProducts(related_products);
    }
  }, [id]);

  const changeInput = (name, value) => {
    if (name === "rating") {
      setRating(value);
    }
    setReviewFields(() => ({
      ...reviewFields,
      [name]: value,
      productId: id,
      date: new Date().toLocaleString(),
    }));
  };

  return (
    <>
      {context.windowWidth < 992 && (
        <Button
          className={`btn-g btn-lg w-100 filterBtn {isAlreadyAddedInCart===true && 'no-click'}`}
          // onClick={() => addToCart(currentProduct)}
        >
          <ShoppingCartOutlinedIcon />
          {isAdded === true || isAlreadyAddedInCart === true
            ? "Ajouté"
            : "Commander"}
        </Button>
      )}

      <section className="detailsPage mb-5">
        <br />
        <div className="container detailsContainer pt-3 pb-3">
          <div className="row">
            {/* productZoom code start here */}

            <div className="col-md-1">
              <Slider {...settings} className="zoomSlider" ref={zoomSlider}>
                {currentProduct.image !== undefined &&
                  currentProduct.image.map((imgUrl, index) => {
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
                  {currentProduct.image !== undefined &&
                    currentProduct.image.map((imgUrl, index) => {
                      return (
                        <div className="item">
                          <InnerImageZoom
                            zoomType="hover"
                            zoomScale={1}
                            src={`${imgUrl}?im=Resize=(${bigImageSize[0]},${bigImageSize[1]})`}
                          />
                        </div>
                      );
                    })}
                </Slider>
              </div>
            </div>
            {/* productZoom code ends here */}

            {/* product info code start here */}
            <div className="col-md-6 productInfo">
              <h1>{currentProduct.title}</h1>
              {/* <div className="d-flex align-items-center mb-4 mt-3">
                <Rating
                  name="half-rating-read"
                  value={parseFloat(currentProduct.rating)}
                  precision={0.5}
                  readOnly
                />
                <span className="text-light ml-2">(32 reviews)</span>
              </div> */}

              <div className="priceSec d-flex align-items-center mb-3">
                <span className="text-g priceLarge">
                  {currentProduct.price} Fcfa
                </span>
                {/* <div className="ml-3 d-flex flex-column">
                  <span className="text-org discount">
                    {currentProduct.discount} de reduction
                  </span>
                  <span className="text-light oldPrice">
                    {currentProduct.oldPrice} Fcfa
                  </span>
                </div> */}
              </div>

              <p>{currentProduct.description}</p>

              {currentProduct.weight !== undefined &&
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

              {currentProduct.RAM !== undefined &&
                currentProduct.RAM.length !== 0 && (
                  <div className="productSize d-flex align-items-center">
                    <span>RAM:</span>
                    <ul className="list list-inline mb-0 pl-4">
                      {currentProduct.RAM.map((RAM, index) => {
                        return (
                          <li className="list-inline-item">
                            <Link
                              className={`tag ${
                                activeSize === index ? "active" : ""
                              }`}
                              onClick={() => isActive(index)}
                            >
                              {RAM} GB
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

              {currentProduct.SIZE !== undefined &&
                currentProduct.SIZE.length !== 0 && (
                  <div className="productSize d-flex align-items-center">
                    <span>SIZE:</span>
                    <ul className="list list-inline mb-0 pl-4">
                      {currentProduct.SIZE.map((SIZE, index) => {
                        return (
                          <li className="list-inline-item">
                            <Link
                              className={`tag ${
                                activeSize === index ? "active" : ""
                              }`}
                              onClick={() => isActive(index)}
                            >
                              {SIZE}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

             
            </div>
            {/* product info code ends here */}
          </div>
          <div className="d-flex align-items-center">
                <div className="d-flex align-items-center">
                  {context.windowWidth > 992 && (
                    <Button
                      className="rounded-button"
                      // onClick={() => addToCart(currentProduct)}
                    >
                      <ShoppingCartOutlinedIcon />
                      {isAdded === true || isAlreadyAddedInCart === true
                        ? " Ajouté"
                        : " Commander"}
                    </Button>
                  )}
                  {/* <Button className=" btn-lg addtocartbtn  ml-3  wishlist btn-border">
                    <FavoriteBorderOutlinedIcon />{" "}
                  </Button>
                  <Button className=" btn-lg addtocartbtn ml-3 btn-border">
                    <CompareArrowsIcon />
                  </Button> */}
                </div>
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
                {/* <li className="list-inline-item">
                  <Button
                    className={`${activeTabs === 1 && "active"}`}
                    onClick={() => {
                      setActiveTabs(1);
                    }}
                  >
                    Additional info
                  </Button>
                </li> */}
                {/* <li className="list-inline-item">
                  <Button
                    className={`${activeTabs === 2 && "active"}`}
                    onClick={() => {
                      setActiveTabs(2);
                    }}
                  >
                    Reviews (3)
                  </Button>
                </li> */}
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
                        <tr className="stand-up">
                          <th>Stand Up</th>
                          <td>
                            <p>35″L x 24″W x 37-45″H(front to back wheel)</p>
                          </td>
                        </tr>
                        <tr className="folded-wo-wheels">
                          <th>Folded (w/o wheels)</th>
                          <td>
                            <p>32.5″L x 18.5″W x 16.5″H</p>
                          </td>
                        </tr>
                        <tr className="folded-w-wheels">
                          <th>Folded (w/ wheels)</th>
                          <td>
                            <p>32.5″L x 24″W x 18.5″H</p>
                          </td>
                        </tr>
                        <tr className="door-pass-through">
                          <th>Door Pass Through</th>
                          <td>
                            <p>24</p>
                          </td>
                        </tr>
                        <tr className="frame">
                          <th>Frame</th>
                          <td>
                            <p>Aluminum</p>
                          </td>
                        </tr>
                        <tr className="weight-wo-wheels">
                          <th>Weight (w/o wheels)</th>
                          <td>
                            <p>20 LBS</p>
                          </td>
                        </tr>
                        <tr className="weight-capacity">
                          <th>Weight Capacity</th>
                          <td>
                            <p>60 LBS</p>
                          </td>
                        </tr>
                        <tr className="width">
                          <th>Width</th>
                          <td>
                            <p>24″</p>
                          </td>
                        </tr>
                        <tr className="handle-height-ground-to-handle">
                          <th>Handle height (ground to handle)</th>
                          <td>
                            <p>37-45″</p>
                          </td>
                        </tr>
                        <tr className="wheels">
                          <th>Wheels</th>
                          <td>
                            <p>12″ air / wide track slick tread</p>
                          </td>
                        </tr>
                        <tr className="seat-back-height">
                          <th>Seat back height</th>
                          <td>
                            <p>21.5″</p>
                          </td>
                        </tr>
                        <tr className="head-room-inside-canopy">
                          <th>Head room (inside canopy)</th>
                          <td>
                            <p>25″</p>
                          </td>
                        </tr>
                        <tr className="pa_color">
                          <th>Color</th>
                          <td>
                            <p>Black, Blue, Red, White</p>
                          </td>
                        </tr>
                        <tr className="pa_size">
                          <th>Size</th>
                          <td>
                            <p>M, S</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>

          <br />

          <div className="relatedProducts homeProductsRow2  pt-5 pb-4">
            <h2 className="hd mb-0 mt-0">Services apparentés</h2>
            <br className="res-hide" />
            <Slider {...related} className="prodSlider">
              {relatedProducts.length !== 0 &&
                relatedProducts.map((product, index) => {
                  return (
                    <div className="item" key={index}>
                      <Product tag={product.type} item={product} />
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

export default DetailsService;
