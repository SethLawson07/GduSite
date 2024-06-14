import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";

import { MyContext } from "../../App";
import Service from "../../components/service";

const Services = (props) => {
  const [isOpenDropDown, setisOpenDropDown] = useState(false);
  const [isOpenDropDown2, setisOpenDropDown2] = useState(false);
  const [showPerPage, setHhowPerPage] = useState(3);

  const [data, setData] = useState([]);

  const context = useContext(MyContext);

  const [currentId, setCurrentId] = useState();
  const [title, setTitle] = useState("");

  let { id } = useParams();

  useEffect(() => {
    var itemsData = [];
    
    props.data[0]["services"].length !== 0 &&
      props.data[0]["services"].map((service, index) => {
        if (service.slugservice.toLowerCase() == id.toLowerCase()) {
          setTitle(service.title);
          service.TypeService.length !== 0 &&
            service.TypeService.map((subtypeservice) => {
              subtypeservice.ItemService.map((item, index__) => {
                itemsData.push({
                  ...item,
                  parentCatName: item.title,
                  subCatName: item.title,
                });
              });
            });
        }
      });

    const list2 = itemsData.filter(
      (item, index) => itemsData.indexOf(item) === index
    );

    setData(list2);

    window.scrollTo(0, 0);
  }, [id]);

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

      <section className="listingPage" style={{marginTop:"160px"}}>
        <div className="container-fluid">
          {
            <div className="breadcrumb flex-column">
              <h1 className="text-capitalize">{title}</h1>
              <ul className="list list-inline mb-0">
                <li className="list-inline-item">
                  <Link to={"/"}>Accueil </Link>
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
                    <Link to={""} className="text-capitalize">
                      {id.split("-").join(" ")}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          }

          <div className="listingData">
            <div className="row">
              <div className="col-md-12 rightContent homeProducts pt-0">
                <div className="topStrip d-flex align-items-center">
                  <p className="mb-0">
                    {/* Nous avons {" "} */}
                    <span className="text-success">{data.length}</span> services
                    pour vous !
                  </p>
                </div>

                <div className="productRow pl-4 pr-3">
                  {data.length !== 0 &&
                    data.map((item, index) => {
                      return (
                        <div className="item" key={index}>
                          <Service tag={item.brand} item={item} />
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

export default Services;
