import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginAsync } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(4, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = () => toast("Login successful");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(loginAsync(values));
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/products");
    }
  }, [isLoggedIn]);

  return (
    <Card sx={{ minWidth: 275, maxWidth: 400, m: "50px auto", p: 3 }}>
      <CardContent>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{ mb: 3 }}
            />

            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
