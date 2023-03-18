import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import ProductLoadingItem from "./ProductLoadingItem";
import { getProductAsync } from "../redux/productSlice";
function ListProduct({ ...props }) {
  const { products, loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductAsync());
  }, []);

  const renderLoading = () => {
    return (
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        {[...Array(10).keys()].map((index) => (
          <ProductLoadingItem key={index} />
        ))}
      </div>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {loading ? (
        renderLoading()
      ) : (
        <Grid container spacing={2}>
          {products &&
            products.map((item) => (
              <Grid item xs={3} key={item.id}>
                <ProductItem product={item} />
              </Grid>
            ))}
        </Grid>
      )}
    </Box>
  );
}

export default ListProduct;
