import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Rating from "@mui/material/Rating";
import { Button, TextField } from "@mui/material";
import QuantitySelector from "./qteselector";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { MyContext } from "../../App";
import { useSelector, useDispatch } from "react-redux";
import {
  emptyCart,
  removeFromCart,
  selectCartItems,
  updateQuantity,
} from "../../state/cart/cartSlice";
import { calculateDiscountPrice } from "../../utils";

const Cart = () => {
  const context = useContext(MyContext);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleClearCart = () => {
    dispatch(emptyCart());
  };

  const calculateSubtotal = (item) => {
    const priceWithoutSpaces = parseFloat(item.price.replace(/\s/g, ""));
    const discountWithoutSpaces = parseFloat(item.discount.replace(/\s/g, ""));
    const subtotal =
      (priceWithoutSpaces - discountWithoutSpaces) * item.quantity;
    return subtotal.toLocaleString("fr-FR") + " F CFA";
  };

  const calculateTotalOldPrice = () => {
    const totalPrice = cartItems.reduce(
      (total, item) =>
        total + parseFloat(item.price.replace(/\s/g, "")) * item.quantity,
      0
    );
    return totalPrice.toLocaleString("fr-FR") + " F CFA";
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce(
      (total, item) =>
        total +
        (parseFloat(item.price.replace(/\s/g, "")) -
          parseFloat(item.discount.replace(/\s/g, ""))) *
          item.quantity,
      0
    );
    return totalPrice.toLocaleString("fr-FR") + " F CFA";
  };

  const calculateTotalDiscount = () => {
    const totalPrice = cartItems.reduce(
      (total, item) =>
        total + parseFloat(item.discount.replace(/\s/g, "")) * item.quantity,
      0
    );
    return totalPrice.toLocaleString("fr-FR") + " F CFA";
  };

  return (
    <>
      {context.windowWidth > 992 && (
        <div className="breadcrumbWrapper mb-4">
          <div className="container-fluid">
            <ul className="breadcrumb breadcrumb2 mb-0">
              <li>
                <Link to={"/"}>Accueil</Link>
              </li>
              <li>Magasin</li>
              <li>Panier</li>
            </ul>
          </div>
        </div>
      )}

      <section className="cartSection mb-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <div className="d-flex align-items-center w-100">
                <div className="left">
                  {/* <h1 className="hd mb-0">Votre Panier</h1> */}
                  <p>
                    Il y a <span className="text-g">{cartItems.length}</span>{" "}
                    produit(s) dans votre panier
                  </p>
                </div>

                <span
                  className="ml-auto clearCart d-flex align-items-center cursor"
                  onClick={handleClearCart}
                >
                  <DeleteOutlineOutlinedIcon /> Vider le Panier
                </span>
              </div>

              <div className="cartWrapper mt-4">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Produit</th>
                        <th>Prix Unitaire</th>
                        <th>Quantité</th>
                        <th>Sous-total</th>
                        <th>&nbsp;</th>
                      </tr>
                    </thead>

                    <tbody>
                      {cartItems.map((item, index) => (
                        <tr key={index} className="fs">
                          <td width={"40%"}>
                            <div className="d-flex align-items-center ">
                              <div className="img">
                                <Link to={`/product/${item.slugproduct}`}>
                                  <img
                                    src={
                                      item.images[0] + "?im=Resize=(100,100)"
                                    }
                                    className="w-100"
                                  />
                                </Link>
                              </div>

                              <div className="info pl-4">
                                <Link to={`/product/${item.slugproduct}`}>
                                  <h4 className="fs">{item.name}</h4>
                                </Link>
                              </div>
                            </div>
                          </td>

                          <td width="20%">
                            <span>
                              {" "}
                              {calculateDiscountPrice(
                                item.price,
                                item.discount
                              )}
                            </span>{" "}
                            <br />
                            {item.discount !== "0" && (
                              <span className="oldPrice ml-auto fs">
                                {item.price} F CFA
                              </span>
                            )}
                          </td>

                          <td>
                            <QuantitySelector
                              itemId={item.id}
                              quantity={item.quantity}
                            />
                          </td>

                          <td>
                            <span className="text-g fs">
                              {calculateSubtotal(item)}
                            </span>
                          </td>

                          <td align="center">
                            <span
                              className="cursor"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <br />

              <div className="d-flex align-items-center">
                <Link to="/">
                  <Button className="btn-g">
                    <KeyboardBackspaceIcon /> Continuer vos Achats
                  </Button>
                </Link>
              </div>
            </div>

            <div className="col-md-4 cartRightBox">
              <div className="card p-4 ">
                <div className="d-flex align-items-center mb-4">
                  <h1 className="mb-0 textDark textBold">Résumé</h1>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <h4 className="mb-0 textDark">Coût total </h4>
                  <h3 className="ml-auto mb-0 font-weight-bold">
                    <span className="text-g">{calculateTotalOldPrice()}</span>
                  </h3>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <h4 className="mb-0 textDark">Gagné</h4>
                  <h3 className="ml-auto mb-0 font-weight-bold">
                    <span className="text-success">
                      - {calculateTotalDiscount()}
                    </span>
                  </h3>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <h4 className="mb-0 textDark">Code promo</h4>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <TextField
                    id="outlined-basic"
                    label="Code Promo"
                    variant="outlined"
                  />
                  <Button variant="outlined" size="large">
                    Appliquer
                  </Button>
                </div>

                <br />
                <div className="d-flex align-items-center mb-4">
                  <h3 className="mb-0 textDark textSemiBold">
                    Total à payer :
                  </h3>
                  <h3 className="ml-auto mb-0 font-weight-bold">
                    <span className="text-g textSemiBold">
                      {calculateTotalPrice()}
                    </span>
                  </h3>
                </div>
                <Link
                //  to={"/checkout"}
                 >
                  <Button className="btn-g btn-lg">Commander</Button>
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
