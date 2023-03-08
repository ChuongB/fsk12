import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import * as React from "react";
import ProductItem from "./ProductItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProductAsync } from "../redux/productSlice";
import { useEffect, useContext } from "react";
import { useGetProductsQuery } from "../redux/api";
import { useAppContext } from "../App";

function ListProduct({ ...props }) {
  const { state, dispatch } = useAppContext();
  const { products } = state;

  useEffect(() => {
    async function getProduct() {
      const url = "http://localhost:3004/products";
      const res = await fetch(url);
      const data = await res.json();
      dispatch({ type: "SET_PRODUCT", payload: data });
    }

    getProduct();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {products &&
          products.map((item) => (
            <Grid item xs={3} key={item.id}>
              <ProductItem product={item} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

export default ListProduct;
