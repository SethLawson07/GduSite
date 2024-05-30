import React, { useState, useEffect, useRef, useContext } from "react";
import CatSlider from "../../components/catSlider";
import "./style.css";
import Product from "../../components/product";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";
import TopSlider from "../../components/topslider";
import MidSlider from "../../components/midslider/midslider";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ServiceSlider from "../../components/serviceSlider";
import Service from "../../components/service";
import BottomSlider from "../../components/bottomSlider/bottomSlider";

const Home = (props) => {
  const [prodData, setprodData] = useState(props.data);
  // console.log(prodData)

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

  return (
    <div style={{ display: "block" }}>
      {/* <SliderBanner /> */}

      <TopSlider data={prodData[0]["slider"]}/>

      {/* Produits populaires */}
      <section className="homeProducts homeProductWrapper">
        <div className="container-fluid">
          <div className="d-flex align-Item-center homeProductsTitleWrap">
            <h4 className="hd mb-0 mt-0 res-full ctitle">
              Produits ajoutés récemment
            </h4>
          </div>

          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass="carouselItem"
            partialVisible={false}
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024,
                },
                items: 5,
                partialVisibilityGutter: 40,
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0,
                },
                items: 1,
                partialVisibilityGutter: 30,
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464,
                },
                items: 2,
                partialVisibilityGutter: 30,
              },
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {prodData[0]["latest"].length !== 0 &&
              prodData[0]["latest"].map((item, index) => {
                return (
                  <div className="item" key={index}>
                    <Product brand={item.brand} item={item} />
                  </div>
                );
              })}
          </Carousel>
        </div>
      </section>

      {/* Area One */}

      <section className="homeProducts homeProductWrapper">
        {prodData[0]["areaOne"].length !== 0 &&
          prodData[0]["areaOne"].map((area, index) => {
            return (
              <div className="container-fluid" key={index}>
                {area.Section.length !== 0 &&
                  area.Section.map((section, secIndex) => {
                    return (
                      <div key={secIndex}>
                        <div className="d-flex align-Item-center homeProductsTitleWrap">
                          <h4 className="hd mb-0 mt-0 res-full ctitle">
                            {section.title}
                          </h4>
                        </div>
                        <Carousel
                          additionalTransfrom={0}
                          arrows
                          autoPlaySpeed={3000}
                          centerMode={false}
                          className=""
                          containerClass="container-with-dots"
                          dotListClass=""
                          draggable
                          focusOnSelect={false}
                          infinite
                          itemClass="carouselItem"
                          partialVisible={false}
                          keyBoardControl
                          minimumTouchDrag={80}
                          pauseOnHover
                          renderArrowsWhenDisabled={false}
                          renderButtonGroupOutside={false}
                          renderDotsOutside={false}
                          responsive={{
                            desktop: {
                              breakpoint: {
                                max: 3000,
                                min: 1024,
                              },
                              items: 5,
                              partialVisibilityGutter: 40,
                            },
                            mobile: {
                              breakpoint: {
                                max: 464,
                                min: 0,
                              },
                              items: 1,
                              partialVisibilityGutter: 30,
                            },
                            tablet: {
                              breakpoint: {
                                max: 1024,
                                min: 464,
                              },
                              items: 2,
                              partialVisibilityGutter: 30,
                            },
                          }}
                          rewind={false}
                          rewindWithAnimation={false}
                          rtl={false}
                          shouldResetAutoplay
                          showDots={false}
                          sliderClass=""
                          slidesToSlide={1}
                          swipeable
                        >
                          {section.Product.length !== 0 &&
                            section.Product.map((item, prodIndex) => {
                              return (
                                <div className="item" key={prodIndex}>
                                  <Product brand={item.brand} item={item} />
                                </div>
                              );
                            })}
                        </Carousel>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </section>

      {/* <Banners /> */}
      <MidSlider data={prodData[0]["slider"]} />

      {/* Area Two */}

      <section className="homeProducts homeProductWrapper">
        {prodData[0]["areaTwo"].length !== 0 &&
          prodData[0]["areaTwo"].map((area, index) => {
            return (
              <div className="container-fluid" key={index}>
                {area.Section.length !== 0 &&
                  area.Section.map((section, secIndex) => {
                    return (
                      <div key={secIndex}>
                        <div className="d-flex align-Item-center homeProductsTitleWrap">
                          <h4 className="hd mb-0 mt-0 res-full ctitle">
                            {section.title}
                          </h4>
                        </div>
                        <Carousel
                          additionalTransfrom={0}
                          arrows
                          autoPlaySpeed={3000}
                          centerMode={false}
                          className=""
                          containerClass="container-with-dots"
                          dotListClass=""
                          draggable
                          focusOnSelect={false}
                          infinite
                          itemClass="carouselItem"
                          partialVisible={false}
                          keyBoardControl
                          minimumTouchDrag={80}
                          pauseOnHover
                          renderArrowsWhenDisabled={false}
                          renderButtonGroupOutside={false}
                          renderDotsOutside={false}
                          responsive={{
                            desktop: {
                              breakpoint: {
                                max: 3000,
                                min: 1024,
                              },
                              items: 5,
                              partialVisibilityGutter: 40,
                            },
                            mobile: {
                              breakpoint: {
                                max: 464,
                                min: 0,
                              },
                              items: 1,
                              partialVisibilityGutter: 30,
                            },
                            tablet: {
                              breakpoint: {
                                max: 1024,
                                min: 464,
                              },
                              items: 2,
                              partialVisibilityGutter: 30,
                            },
                          }}
                          rewind={false}
                          rewindWithAnimation={false}
                          rtl={false}
                          shouldResetAutoplay
                          showDots={false}
                          sliderClass=""
                          slidesToSlide={1}
                          swipeable
                        >
                          {section.Product.length !== 0 &&
                            section.Product.map((item, prodIndex) => {
                              return (
                                <div className="item" key={prodIndex}>
                                  <Product brand={item.brand} item={item} />
                                </div>
                              );
                            })}
                        </Carousel>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </section>
      {/* Type de Service */}
      <ServiceSlider data={prodData[0]["services"]} />

      {/* Section des services  */}
      <section className="homeProducts homeProductWrapper">
        {prodData[0]["areaThree"].length !== 0 &&
          prodData[0]["areaThree"].map((area, index) => {
            return (
              <div className="container-fluid" key={index}>
                {area.Section.length !== 0 &&
                  area.Section.map((section, secIndex) => {
                    return (
                      <div key={secIndex}>
                        <div className="d-flex align-Item-center homeProductsTitleWrap">
                          <h4 className="hd mb-0 mt-0 res-full ctitle">
                            {section.title}
                          </h4>
                        </div>
                        <Carousel
                          additionalTransfrom={0}
                          arrows
                          autoPlaySpeed={3000}
                          centerMode={false}
                          className=""
                          containerClass="container-with-dots"
                          dotListClass=""
                          draggable
                          focusOnSelect={false}
                          infinite
                          itemClass="carouselItem"
                          partialVisible={false}
                          keyBoardControl
                          minimumTouchDrag={80}
                          pauseOnHover
                          renderArrowsWhenDisabled={false}
                          renderButtonGroupOutside={false}
                          renderDotsOutside={false}
                          responsive={{
                            desktop: {
                              breakpoint: {
                                max: 3000,
                                min: 1024,
                              },
                              items: 5,
                              partialVisibilityGutter: 40,
                            },
                            mobile: {
                              breakpoint: {
                                max: 464,
                                min: 0,
                              },
                              items: 1,
                              partialVisibilityGutter: 30,
                            },
                            tablet: {
                              breakpoint: {
                                max: 1024,
                                min: 464,
                              },
                              items: 2,
                              partialVisibilityGutter: 30,
                            },
                          }}
                          rewind={false}
                          rewindWithAnimation={false}
                          rtl={false}
                          shouldResetAutoplay
                          showDots={false}
                          sliderClass=""
                          slidesToSlide={1}
                          swipeable
                        >
                          {section.ItemService.length !== 0 &&
                            section.ItemService.map((item, prodIndex) => {
                              return (
                                <div className="item" key={prodIndex}>
                                  <Service brand={item.brand} item={item} />
                                </div>
                              );
                            })}
                        </Carousel>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </section>


      <BottomSlider data={prodData[0]["slider"]}/>

      <CatSlider data={prodData[0]["categories"]} />

      {/* <section className="topProductsSection">
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
      </section> */}
    </div>
  );
};

export default Home;
