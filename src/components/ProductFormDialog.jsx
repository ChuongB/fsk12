import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
  addProductAsync,
  getProductAsync,
  editProductAsync,
} from "../redux/productSlice";
const validationSchema = yup.object({
  title: yup
    .string("Enter your product name")
    .required("Product Name is required"),
  imgUrl: yup
    .string("Enter your product imageUrl")
    .required("image url is required"),
  description: yup.string("Enter product description"),
  price: yup
    .string("Enter your product price")
    .required("product price  is required"),
});

export default function ProductFormDialog({ open, setOpen, isEdit, product }) {
  const { isLoggedIn, loading } = useSelector((state) => state.product);
  const [imgUrl, setImgUrl] = useState(null);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const resetForm = () => {
    formik.resetForm();
    setImgUrl(null);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      imgUrl: "",
      description: "",
      price: "",
      contact: false
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (isEdit) {
        //TODO: dispatch action edit product
        values.id = product.id;
        dispatch(editProductAsync(values)).then((data) => {
          handleClose();
          resetForm();
          dispatch(getProductAsync());
        });
      } else {
        dispatch(addProductAsync(values)).then((data) => {
          handleClose();
          resetForm();
          dispatch(getProductAsync());
        });
      }
    },
  });

  const handleSubmit = () => {
    formik.submitForm();
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleUploadImage = (event) => {
    toBase64(event.target.files[0]).then((data) => {
      setImgUrl(data);
      formik.setFieldValue("imgUrl", data);
    });
  };

  useEffect(() => {
    if (isEdit) {
      const { title, imgUrl, description, price } = product;
      formik.setFieldValue("title", title);
      formik.setFieldValue("imgUrl", imgUrl);
      formik.setFieldValue("description", description);
      formik.setFieldValue("price", price);
      setImgUrl(imgUrl);
    }
  }, [product]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isEdit ? "Edit" : "Add"} product</DialogTitle>
      <DialogContent>
        <div style={{ textAlign: "center" }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              id="imgUrl"
              name="imgUrl"
              label="imgUrl"
              value={formik.values.imgUrl}
              onChange={formik.handleChange}
              error={formik.touched.imgUrl && Boolean(formik.errors.imgUrl)}
              helperText={formik.touched.imgUrl && formik.errors.imgUrl}
              sx={{ mb: 3 }}
              disabled
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
            <Button variant="contained" component="label">
              Upload File
              <input
                type="file"
                hidden
                onChange={(e) => handleUploadImage(e)}
              />
            </Button>

            <div>
              {imgUrl && (
                <img
                  src={imgUrl}
                  alt="product image"
                  style={{ width: "350px", marginTop: "20px" }}
                />
              )}
            </div>
          </form>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => handleSubmit()}
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
          {isEdit ? "Edit" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
