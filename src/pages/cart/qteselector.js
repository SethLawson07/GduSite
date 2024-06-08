import React from "react";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../state/cart/cartSlice";
import {
  removeserviceFromCart,
  updateserviceQuantity,
} from "../../state/cart/cartserviceSlice";

const QuantitySelector = ({ id, quantity, type }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    type === "product"
      ? dispatch(updateQuantity({ id, newQuantity: quantity + 1 }))
      : dispatch(updateserviceQuantity({ id, newQuantity: quantity + 1 }));
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      type === "product"
        ? dispatch(updateQuantity({ id, newQuantity: quantity - 1 }))
        : dispatch(updateserviceQuantity({ id, newQuantity: quantity - 1 }));
    } else {
      type === "product"
        ? dispatch(removeFromCart(id))
        : dispatch(removeserviceFromCart(id));
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center",marginBottom:"23px" }} >
      <Button
        className="mr-3  btn-lg"
        variant="outlined"
        onClick={handleDecrease}
        // disabled={quantity <= 0}
      >
        {" "}
        <RemoveIcon />
      </Button>

      <Typography variant="body1" className="m-0">
        {quantity}
      </Typography>
      <Button
        className="ml-3 btn-lg"
        variant="outlined"
        onClick={handleIncrease}
      >
        {" "}
        <AddIcon />
      </Button>
    </div>
  );
};

export default QuantitySelector;
