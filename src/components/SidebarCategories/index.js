import React, { useEffect, useState, useContext } from "react";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import { Button } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Link, useParams } from "react-router-dom";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import { MyContext } from "../../App";

function valuetext(value) {
  return `${value}°C`;
}
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const SidebarCategories = (props) => {
  const [value, setValue] = useState([0, 1000000]);
  const [value2, setValue2] = useState(0);
  const [brandFilters, setBrandFilters] = React.useState([]);
  const [ratingsArr, setRatings] = React.useState([]);
  const [totalLength, setTotalLength] = useState([]);

  const context = useContext(MyContext);

  let { id } = useParams();

  var brands = [];
  var ratings = [];

  var catLength = 0;
  var lengthArr = [];
  useEffect(() => {
    props.data[0]["categories"].length !== 0 &&
      props.data[0]["categories"].map((category, index) => {
        category.SubCategory.length !== 0 &&
          category.SubCategory.map((subcategory) => {
            subcategory.Item.length !== 0 &&
              subcategory.Item.map((item) => {
                catLength += item.Product.length;
                var minPrice = Math.min(
                  ...item.Product.map((product) =>
                    parseFloat(product.price.replace(/ /g, ""))
                  )
                );
                var maxPrice = Math.max(
                  ...item.Product.map((product) =>
                    parseFloat(product.price.replace(/ /g, ""))
                  )
                );
                // setValue([minPrice, maxPrice]);
                // item.Product.length !== 0 &&
                // item.Product.map((product) => {
                //   console.log(product);

                // })
                // setValue([minPrice, maxPrice]);
              });
          });
        lengthArr.push(catLength);
        catLength = 0;
      });

    const list = lengthArr.filter(
      (item, index) => lengthArr.indexOf(item) === index
    );
    setTotalLength(list);
  }, []);

  useEffect(() => {
    brands = [];
    ratings = [];
    props.currentCatData.length !== 0 &&
      props.currentCatData.map((item) => {
        brands.push(item.brand);
        ratings.push(parseFloat(item.rating));
      });

    const brandList = brands.filter(
      (item, index) => brands.indexOf(item) === index
    );
    setBrandFilters(brandList);

    const ratings_ = ratings.filter(
      (item, index) => ratings.indexOf(item) === index
    );
    setRatings(ratings_);
  }, [id]);

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
    props.filterByPrice(minValue, maxValue)
}

  return (
    <>
      <div className={`sidebar ${context.isOpenFilters === true && "open"}`}>
        <div className="card border-0 shadow res-hide">
          <h3>{props.title}</h3>
          {/* <div className="catList">
            {props.data[0]["categories"].length !== 0 &&
              props.data[0]["categories"].map((item, index) => {
                return (
                  totalLength[index] > 0 && (
                    <Link to={`/categories/${item.slugcategory.toLowerCase()}`}>
                      <div className="catItem d-flex align-items-center">
                        <span className="img">
                          <img src={item.image} width={30} />
                        </span>
                        <h4 className="mb-0 ml-3 mr-3 text-capitalize">
                          {item.title}
                        </h4>
                        <span className="d-flex align-items-center justify-content-center rounded-circle ml-auto">
                          {totalLength[index]}
                        </span>
                      </div>
                    </Link>
                  )
                );
              })}
          </div> */}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <h3>{props.title}</h3>
            </AccordionSummary>
            <AccordionDetails>
              {/* <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                > */}
              {props.data[0]["categories"].length !== 0 &&
                props.data[0]["categories"].map((category, index) => {
                  if (category.title === props.title) {
                    category.SubCategory.length !== 0 &&
                      category.SubCategory.map((subcategory, index) => {
                        // console.log(subcategory.title);

                        return (
                          <div key={index}>
                            <h3>{subcategory.title}</h3>
                          </div>
                          // <li key={index}>
                          //   {" "}
                          //   <FormControlLabel
                          //     value={subcategory.title}
                          //     control={
                          //       <Radio
                          //         onChange={() =>
                          //           filterByBrand(subcategory.title)
                          //         }
                          //       />
                          //     }
                          //     label={subcategory.title}
                          //   />
                          // </li>
                        );
                      });
                  } else {
                    // console.log("nop");
                  }
                })}
              {/* </RadioGroup> */}
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="card border-0 shadow">
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

          <div className="filters pt-0">
            <h5>Filter By Ratings</h5>
            <ul>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                {ratingsArr.length !== 0 &&
                  ratingsArr.map((item, index) => {
                    return (
                      <li key={index}>
                        {" "}
                        <FormControlLabel
                          value={item}
                          control={
                            <Radio onChange={() => filterByRating(item)} />
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

export default SidebarCategories;
