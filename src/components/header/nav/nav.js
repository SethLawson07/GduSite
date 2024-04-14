import React, { useEffect, useContext } from "react";
import "./nav.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GridViewIcon from "@mui/icons-material/GridView";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import { useState } from "react";
import { MyContext } from "../../../App";

const Nav = (props) => {
  const [navData, setNavData] = useState([]);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [openDropdownMenu, setDropdownMenu] = useState(false);
  const [openDropdownMenuIndex, setDropdownMenuIndex] = useState(null);

  const [openMegaMenu, setOpenMegaMenu] = useState(false);

  const context = useContext(MyContext);

  useEffect(() => {
    setNavData(props.data);
  }, []);

  useEffect(() => {
    setIsOpenNav(props.openNav);
  }, [props.openNav]);

  const closeNav = () => {
    props.closeNav();
  };

  const openDropdownFun = (index) => {
    setDropdownMenu(!openDropdownMenu);
    setDropdownMenuIndex(index);
  };

  return (
    <>
      {isOpenNav === true && (
        <div className="navbarOverlay" onClick={props.closeNav}></div>
      )}
      <div
        className={`nav d-flex align-items-center ${
          isOpenNav === true && "click"
        }`}
      >
        <div className="container-fluid">
          <div className="row position-relative">
            <div className="col-sm-2 part1 d-flex align-items-center">
              <Button className="bg-g text-white catTab res-hide">
                <GridViewIcon /> &nbsp;Browse All Categories{" "}
                <KeyboardArrowDownIcon />
              </Button>
            </div>

            <div className="col-sm-8 part2 position-static">
              <nav className={isOpenNav === true ? "open" : ""}>
                <ul className="list list-inline mb-0">
                  {/* <li className="list-inline-item">
                    <Button>
                      <Link to={"/"} onClick={props.closeNav}>
                        Home
                      </Link>
                    </Button>
                  </li> */}
{/* 
                  {navData.length !== 0 &&
                    navData.map((item, index) => {
                      return (
                        <li className="list-inline-item" key={index}>
                          <Button onClick={() => openDropdownFun(index)}>
                            <Link
                              to={`${
                                windowWidth > 992
                                  ? `/cat/${item.title.toLowerCase()}`
                                  : "#"
                              }`}
                              onClick={() =>
                                sessionStorage.setItem(
                                  "cat",
                                  item.title.toLowerCase()
                                )
                              }
                            >
                              {item.title}{" "}
                              <KeyboardArrowDownIcon
                                className={`${
                                  openDropdownMenu === true &&
                                  openDropdownMenuIndex === index &&
                                  "rotateIcon"
                                }`}
                              />
                            </Link>
                          </Button>
                          {item.Item.length !== 0 && (
                            <div
                              className={`dropdown_menu ${
                                openDropdownMenu === true &&
                                openDropdownMenuIndex === index &&
                                "open"
                              }`}
                            >
                              <ul>
                                {item.Item.map((item_, index_) => {
                                  return (
                                    <li key={index_}>
                                      <Button onClick={props.closeNav}>
                                        <Link
                                          to={`/cat/${item.title.toLowerCase()}/${item_.title
                                            .replace(/\s/g, "-")
                                            .toLowerCase()}`}
                                          onClick={() =>
                                            sessionStorage.setItem(
                                              "cat",
                                              item.title.toLowerCase()
                                            )
                                          }
                                        >
                                          {item_.title}
                                        </Link>
                                      </Button>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          )}
                        </li>
                      );
                    })} */}

                  {/* <li className="list-inline-item">
                    <Button onClick={props.closeNav}>
                      <Link>About</Link>
                    </Button>
                  </li> */}

                  <li className="list-inline-item position-static">
                    <Button onClick={() => setOpenMegaMenu(!openMegaMenu)}>
                      <Link>
                        Shop{" "}
                        <KeyboardArrowDownIcon
                          className={`${openMegaMenu === true && "rotateIcon"}`}
                        />
                      </Link>
                    </Button>
                    <div
                      className={`dropdown_menu megaMenu w-100 ${
                        openMegaMenu === true && "open"
                      }`}
                    >
                      {/* <div className="row">
                        {props.data.length !== 0 &&
                          props.data.map((item, index) => {
                            return (
                              <div className="col" key={index}>
                                <Link to={`/cat/${item.title.toLowerCase()}`}>
                                  {" "}
                                  <h4 className="text-g text-capitalize">
                                    {item.title}
                                  </h4>
                                </Link>
                                {item.Item.length !== 0 && (
                                  <ul className="mt-4 mb-0">
                                    {item.Item.map((item_, index) => {
                                      return (
                                        <li key={index}>
                                          <Link
                                            onClick={props.closeNav}
                                            to={`/cat/${item.title.toLowerCase()}/${item_.title
                                              .replace(/\s/g, "-")
                                              .toLowerCase()}`}
                                          >
                                            {item_.title}
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                )}
                              </div>
                            );
                          })}

                        <div className="col">
                          <img
                            src="https://wp.alithemes.com/html/nest/demo/assets/imgs/banner/banner-menu.png"
                            className="w-100"
                          />
                        </div>
                      </div> */}
                    </div>
                  </li>
                  <li className="list-inline-item">
                    <Button>
                      <Link>Blog</Link>
                    </Button>
                  </li>
                  {/* <li className='list-inline-item'>
                                        <Button><Link>Pages  <KeyboardArrowDownIcon /></Link>
                                        </Button>

                                        <div className='dropdown_menu'>
                                            <ul>
                                                <li><Button><Link to="/about">About Us</Link></Button></li>
                                                <li><Button><Link to="/about">Contact</Link></Button></li>
                                                <li><Button><Link to="/about">My Account</Link></Button></li>
                                                <li><Button><Link to="/about">Login</Link></Button></li>
                                                <li><Button><Link to="/about">Register</Link></Button></li>
                                                <li><Button><Link to="/about">Forgot password</Link></Button></li>
                                                <li><Button><Link to="/about">Reset password</Link></Button></li>
                                                <li><Button><Link to="/about">Purchase Guide</Link></Button></li>
                                                <li><Button><Link to="/about">Privacy Policy</Link></Button></li>
                                                <li><Button><Link to="/about">Terms of Service</Link></Button></li>
                                                <li><Button><Link to="/about">404 Page</Link></Button></li>
                                            </ul>
                                        </div>

                                    </li> */}
                  <li className="list-inline-item">
                    {/* <Button>
                      <Link>Contact</Link>
                    </Button> */}
                  </li>
                </ul>

                {windowWidth < 992 && (
                  <>
                    {context.isLogin !== "true" && (
                      <div className="pl-3 pr-3">
                        <br />
                        <Link to={"/signIn"}>
                          <Button
                            className="btn btn-g btn-lg w-100"
                            onClick={closeNav}
                          >
                            Sign In
                          </Button>
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </nav>
            </div>

            <div className="col-sm-2 part3 d-flex align-items-center">
              <div className="phNo d-flex align-items-center ml-auto">
                <span>
                  <HeadphonesOutlinedIcon />
                </span>
                <div className="info ml-3">
                  <h3 className="text-g mb-0">92 20 46 71</h3>
                  <p className="mb-0">24/7 Support Center</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
