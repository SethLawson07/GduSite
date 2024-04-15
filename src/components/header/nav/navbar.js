import React, { useEffect, useState } from "react";
import "./navbar.css";
import { useNavigate, Link } from "react-router-dom";
import {
  ChevronRightIcon,
  HeartIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { allCategories } from "../../../services/product";

function Navbar1() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  async function getCategories() {
    const response = await allCategories();
    setCategories(response.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  const renderCategories = (categories) => {
    return categories.map((category) => (
      <li key={category.id} className="parent">
        <Link to={`/${category.title}`}>
          {category.title}
          <span className="expand">»</span>
        </Link>
        {category.SubCategory && category.SubCategory.length > 0 && (
          <ul className="child">
            {category.SubCategory.map((subCategory) => (
              <li key={subCategory.id} className="parent">
                <Link to={`/${category.title}/${subCategory.title}`}>
                  {subCategory.title}
                  <span className="expand">»</span>
                </Link>
                {subCategory.Item && subCategory.Item.length > 0 && (
                  <ul className="child">
                    {subCategory.Item.map((item) => (
                      <li key={item.id}>
                        <Link to={`/cat/${item.title.toLowerCase()}`}>
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <div className="menu-container">
      <ul className="multilevel-dropdown-menu">
        <li className="parent">
          <a href="#" className="title">
            <Squares2X2Icon className="icon" />
            Catégories
          </a>{" "}
          <ul className="child">{renderCategories(categories)}</ul>
        </li>

        <li className="parent">
          <a href="#">Services</a>
          <ul className="child">
            <li className="parent">
              <a href="#">
                mmmmmmmmm<span className="expand">»</span>
              </a>
              <ul className="child">
                <li>
                  <a href="#">Car</a>
                </li>
                <li>
                  <a href="#">Bike Race</a>
                </li>
                <li>
                  <a href="#">Fishing</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Barbies</a>
            </li>
            <li>
              <a href="#">Teddy Bear</a>
            </li>
            <li className="parent">
              <a href="#">
                Level 1 <span className="expand">»</span>
              </a>
              <ul className="child">
                <li>
                  <a href="#">Level 2 - Menu 1</a>
                </li>
                <li>
                  <a href="#">Level 2 - Menu 2</a>
                </li>
                <li className="parent">
                  <a href="#">
                    Level 2 - Menu 3<span className="expand">»</span>
                  </a>
                  <ul className="child">
                    <li>
                      <a href="#">Level 3 - Menu 1</a>
                    </li>
                    <li>
                      <a href="#">Level 3 - Menu 2</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Navbar1;
