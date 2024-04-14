import React, { useEffect, useState, createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './responsive.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './pages/Home/index';
import About from './pages/About/index';
import Listing from './pages/Listing';
import NotFound from './pages/NotFound';
import DetailsPage from './pages/Details';
import Checkout from './pages/checkout';

import axios from 'axios';
import Cart from './pages/cart';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Loader from './assets/images/loading.gif';

import data from './data';

const MyContext = createContext();

// Moved the function declarations here
const addToCart = async (item) => { /* Function implementation */ }
const removeItemsFromCart = (id) => { /* Function implementation */ }
const emptyCart = () => { /* Function implementation */ }
const signOut = () => { /* Function implementation */ }
const signIn = () => { /* Function implementation */ }
const openFilters = () => { /* Function implementation */ }

function App() {
  const [productData, setProductData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isopenNavigation, setIsopenNavigation] = useState(false);
  const [isLogin, setIsLogin] = useState();
  const [isOpenFilters, setIsopenFilters] = useState(false);
  const [cartTotalAmount, setCartTotalAmount] = useState();

  useEffect(() => {
    getData('https://gubackend.onrender.com/product');
    const is_Login = localStorage.getItem('isLogin');
    setIsLogin(is_Login);
  }, []);

  useEffect(() => {
    if (productData.length !== 0) {
      setIsloading(false);
    }
  }, [productData]);

  const getData = async (url) => {
    try {
      const response = await axios.get(url);
      setProductData(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const value = {
    cartItems,
    isLogin,
    windowWidth,
    isOpenFilters,
    addToCart,
    removeItemsFromCart,
    emptyCart,
    signOut,
    signIn,
    openFilters,
    isopenNavigation,
    setIsopenNavigation,
    setCartTotalAmount,
    cartTotalAmount
  }

  return (
    <BrowserRouter>
      <MyContext.Provider value={value}>
        {isLoading ? (
          <div className='loader'><img src={Loader} alt="loading" /></div>
        ) : (
          <>
            <Header data={productData} />
            <Routes>
              <Route exact={true} path="/" element={<Home data={productData} />} />
              <Route exact={true} path="/cat/:id" element={<Listing data={productData} single={true} />} />
              <Route exact={true} path="/cat/:id/:id" element={<Listing data={data.productData} single={false} />} />
              <Route exact={true} path="/product/:id" element={<DetailsPage data={productData} />} />
              <Route exact={true} path="/cart" element={<Cart />} />
              <Route exact={true} path="/signIn" element={<SignIn />} />
              <Route exact={true} path="/signUp" element={<SignUp />} />
              <Route exact={true} path="/checkout" element={<Checkout />} />
              <Route exact={true} path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </>
        )}
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;

export { MyContext }
