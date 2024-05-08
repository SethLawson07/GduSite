import React, { useEffect, useRef, useState, useContext } from "react";
import Slider from "react-slick";
import "./style.css";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


import { MyContext } from "../../App";
const CatSlider = (props) => {
  const [allData, setAllData] = useState(props.data);
  const [totalLength, setTotalLength] = useState([]);
  const context = useContext(MyContext);

  const [itemBg, setItemBg] = useState([
    "#fffceb",
    "#ecffec",
    "#feefea",
    "#fff3eb",
    "#fff3ff",
    "#f2fce4",
    "#feefea",
    "#fffceb",
    "#feefea",
    "#ecffec",
    "#feefea",
    "#fff3eb",
    "#fff3ff",
    "#f2fce4",
    "#feefea",
    "#fffceb",
    "#feefea",
    "#ecffec",
  ]);

  const slider = useRef();

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    fade: false,
    arrows: context.windowWidth > 992 ? true : false,
    autoplay: context.windowWidth > 992 ? 2000 : false,
    centerMode: context.windowWidth > 992 ? true : false,
  };

  var catLength = 0;
  var lengthArr = [];
  useEffect(() => {
    allData.length !== 0 &&
      allData.map((category, index) => {
        category.SubCategory.length !== 0 &&
          category.SubCategory.map((subcategory) => {});
        lengthArr.push(catLength);
        catLength = 0;
      });

    const list = lengthArr.filter(
      (item, index) => lengthArr.indexOf(item) === index
    );
    setTotalLength(list);
  }, []);

  return (
    <>
      <div className="catSliderSection">
        <div className="container-fluid" ref={slider}>
          <h2 className="hd ctitle">Catégories</h2>
          {/* <Carousel
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
                  items: 10,
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
            > */}
          <Slider
            {...settings}
            className="cat_slider_Main"
            id="cat_slider_Main"
          >
        
              {allData.length !== 0 &&
                allData.map((item, index) => {
                  return (
                    <div className="item" key={index}>
                      <Link
                        to={`/categories/${item.slugcategory.toLowerCase()}`}
                      >
                        <div className="Catcircle">
                          <img src={item.image} alt="Votre image" />
                          <p>{item.title}</p>
                          {/* <p>{totalLength[index]} Item</p> */}
                        </div>
                       
                      </Link>
                    </div>
                  );
                })}{" "}
          </Slider>         
             {/* </Carousel> */}

        </div>
      </div>
    </>
  );
};

export default CatSlider;
