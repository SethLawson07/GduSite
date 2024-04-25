import React from "react";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import { updateQuantity } from "../../state/cartSlice";

const QuantitySelector = ({ itemId, quantity }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(updateQuantity({ itemId, newQuantity: quantity + 1 }));
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch(updateQuantity({ itemId, newQuantity: quantity - 1 }));
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}       className="mb-3"
    >
      <Button
        className="m-1"
        variant="outlined"
        onClick={handleDecrease}
        disabled={quantity <= 1}
      >
        {" "}
        <RemoveIcon />
      </Button>

      <Typography variant="body1" className="m-2">
        {quantity}
      </Typography>
      <Button className="m-2 btn-lg" variant="outlined" onClick={handleIncrease}>
        {" "}
        <AddIcon />
      </Button>
    </div>
  );
};

export default QuantitySelector;
