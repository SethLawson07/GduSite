import React, { useState, useEffect, useRef } from "react";
import "./style.css"; // Assurez-vous d'importer votre fichier de styles
import { allCategories, allServices } from "../../services/product";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../state/cart/cartSlice";
import { selectWishListItems } from "../../state/wishlist/wishListSlice";
import { Button } from "@mui/material";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false); // State to store login status
  const [username, setUsername] = useState(""); // State to store username
  const cartItems = useSelector(selectCartItems);
  const wishList = useSelector(selectWishListItems);

  useEffect(() => {
    // Fetch login status from localStorage on component mount
    const isLogin = localStorage.getItem("islogin");
    if (isLogin) {
      setLoggedIn(true); // Update login status
      const user = JSON.parse(localStorage.getItem("customer"));
      setUsername(user.user_name); // Update username
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("islogin"); // Remove login status
    localStorage.removeItem("customer"); // Remove user data
    setLoggedIn(false); // Update login status
    setUsername(""); // Clear username
  };

  return (
    <div className="header1">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="brand">
          <img
            className="logo"
            src="https://phoenix-site-git-main-gedeonro.vercel.app/static/media/logo.2c561569f18eafeb72cf.jpeg"
            alt=""
          />
          <h2 className="name">Goodness Unit</h2>
        </div>
      </Link>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Rechercher..."
        />
      </div>

      <div className="right">
        {" "}
        <Link to="wishlist">
          <div className="subright">
            <div class="cart-icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 svgsr"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              <div class="cart-badge">{wishList.length}</div>
            </div>

            {/* <span className="svgtext">Liste de souhaits</span> */}
          </div>{" "}
        </Link>
        <Link to="cart">
          <div className="subright">
            <div class="cart-icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 svgsr"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              <div class="cart-badge">{cartItems.length}</div>
            </div>

            {/* <span className="svgtext">Panier</span> */}
          </div>
        </Link>
        <div className="subright account">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={loggedIn ? "green" : "none"}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 svgsr"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

          {/* <span className="svgtext">Compte</span> */}
          <div className="dropdown-content">
            {/* Display username if logged in */}
            {loggedIn && (
              <>
                <span>{username} </span>
                <br />
              </>
            )}
            {/* Display appropriate button based on login status */}
            {loggedIn ? (
              <Button color="error" onClick={handleLogout}>
                Déconnexion
              </Button>
            ) : (
              <>
                <Link to="signin">Connexion</Link>
                <Link to="signup">S'inscrire</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Nav = () => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false); // État pour contrôler la visibilité du dropdown
  const [dropdownOpen1, setDropdownOpen1] = useState(false); // État pour contrôler la visibilité du service dropdown

  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [activeServiceId, setActiveServiceId] = useState(null);

  async function fetchData() {
    try {
      let catgs = await allCategories();
      let servs = await allServices();
      setCategories(catgs.data);
      setServices(servs.data);
    } catch (error) {
      console.log("Error fetching", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {
      const dropdown = document.querySelector(".dropdown");
      const category = document.querySelector(".category");

      if (
        category && // Vérifier si les éléments existent
        dropdown &&
        !dropdown.contains(event.target) && // Vérifier si le clic est en dehors du dropdown
        !category.contains(event.target) // Vérifier si le clic est sur la catégorie
      ) {
        setDropdownOpen(false); // Fermer le dropdown
        setActiveCategoryId(null);
      }
    };

    const handleClickOutsideServiceDropdown = (event) => {
      const dropdown1 = document.querySelector(".dropdown1");
      const service = document.querySelector(".service");

      if (
        service && // Vérifier si les éléments existent
        dropdown1 &&
        !dropdown1.contains(event.target) && // Vérifier si le clic est en dehors du dropdown
        !service.contains(event.target) // Vérifier si le clic est sur la catégorie
      ) {
        setDropdownOpen1(false); // Fermer le dropdown
      }
    };

    // Ajouter un écouteur d'événements de clic au niveau de l'élément racine de l'application
    document.addEventListener("mousedown", handleClickOutsideDropdown);
    document.addEventListener("mousedown", handleClickOutsideServiceDropdown);

    return () => {
      // Nettoyer l'écouteur d'événements lors du démontage du composant
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
      document.removeEventListener(
        "mousedown",
        handleClickOutsideServiceDropdown
      );
    };
  }, []);

  const handleLabelClick = () => {
    // Vérifier s'il y a des catégories disponibles
    if (categories.length > 0 || services.length > 0) {
      // Extraire l'ID de la première catégorie et le définir comme activeCategoryId
      setActiveCategoryId(categories[0].id);
      setActiveServiceId(services[0].id);
    }
  };

  return (
    <nav className="nav1">
      <div className="left">
        <input
          type="checkbox"
          id="toggle-dropdown"
          className="toggle-dropdown"
          onChange={() => {
            setDropdownOpen(!dropdownOpen);
          }} // Inverser l'état de visibilité du dropdown lorsqu'on clique sur l'input
        />
        <label
          htmlFor="toggle-dropdown"
          className="category test1"
          onClick={handleLabelClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 svgnav"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
            />
          </svg>
          Catégories
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 svgnav"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
          <div
            className={`dropdown ${dropdownOpen ? "open" : ""}`}
            style={{ display: dropdownOpen ? "block" : "none" }}
          >
            {" "}
            {/* Ajouter la classe "open" lorsque le dropdown est ouvert */}
            <ul className="scrollable-list">
              {/* <div style={{ textAlign: "left" }}> */}
              <div style={{ marginLeft: "20px" }}>
                <p className="dropTitle">All Categories</p>
              </div>{" "}
              {categories.map((category) => (
                <>
                  {/* <Link to={`item/${category.title}`} onClick={ () =>{setDropdownOpen(false)}} > */}

                  <li
                    key={category.id}
                    className="submenu"
                    onMouseOver={() => {
                      setActiveCategoryId(category.id);
                      // console.log("Active category ID:", category.id);
                    }}
                    // onMouseOut={() => {
                    //   setActiveCategoryId(null);
                    //   console.log("Active category ID:", null);
                    // }}
                  >
                    {category.title}
                  </li>
                  {/* </Link> */}
                </>
              ))}
              <li className="submenu">test</li>
              <li className="submenu">test</li>
              <li className="submenu">test</li>
              <li className="submenu">test</li>
              <li className="submenu">test</li>
              <li className="submenu">test</li>
              <li className="submenu">test</li>
              <li className="submenu">test</li>
              <li className="submenu">test</li>
              <li className="submenu">test</li>
              <li className="submenu">test</li>
              <li className="submenu">test</li>
              <li className="submenu">test</li>
            </ul>
          </div>
          <div
            // className="second-dropdown"
            style={{
              display: activeCategoryId ? "block" : "none",
              display: dropdownOpen ? "block" : "none", // Afficher le second dropdown si la catégorie est survolée
            }}
            className={`second-dropdown ${dropdownOpen ? "open" : ""}`}
            // style={{ }}
          >
            {categories.map(
              (category) =>
                activeCategoryId === category.id && (
                  <ul key={category.id} className="">
                    {category.SubCategory.map((subCategory) => (
                      <ul key={subCategory.id} className="res">
                        <li className="dropTitle">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="blue"
                            class="w-6 h-6"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
                              clip-rule="evenodd"
                            />
                          </svg>

                          {subCategory.title}
                        </li>
                        {subCategory.Item.map((item) => (
                          // <Link
                          //   to={`item/${item.slugitem}`}
                          //   onClick={() => {
                          //     setDropdownOpen(false);
                          //   }}
                          //   style={{ textDecoration: "none" }}
                          // >
                            <li key={item.id} className="subDropTitle">
                              {item.title}
                            </li>
                          // </Link>
                        ))}
                      </ul>
                    ))}
                  </ul>
                )
            )}
          </div>
        </label>
      </div>

      <div className="left">
        <input
          type="checkbox"
          id="toggle-servicedropdown"
          className="toggle-servicedropdown"
          onChange={() => {
            setDropdownOpen1(!dropdownOpen1);
          }} // Inverser l'état de visibilité du dropdown lorsqu'on clique sur l'input
        />
        <label
          htmlFor="toggle-servicedropdown"
          className="service test1"
          onClick={handleLabelClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 svgnav"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
            />
          </svg>
          Services
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 svgnav"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
          <div
            className={`dropdown1 ${dropdownOpen1 ? "open" : ""}`}
            style={{ display: dropdownOpen1 ? "block" : "none" }}
          >
            {" "}
            {/* Ajouter la classe "open" lorsque le dropdown est ouvert */}
            <ul className="scrollable-list">
              {/* <div style={{ textAlign: "left" }}> */}
              <div style={{ marginLeft: "20px" }}>
                <p className="dropTitle">All Services</p>
              </div>{" "}
              {services.map((service) => (
                <>
                  {/* <Link to={`item/${category.title}`} onClick={ () =>{setDropdownOpen(false)}} > */}

                  <li
                    key={service.id}
                    className="submenu"
                    onMouseOver={() => {
                      setActiveServiceId(service.id);
                      // console.log("Active category ID:", category.id);
                    }}
                    // onMouseOut={() => {
                    //   setActiveCategoryId(null);
                    //   console.log("Active category ID:", null);
                    // }}
                  >
                    {service.title}
                  </li>
                  {/* </Link> */}
                </>
              ))}
              <li className="submenu">test</li>
              <li className="submenu">test</li>
              <li className="submenu">test</li>
              <li className="submenu">test</li>
              <li className="submenu">test</li>
              <li className="submenu">test</li>
              <li className="submenu">test</li>
              <li className="submenu">test</li>
              <li className="submenu">test</li>
              <li className="submenu">test</li>
              <li className="submenu">test</li>
              <li className="submenu">test</li>
              <li className="submenu">test</li>
              <li className="submenu">test</li>
              <li className="submenu">test</li>
              <li className="submenu">test</li>
            </ul>
          </div>
          <div
            // className="second-dropdown"
            style={{
              display: activeCategoryId ? "block" : "none",
              display: dropdownOpen1 ? "block" : "none", // Afficher le second dropdown si la catégorie est survolée
            }}
            className={`second-dropdown1 ${dropdownOpen1 ? "open" : ""}`}
            // style={{ }}
          >
            {services.map(
              (service) =>
                activeServiceId === service.id && (
                  <ul key={service.id} className="">
                    {service.TypeService.map((typeservice) => (
                      <ul key={typeservice.id} className="res">
                        <li className="dropTitle">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="blue"
                            class="w-6 h-6"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
                              clip-rule="evenodd"
                            />
                          </svg>

                          {typeservice.title}
                        </li>
                        {typeservice.ItemService.map((item) => (
                          // <Link
                          //   to={`item/${item.slugitemservice}`}
                          //   onClick={() => {
                          //     setDropdownOpen1(false);
                          //   }}
                          //   style={{ textDecoration: "none" }}
                          // >
                            <li key={item.id} className="subDropTitle">
                              {item.title}
                            </li>
                          // </Link>
                        ))}
                      </ul>
                    ))}
                  </ul>
                )
            )}
          </div>
        </label>
      </div>

      {/* <div className="left">
        <input
          type="checkbox"
          id="toggle-servicedropdown"
          className="toggle-servicedropdown"
          onChange={() => setDropdownOpen2(!dropdownOpen2)} // Inverser l'état de visibilité du dropdown lorsqu'on clique sur l'input
        />
        <label for="toggle-servicedropdown" className="service test1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 svgnav"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
            />
          </svg>
          Services
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 svgnav"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
          <ul
            className={`service-dropdown ${dropdownOpen2 ? "open" : ""}`}
            style={{ display: dropdownOpen2 ? "block" : "none" }}
          >
            {services.map((service) => (
              <ul key={service.id} className="res">
                <li className="dropTitle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="blue"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 6h.008v.008H6V6Z"
                    />
                  </svg>

                  {service.title}
                </li>
                {service.TypeService.map((typeservice) => (
                  <Link
                    to={`/typeservice/${typeservice.slugtypeservice}`}
                    style={{ textDecoration: "none" }}
                    onClick={() => {
                      setDropdownOpen2(false);
                    }}
                  >
                    <li key={typeservice.id} className="subDropTitle">
                      {typeservice.title}
                    </li>
                  </Link>
                ))}
              </ul>
            ))}
          </ul>
        </label>
      </div> */}
    </nav>
  );
};

const HeadNav = () => {
  return (
    <>
      <Header />
      <Nav />
    </>
  );
};

export default HeadNav;
