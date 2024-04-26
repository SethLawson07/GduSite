import React, { useState, useEffect } from "react";
import "./style.css"; // Assurez-vous d'importer votre fichier de styles
import { allCategories } from "../../services/product";
import { Link } from "react-router-dom";

const Header = () => {
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            <span className="svgtext">Liste de souhaits</span>
          </div>{" "}
        </Link>
        <Link to="cart">
          <div className="subright">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <span className="svgtext">Panier</span>
          </div>
        </Link>
        <div className="subright account">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <span className="svgtext">Compte</span>
          <div className="dropdown-content">
            {/* <Link to="#">Login</Link>
            <Link to="#">Signup</Link> */}
            <Link to="signin">Connexion</Link>
            <Link to="signup">S'inscrire</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Nav = () => {
  const [categories, setCategories] = useState([]);

  async function fetchData() {
    try {
      const res = await allCategories();
      setCategories(res.data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <nav className="nav1">
      <div className="left">
        <input
          type="checkbox"
          id="toggle-dropdown"
          className="toggle-dropdown"
        />
        <label for="toggle-dropdown" className="category test1">
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
          Catégories
          <div className="dropdown">
            <ul className="scrollable-list">
              <div style={{ textAlign: "left" }}>
                <p className="dropTitle">All Categories</p>
              </div>{" "}
              {categories.map((category) => (
                <li key={category.id} className="submenu">
                  {category.title}
                  <ul className="second-dropdown">
                    {category.SubCategory.map((subCategory) => (
                      // <div key={subCategory.id} className="resn">
                      //   <span className="res-title">{subCategory.title}</span>
                      <ul className="res">
                        <li className="dropTitle">{subCategory.title}</li>

                        {subCategory.Item.map((item) => (
                          <li key={item.id}>{item.title}</li>
                        ))}
                      </ul>
                      // </div>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </label>

        {/* <div>
          <p>oklm1</p>
        </div> */}
      </div>
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
