import React, { useState, useEffect, useRef, useContext } from "react";
import SliderBanner from "./slider/index";
import CatSlider from "../../components/catSlider";

import Banners from "../../components/banners";

import "./style.css";
import Product from "../../components/product";
import Banner4 from "../../assets/images/banner4.jpg";

import Slider from "react-slick";
import TopProducts from "./TopProducts";
import axios from "axios";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";
import TopSlider from "../../components/topslider";
import MidSlider from "../../components/midslider/midslider";

const Home = (props) => {
  const [prodData, setprodData] = useState(props.data);

  const [catArray, setcatArray] = useState([]);
  const [activeTab, setactiveTab] = useState();
  const [activeTabIndex, setactiveTabIndex] = useState(0);
  const [activeTabData, setActiveTabData] = useState([]);

  const [bestSells, setBestSells] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  const productRow = useRef();
  const context = useContext(MyContext);

  var settings = {
    dots: false,
    infinite: context.windowWidth < 992 ? false : true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    fade: false,
    arrows: context.windowWidth < 992 ? false : true,
  };

  const catArr = [];

  useEffect(() => {
    prodData.length !== 0 &&
      prodData.map((category) => {
        catArr.push(category.title);

        // category.SubCategory.length !== 0 &&
        // category.SubCategory.map((subcategory) => {
        //     subcategory.Item.length !== 0 &&
        //     subcategory.Item.map((item) => {
        //             catArr.push(item.title);
        //     })
        // })
      });

    const list2 = catArr.filter(
      (category, index) => catArr.indexOf(category) === index
    );

    setcatArray(list2);

    // setactiveTab(list2[0])
    setactiveTab(list2[0]);

    window.scrollTo(0, 0);
  }, []);
  // })

  useEffect(() => {
    var arr = [];
    setActiveTabData(arr);
    prodData.length !== 0 &&
      prodData.map((category, index) => {
        if (category.title === activeTab) {
          category.SubCategory.length !== 0 &&
            category.SubCategory.map((subcategory) => {
              subcategory.Item.length !== 0 &&
                subcategory.Item.map((item) => {
                  item.Product.length !== 0 &&
                    item.Product.map((product) => {
                      arr.push({
                        ...product,
                        parentCatName: item.title,
                        subCatName: item.title,
                      });
                    });
                });
            });

          setActiveTabData(arr);
          // setTimeout(()=>{
          //     setIsLoadingProducts(false);
          // },[1000]);
        }
        // })
      });
  }, [activeTab, activeTabData]);

  const bestSellsArr = [];

  // useEffect(() => {
  //     prodData.length !== 0 &&
  //         prodData.map((category) => {
  //             if (category.title === "Electronique") {
  //                 category.SubCategory.length !== 0 &&
  //                 category.SubCategory.map((subcategory) => {
  //                     subcategory.Item.length !== 0 &&
  //                     subcategory.Item.map((item, index) => {
  //                         item.Product.length !== 0 &&
  //                         item.Product.map((product, index) => {
  //                                     bestSellsArr.push(product);
  //                                 })
  //                             })
  //                     })
  //                     setBestSells(bestSellsArr);

  //             }

  //         });

  //     // setBestSells(bestSellsArr);

  // }, [])

  // useEffect(() => {
  //     const tempBestSellsArr = [];

  //     prodData.forEach((category) => {
  //         if (category.title === "Electronique") {
  //             category.SubCategory.forEach((subcategory) => {
  //                 subcategory.Item.forEach((item) => {
  //                     item.Product.forEach((product) => {
  //                         tempBestSellsArr.push(product);
  //                     });
  //                 });
  //             });
  //         }
  //     });

  //     setBestSells(tempBestSellsArr);
  // }, [prodData]);

  
  return (
    <div style={{ display: "block" }}>
      {/* <SliderBanner /> */}

      <TopSlider />
      <CatSlider data={prodData} />

      {/* <Banners /> */}
      <MidSlider />

      <section className="homeProducts homeProductWrapper">
        <div className="container-fluid">
          <div className="d-flex align-Item-center homeProductsTitleWrap">
            <h2 className="hd mb-0 mt-0 res-full">Produits populaires</h2>
            <ul className="list list-inline ml-auto filterTab mb-0 res-full">
              {catArray.length !== 0 &&
                catArray.map((cat, index) => {
                  return (
                    <li className="list list-inline-item" key={index}>
                      <Link
                        className={`cursor text-capitalize 
                                                ${
                                                  activeTabIndex === index
                                                    ? "act"
                                                    : ""
                                                }`}
                        onClick={() => {
                          setactiveTab(cat);
                          setactiveTabIndex(index);
                          productRow.current.scrollLeft = 0;
                          setIsLoadingProducts(true);
                        }}
                      >
                        {cat}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>

          <div
            className={`productRow ${isLoadingProducts === true && "loading"}`}
            ref={productRow}
          >
            {activeTabData.length !== 0 &&
              activeTabData.map((item, index) => {
                return (
                  <div className="item" key={index}>
                    <Product tag={item.brand} item={item} />
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* 
            <section className='homeProducts homeProductsRow2 pt-0'>
                <div className='container-fluid'>
                    <div className='d-flex align-Item-center'>
                        <h2 className='hd mb-0 mt-0'>Meilleures ventes quotidiennes</h2>

                    </div>

                    <br className='res-hide' /><br  className='res-hide'/>
                    <div className='row'>
                        <div className='col-md-3 pr-5 res-hide'>
                            <img className="rounded w-100" src="https://res.cloudinary.com/do7y1l2dd/image/upload/v1713174739/Goodness/ynunvlwfhyay946yajfm.jpg" />
                        </div>

                        <div className='col-md-12'>
                            <Slider {...settings} className='prodSlider'>

                                {
                                    bestSells.length !== 0 &&
                                    bestSells.map((item, index) => {
                                        return (
                                            <div className='item' key={index}>
                                                <Product tag={item.brand} item={item} />
                                            </div>
                                        )
                                    })
                                }

                            </Slider>
                        </div>
                    </div>


                </div>
            </section> */}

      <MidSlider />

      <section className="topProductsSection">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <TopProducts title="Meilleure vente" index="0" />
            </div>

            <div className="col">
              <TopProducts title="Produits en vogue" index="3" />
            </div>

            <div className="col">
              <TopProducts title="Récemment ajoutés" index="6" />
            </div>

            <div className="col">
              <TopProducts title="Mieux notés" index="9" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
