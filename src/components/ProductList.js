import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import * as React from "react";
import ProductItem from "./ProductItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProductAsync } from "../redux/productSlice";
import { useEffect } from "react";
import { useGetProductsQuery } from "../redux/api";

function ListProduct({ ...props }) {
  const state = useSelector((state) => state.product);
  const { data: products, isLoading } = useGetProductsQuery();

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
