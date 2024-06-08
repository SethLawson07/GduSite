import React, { useEffect, useState, useContext } from "react";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Radio from "@mui/material/Radio";
import { Button } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import bannerImg from "../../assets/images/banner1.jpg";
import { Link, useParams } from "react-router-dom";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import { MyContext } from "../../App";

function valuetext(value) {
  return `${value}°C`;
}
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const SidebarItem = (props) => {
  const [slugitem, setSlugItem] = useState();
  const [value, setValue] = useState([0, 1000000]);
  const [value2, setValue2] = useState(0);
  // const [brandFilters, setBrandFilters] = React.useState([]);
  const [brandFilters, setBrandFilters] = useState([]);
//   const [brands, setBrands] = useState([]);

  const [selectedBrands, setSelectedBrands] = useState([]);

  const [ratingsArr, setRatings] = React.useState([]);
  const [totalLength, setTotalLength] = useState([]);

  const context = useContext(MyContext);

  let { id } = useParams();

  var brands = [];
  var ratings = [];

  var catLength = 0;
  var lengthArr = [];
  useEffect(() => {
    let allBrands = [];
    let allItems = [];

    props.data[0]["categories"].length !== 0 &&
      props.data[0]["categories"].map((category, index) => {
        category.SubCategory.length !== 0 &&
          category.SubCategory.map((subcategory) => {
            subcategory.Item.length !== 0 &&
              subcategory.Item.map((item) => {
                // item.Product.length !== 0 &&
                // item.Product.map((item_) => {
                catLength += item.Product.length;
                // })
              });
          });
        lengthArr.push(catLength);
        catLength = 0;
      });

      props.data[0]["categories"].forEach((category) => {
        category.SubCategory.forEach((subcategory) => {
          subcategory.Item.forEach((item) => {
            
            item.Product.forEach((product) => {
              //brands
              if (!allBrands.includes(product.brand) && product.brand != "") {
                allBrands.push(product.brand);
              }
            });
          });
        });
      });

    const list = lengthArr.filter(
      (item, index) => lengthArr.indexOf(item) === index
    );
    setTotalLength(list);
    // setBrandFilters(allBrands);


  }, []);

  useEffect(() => {
    brands = [];
    props.currentCatData.length !== 0 &&
      props.currentCatData.map((item) => {
        brands.push(item.brand);
        ratings.push(parseFloat(item.rating));
        setSlugItem(item.slugitem);
      });

    const brandList = brands.filter(
      (item, index) => brands.indexOf(item) === index
    );
    // setBrandFilters(brandList);
    // console.log(props.brands);
    setBrandFilters(props.brands);
  }, [id,props.brands]);

  useEffect(() => {
    var price = 0;
    props.currentCatData.length !== 0 &&
      props.currentCatData.map((item, index) => {
        let prodPrice = parseInt(item.price.toString().replace(/,/g, ""));
        if (prodPrice > price) {
          price = prodPrice;
        }
      });

    setValue2(price);

    //setValue(price);
    //filterByPrice(price[0], price[1]);
  }, [props.currentCatData]);

  const filterByBrand = (keyword) => {
    props.filterByBrand(keyword);
  };

  const filterByRating = (keyword) => {
    props.filterByRating(parseFloat(keyword));
  };

  useEffect(() => {
    filterByPrice(value[0], value[1]);
  }, [value]);

  const filterByPrice = (minValue, maxValue) => {
    props.filterByPrice(minValue, maxValue);
  };

  return (
    <>
      <div className={`sidebar ${context.isOpenFilters === true && "open"}`}>
        <div className="card border-0 shadow">
          {/* <div className="filters pt-5">
            <h5>Items</h5>

            <ul className="mb-0">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                {brandFilters.length !== 0 &&
                  brandFilters.map((item, index) => {
                    return (
                      <li key={index}>
                        {" "}
                        <FormControlLabel
                          value={item}
                          control={
                            <Radio onChange={() => filterByBrand(item)} />
                          }
                          label={item}
                        />
                      </li>
                    );
                  })}
              </RadioGroup>
            </ul>
          </div> */}
          <h3>Prix</h3>

          <RangeSlider
            value={value}
            onInput={setValue}
            min={0}
            max={1000000}
            step={5}
          />

          <div className="d-flex pt-2 pb-2 priceRange">
            <span>
              From: <strong className="text-success"> {value[0]} Fcfa</strong>
            </span>
            <span className="ml-auto">
              From: <strong className="text-success"> {value[1]} Fcfa</strong>
            </span>
          </div>

          <div className="filters pt-5">
            <h5>Marques</h5>

            <ul className="mb-0">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                {brandFilters.length !== 0 &&
                  brandFilters.map((item, index) => {
                    return (
                      <li key={index}>
                        {" "}
                        <FormControlLabel
                          value={item}
                          control={
                            <Radio onChange={() => filterByBrand(item)} />
                          }
                          label={item}
                        />
                      </li>
                    );
                  })}
              </RadioGroup>
            </ul>
          </div>

          <div className="d-flex filterWrapper">
            <Button
              className="btn btn-g w-100"
              onClick={() => context.openFilters()}
            >
              <FilterAltOutlinedIcon /> Filter
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarItem;
