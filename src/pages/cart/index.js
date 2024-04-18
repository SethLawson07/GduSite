import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import QuantityBox from '../../components/quantityBox';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { MyContext } from '../../App';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const context = useContext(MyContext);
    const history = useNavigate();

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCartItems);
    }, [context.cartItems]);

    const deleteItem = (id) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        setCartItems(updatedCartItems);
    };

    const emptyCart = () => {
        localStorage.removeItem('cart');
        setCartItems([]);
        context.emptyCart();
    };

    const updateCart = (items) => {
        setCartItems(items);
    };

    // Convertir le prix en nombre avant de l'utiliser dans les calculs
    const convertPriceToNumber = (price) => {
        return parseFloat(price.replace('.', '').trim());
    };

    // Calcul du sous-total pour chaque item du panier
    const calculateSubtotal = (item) => {
        return convertPriceToNumber(item.price) * item.quantity;
    };

    // Calcul du grand sous-total (total) en utilisant les sous-totaux de chaque item
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
    };

    return (
        <>
            {context.windowWidth > 992 && (
                <div className='breadcrumbWrapper mb-4'>
                    <div className='container-fluid'>
                        <ul className='breadcrumb breadcrumb2 mb-0'>
                            <li>
                                <Link to={'/'}>Home</Link>
                            </li>
                            <li>Shop</li>
                            <li>Cart</li>
                        </ul>
                    </div>
                </div>
            )}

            <section className='cartSection mb-5'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-8'>
                            <div className='d-flex align-items-center w-100'>
                                <div className='left'>
                                    <h1 className='hd mb-0'>Your Cart</h1>
                                    <p>
                                        There are <span className='text-g'>{cartItems.length}</span> products in your cart
                                    </p>
                                </div>

                                <span className='ml-auto clearCart d-flex align-items-center cursor' onClick={emptyCart}>
                                    <DeleteOutlineOutlinedIcon /> Clear Cart
                                </span>
                            </div>

                            <div className='cartWrapper mt-4'>
                                <div className='table-responsive'>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Unit Price</th>
                                                <th>Quantity</th>
                                                <th>Subtotal</th>
                                                <th>Remove</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {cartItems.map((item, index) => (
                                                <tr key={index}>
                                                    <td width={'50%'}>
                                                        <div className='d-flex align-items-center'>
                                                            <div className='img'>
                                                                <Link to={`/product/${item.slugproduct}`}>
                                                                    <img src={item.images[0] + '?im=Resize=(100,100)'} className='w-100' />
                                                                </Link>
                                                            </div>

                                                            <div className='info pl-4'>
                                                                <Link to={`/product/${item.slugproduct}`}>
                                                                    <h4>{item.name}</h4>
                                                                </Link>
                                                                <Rating
                                                                    name='half-rating-read'
                                                                    value={parseFloat(item.rating)}
                                                                    precision={0.5}
                                                                    readOnly
                                                                />{' '}
                                                                <span className='text-light'>({parseFloat(item.rating)})</span>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td width='20%'>
                                                        <span> {item.price} Fcfa</span>
                                                    </td>

                                                    <td>
                                                        <QuantityBox item={item} cartItems={cartItems} index={index} updateCart={updateCart} />
                                                    </td>

                                                    <td>
                                                        <span className='text-g'> {calculateSubtotal(item)} Fcfa</span>
                                                    </td>

                                                    <td align='center'>
                                                        <span className='cursor' onClick={() => deleteItem(item.id)}>
                                                            <DeleteOutlineOutlinedIcon />
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <br />

                            <div className='d-flex align-items-center'>
                                <Link to='/'>
                                    <Button className='btn-g'>
                                        <KeyboardBackspaceIcon /> Continue Shopping
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className='col-md-4 cartRightBox'>
                            <div className='card p-4 '>
                                <div className='d-flex align-items-center mb-4'>
                                    <h5 className='mb-0 text-light'>Subtotal</h5>
                                    <h3 className='ml-auto mb-0 font-weight-bold'>
                                        <span className='text-g'>
                                            {calculateTotal()} Fcfa
                                        </span>
                                    </h3>
                                </div>

                                <div className='d-flex align-items-center mb-4'>
                                    <h5 className='mb-0 text-light'>Shipping</h5>
                                    <h3 className='ml-auto mb-0 font-weight-bold'>
                                        <span>Free</span>
                                    </h3>
                                </div>

                                <div className='d-flex align-items-center mb-4'>
                                    <h5 className='mb-0 text-light'>Estimate for</h5>
                                    <h3 className='ml-auto mb-0 font-weight-bold'>United Kingdom</h3>
                                </div>

                                <div className='d-flex align-items-center mb-4'>
                                    <h5 className='mb-0 text-light'>Total</h5>
                                    <h3 className='ml-auto mb-0 font-weight-bold'>
                                        <span className='text-g'>
                                            {calculateTotal()} Fcfa
                                        </span>
                                    </h3>
                                </div>

                                <br />

                                <Link to={'/checkout'}>
                                    <Button
                                        className='btn-g btn-lg'
                                        onClick={() => {
                                            context.setCartTotalAmount(calculateTotal());
                                        }}>
                                        Proceed To CheckOut
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Cart;

