import Skeleton from "@mui/material/Skeleton";

const ProductLoadingItem = () => {
  return (
    <div style={{ width: "200px" }}>
      <Skeleton variant="rounded" height={150} />
      <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Skeleton variant="text" sx={{ fontSize: "2rem", width: " 40%" }} />
        <Skeleton variant="text" sx={{ fontSize: "2rem", width: " 40%" }} />
      </div>
    </div>
  );
};

export default ProductLoadingItem;
