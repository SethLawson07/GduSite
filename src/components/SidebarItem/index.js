import React, { useEffect, useState, useContext } from "react";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Radio from "@mui/material/Radio";
import { Button } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Link, useParams } from "react-router-dom";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { MyContext } from "../../App";
import "./style.css"

const SidebarItem = (props) => {
  const [value, setValue] = useState([0, 1000000]);
  const [value2, setValue2] = useState(0);
  const [brandFilters, setBrandFilters] = useState([]);
  const [variants, setVariants] = useState([]);

  const context = useContext(MyContext);

  let { id } = useParams();

  useEffect(() => {
    let allBrands = [];
    props.data[0]["categories"].forEach((category) => {
      category.SubCategory.forEach((subcategory) => {
        subcategory.Item.forEach((item) => {
          item.Product.forEach((product) => {
            if (!allBrands.includes(product.brand) && product.brand !== "") {
              allBrands.push(product.brand);
            }
          });
        });
      });
    });

    setBrandFilters(props.brands);
    setVariants(props.variants);
  }, [props.data, props.brands, props.variants]);

  useEffect(() => {
    var price = 0;
    props.currentCatData.forEach((item) => {
      let prodPrice = parseInt(item.price.toString().replace(/,/g, ""));
      if (prodPrice > price) {
        price = prodPrice;
      }
    });
    setValue2(price);
  }, [props.currentCatData]);

  const filterByBrand = (keyword) => {
    props.filterByBrand(keyword);
  };

  const filterByPrice = (minValue, maxValue) => {
    props.filterByPrice(minValue, maxValue);
  };

  useEffect(() => {
    filterByPrice(value[0], value[1]);
  }, [value]);

  const filterByVariant = (key, value) => {
    props.filterByVariant(key, value);
  };

  const resetFilters = () => {
    setValue([0, 1000000]);
    setBrandFilters(props.brands);
    setVariants(props.variants);
  };

  return (
    <>
      <div className={`sidebar ${context.isOpenFilters === true && "open"}`}>
        <div className="card border-0 shadow">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <h4>Prix</h4>
            </AccordionSummary>
            <AccordionDetails>
              <RangeSlider
                value={value}
                onInput={setValue}
                min={0}
                max={1000000}
                step={5}
              />
              <div className="d-flex pt-2 pb-0 priceRange">
                <span>
                  From:{" "}
                  <strong className="text-success"> {value[0]} Fcfa</strong>
                </span>
                <span className="ml-auto">
                  To: <strong className="text-success"> {value[1]} Fcfa</strong>
                </span>
              </div>
            </AccordionDetails>
          </Accordion>

          <div className="filters pt-5">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <h4>Marques</h4>
              </AccordionSummary>
              <AccordionDetails>
                <ul className="mb-0">
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    {brandFilters.length !== 0 &&
                      brandFilters.map((item, index) => {
                        return (
                          <li key={index}>
                            <FormControlLabel
                              value={item}
                              control={
                                <Radio onChange={() => filterByBrand(item)} />
                              }
                              label={item}
                                className="radio-label"
                            />
                          </li>
                        );
                      })}
                  </RadioGroup>
                </ul>
              </AccordionDetails>
            </Accordion>
          </div>

          {variants.length > 0 &&
            variants.map((variant, index) => (
              <Accordion key={index} className="mb-4">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-${index}-content`}
                  id={`panel-${index}-header`}

                >
                  <h4>{variant.key}</h4>
                </AccordionSummary>
                <AccordionDetails>
                  <ul className="mb-0">
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name={`radio-buttons-group-${index}`}
                    >
                      {variant.values.map((value, i) => (
                        <li key={i}>
                          <FormControlLabel
                            value={value}
                            control={
                              <Radio
                                onChange={() =>
                                  filterByVariant(variant.key, value)
                                }
                              />
                            }
                            label={value}
                              className="radio-label"
                          />
                        </li>
                      ))}
                    </RadioGroup>
                  </ul>
                </AccordionDetails>
              </Accordion>
            ))}
          <Button variant="outlined" className="mt-5" color="error" onClick={resetFilters}>
          Réinitialiser
          </Button>

          {/* <div className="d-flex filterWrapper">
            <Button
              className="btn btn-g w-100"
              onClick={() => context.openFilters()}
            >
              <FilterAltOutlinedIcon /> Filter
            </Button>
           
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SidebarItem;
