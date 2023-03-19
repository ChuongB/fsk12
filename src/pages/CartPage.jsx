import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import * as React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { increaseItem, decreaseItem } from "../redux/productSlice";
const CartPage = () => {
  const { cart } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const increase = (product) => {
    dispatch(increaseItem(product));
  };
  const decrease = (product) => {
    dispatch(decreaseItem(product));
  };

  function getTotal() {
    const total = cart.reduce(
      (sum, product) => sum + product.quantity * product.price,
      0
    );

    return total;
  }
  return (
    <Card sx={{ minWidth: 275, maxWidth: 600, m: "50px auto", p: 3 }}>
      <CardContent>
        {(!cart || cart.length === 0) && <span>Your cart is empty</span>}
        <List>
          {cart.map((product) => {
            return (
              <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
                <img
                  src={product.imgUrl}
                  alt=""
                  style={{ width: "80px", height: "50px" }}
                />

                <div>
                  <small>{product.title}</small>

                  <div style={{ marginTop: "10px" }}>
                    <ButtonGroup>
                      <Button
                        aria-label="reduce"
                        onClick={() => {
                          decrease(product);
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </Button>
                      <Button
                        aria-label="increase"
                        onClick={() => {
                          increase(product);
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </Button>
                    </ButtonGroup>

                    <span style={{ paddingLeft: "20px" }}>
                      {product.quantity}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </List>
        {cart && cart.length > 0 && (
          <div style={{ textAlign: "end" }}>
            <span>Total: {getTotal()}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CartPage;
