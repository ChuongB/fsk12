import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { useFormik } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
const validationSchema = yup.object({
  name: yup.string("Enter your product name").required("Email is required"),

  imageUrl: yup
    .string("Enter your product imageUrl")
    .required("image name is required"),
  description: yup.string("Enter product description"),
  price: yup
    .string("Enter your product price")
    .required("price name is required"),
});

export default function ProductFormDialog({ open, setOpen }) {
  const { isLoggedIn, loading } = useSelector((state) => state.product);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //todo
    },
  });

  const addProduct = () => {
    console.log("add product", formik.values);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add product</DialogTitle>
      <DialogContent>
        <div style={{ textAlign: "center" }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              id="imageUrl"
              name="imageUrl"
              label="imageUrl"
              value={formik.values.imageUrl}
              onChange={formik.handleChange}
              error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
              helperText={formik.touched.imageUrl && formik.errors.imageUrl}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              id="description"
              name="description"
              label="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              id="price"
              name="price"
              label="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              sx={{ mb: 3 }}
            />
          </form>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => addProduct()}
          variant="contained"
          color="primary"
        >
          {loading && (
            <CircularProgress
              style={{
                color: "white",
                marginRight: "20px",
              }}
            />
          )}
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
