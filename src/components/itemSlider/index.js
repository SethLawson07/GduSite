import React, { useEffect, useRef, useState, useContext } from "react";
import Slider from "react-slick";
import "./style.css";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { MyContext } from "../../App";

const ItemSlider = (props) => {
  const [allData, setAllData] = useState([]);
  const [totalLength, setTotalLength] = useState([]);
  const context = useContext(MyContext);



  const slider = useRef();

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    fade: false,
    // arrows: context.windowWidth > 992 ? true : false,
    // autoplay: context.windowWidth > 992 ? 2000 : false,
    // centerMode: context.windowWidth > 992 ? true : false,
  };

  var catLength = 0;
  var lengthArr = [];
  useEffect(() => {
    // console.log(allData)
    // console.log(props.data)
    // allData.length !== 0 &&
    //   allData.map((category, index) => {
    //     category.SubCategory.length !== 0 &&
    //       category.SubCategory.map((subcategory) => {});
    //     lengthArr.push(catLength);
    //     catLength = 0;
    //   });

    // const list = lengthArr.filter(
    //   (item, index) => lengthArr.indexOf(item) === index
    // );
    // setTotalLength(list);
    setAllData(props.data)
    // console.log(props.data);

  }, [props.data]);

  return (
    <>
      <div className="catSliderSection">
        <div className="container-fluid" ref={slider}>
          <h2 className="hd ctitle">Items</h2>
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
                      to={`/item/${item.slugitem.toLowerCase()}`}
                    >
                      <div className="Catcircle">
                        <img src={item.image} alt="Votre image" />
                        <p>{item.title}</p>
                        {/* <p>{totalLength[index]} Item</p> */}
                      </div>
                    </Link>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default ItemSlider;
