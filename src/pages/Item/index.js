import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Product from "../../components/product";
import { Button } from "@mui/material";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";

import { MyContext } from "../../App";
import SidebarItem from "../../components/SidebarItem";

const Item = (props) => {
  const [isOpenDropDown, setisOpenDropDown] = useState(false);
  const [isOpenDropDown2, setisOpenDropDown2] = useState(false);
  const [showPerPage, setHhowPerPage] = useState(3);

  const [data, setData] = useState([]);
 

  const context = useContext(MyContext);

  const [currentId, setCurrentId] = useState();
  const [itemTitle, setItemTitle] = useState("");

  let { id } = useParams();

  var itemsData = [];

  useEffect(() => {
    let uniqueProducts = {}; // Utilisation d'un objet pour stocker temporairement les produits uniques
  
    props.data[0]["categories"].forEach((category) => {
      category.SubCategory.forEach((subcategory) => {
        subcategory.Item.forEach((item) => {
          if (item.slugitem.toLowerCase() === id.toLowerCase()) {
            setItemTitle(item.title);
            item.Product.forEach((product) => {
              // Vérifier si le produit avec le même ID a déjà été ajouté
              if (!uniqueProducts[product.id]) {
                uniqueProducts[product.id] = {
                  ...product,
                  parentCatName: item.title,
                  subCatName: product.title,
                };
              }
            });
          }
        });
      });
    });
  
    // Convertir l'objet en tableau
    const uniqueProductsArray = Object.values(uniqueProducts);
    setData(uniqueProductsArray);
  
    window.scrollTo(0, 0);
  }, [id]);
  
  
  const filterByBrand = (keyword) => {
    props.data[0]["categories"].length !== 0 &&
      props.data[0]["categories"].map((category, index) => {
        category.SubCategory.length !== 0 &&
          category.SubCategory.map((subcategory) => {
            subcategory.Item.map((item, index) => {
              item.Product.map((product, index) => {
                if (product.brand.toLowerCase() === keyword.toLowerCase()) {
                  itemsData.push({
                    ...product,
                    parentCatName: item.title,
                    subCatName: subcategory.title,
                  });
                }
              });
            });
          });

      });

    const list2 = itemsData.filter(
      (item, index) => itemsData.indexOf(item) === index
    );

    setData(list2);

    window.scrollTo(0, 0);
  };

  const filterByRating = (keyword) => {};
  const filterByPrice = (minValue, maxValue) => {
    props.data[0]["categories"].length !== 0 &&
      props.data[0]["categories"].map((category, index) => {
        category.SubCategory.length !== 0 &&
          category.SubCategory.map((subcategory) => {
            subcategory.Item.length !== 0 &&
              subcategory.Item.map((item, index) => {
                if (item.slugitem === id) {
                  item.Product.length !== 0 &&
                    item.Product.map((product, index) => {
                      let price =
                        parseFloat(product.price.replace(/\s/g, "")) -
                        parseFloat(product.discount.replace(/\s/g, ""));
                      if (minValue <= price && maxValue >= price) {
                        itemsData.push({
                          ...product,
                          parentCatName: item.title,
                          subCatName: subcategory.title,
                        });
                      }
                    });
                }
              });
          });
        // }
        // } else {
        //   item.Item.length !== 0 &&
        //     item.Item.map((item_, index_) => {
        //       if (
        //         item_.title.split(" ").join("-").toLowerCase() ==
        //         id.split(" ").join("-").toLowerCase()
        //       ) {
        //         item_.Product.map((product) => {
        //           let price = parseInt(
        //             product.price.toString().replace(/,/g, "")
        //           );
        //           if (minValue <= price && maxValue >= price) {
        //             itemsData.push({
        //               ...product,
        //               parentCatName: item.title,
        //               subCatName: item_.title,
        //             });
        //           }
        //         });
        //       }
        //     });
        // }
      });

    const list2 = itemsData.filter(
      (item, index) => itemsData.indexOf(item) === index
    );
    setData(list2);
  };

  return (
    <>
      {context.windowWidth < 992 && (
        <>
          {context.isopenNavigation === false && (
            <Button
              className="btn-g btn-lg w-100 filterBtn"
              onClick={() => context.openFilters()}
            >
              Filters
            </Button>
          )}
        </>
      )}

      <section className="listingPage">
        <div className="container-fluid">
          {
            <div className="breadcrumb flex-column">
              <h1 className="text-capitalize">{itemTitle}</h1>
              <ul className="list list-inline mb-0">
                <li className="list-inline-item">
                  <Link to="/">Accueil </Link>
                </li>
                <li className="list-inline-item">
                  <Link
                    to={`/cat/${sessionStorage.getItem("cat")}`}
                    className="text-capitalize"
                  >
                    {sessionStorage.getItem("cat")}{" "}
                  </Link>
                </li>
                {props.single === false && (
                  <li className="list-inline-item">
                    <Link to={"/"} className="text-capitalize">
                      {id.split("-").join(" ")}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          }

          <div className="listingData">
            <div className="row">
              <div
                className={`col-md-3 sidebarWrapper ${
                  context.isOpenFilters === true && "click"
                }`}
              >
                {/* {data.length !== 0 && ( */}
                <SidebarItem
                  data={props.data}
                  currentCatData={data}
                  filterByBrand={filterByBrand}
                  filterByPrice={filterByPrice}
                  filterByRating={filterByRating}
                />
                {/* )} */}
              </div>

              <div className="col-md-9 rightContent homeProducts pt-0">
                <div className="topStrip d-flex align-items-center">
                  <p className="mb-0">
                    {/* Nous avons trouvé{" "} */}
                    <span className="text-success">{data.length}</span> produits
                    pour vous !
                  </p>
                  <div className="ml-auto d-flex align-items-center">
                    <div className="tab_ position-relative">
                      <Button
                        className="btn_"
                        onClick={() => setisOpenDropDown(!isOpenDropDown)}
                      >
                        <GridViewOutlinedIcon /> Show: {showPerPage * 5}
                      </Button>
                      {isOpenDropDown !== false && (
                        <ul className="dropdownMenu">
                          <li>
                            <Button
                              className="align-items-center"
                              onClick={() => {
                                setisOpenDropDown(false);
                                setHhowPerPage(1);
                              }}
                            >
                              5
                            </Button>
                          </li>
                          <li>
                            <Button
                              className="align-items-center"
                              onClick={() => {
                                setisOpenDropDown(false);
                                setHhowPerPage(2);
                              }}
                            >
                              10
                            </Button>
                          </li>

                          <li>
                            <Button
                              className="align-items-center"
                              onClick={() => {
                                setisOpenDropDown(false);
                                setHhowPerPage(3);
                              }}
                            >
                              15
                            </Button>
                          </li>

                          <li>
                            <Button
                              className="align-items-center"
                              onClick={() => {
                                setisOpenDropDown(false);
                                setHhowPerPage(4);
                              }}
                            >
                              20
                            </Button>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="tab_ ml-3 position-relative">
                      <Button
                        className="btn_"
                        onClick={() => setisOpenDropDown2(!isOpenDropDown2)}
                      >
                        <FilterListOutlinedIcon /> Sort by: Featured{" "}
                      </Button>
                      {isOpenDropDown2 !== false && (
                        <ul className="dropdownMenu">
                          <li>
                            <Button
                              className="align-items-center"
                              onClick={() => setisOpenDropDown2(false)}
                            >
                              Featured
                            </Button>
                          </li>
                          <li>
                            <Button
                              className="align-items-center"
                              onClick={() => setisOpenDropDown2(false)}
                            >
                              {" "}
                              Price: Low to High
                            </Button>
                          </li>
                          <li>
                            <Button
                              className="align-items-center"
                              onClick={() => setisOpenDropDown2(false)}
                            >
                              {" "}
                              Price: High to Low
                            </Button>
                          </li>
                          <li>
                            <Button
                              className="align-items-center"
                              onClick={() => setisOpenDropDown2(false)}
                            >
                              {" "}
                              Release Date
                            </Button>
                          </li>
                          <li>
                            <Button
                              className="align-items-center"
                              onClick={() => setisOpenDropDown2(false)}
                            >
                              {" "}
                              Avg. Rating
                            </Button>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                <div className="productRow pl-4 pr-3">
                  {data.length !== 0 &&
                    data.map((item, index) => {
                      return (
                        <div className="item" key={index}>
                          <Product brand={item.brand} item={item} />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Item;
