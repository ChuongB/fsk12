import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/productSlice";
function ProductItem({ product, ...props }) {
  const { title, description, imgUrl } = product;
  const dispatch = useDispatch();
  // const state = useSelector((state) => state.product);
  const addProductToCart = () => {
    dispatch(addToCart(product));
  };
  return (
    <Card sx={{ maxWidth: 345, mt: 3 }}>
      <CardMedia sx={{ height: 140 }} image={imgUrl} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" className="title">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button
          size="small"
          variant="contained"
          onClick={() => addProductToCart()}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductItem;
