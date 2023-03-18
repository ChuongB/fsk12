import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { signupAsync } from "../redux/productSlice";
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  fullName: yup
    .string("Enter your full name")
    .required("Full name is required"),
  birthday: yup.string("Enter your birthday"),
});

const ProfilePage = () => {
  const { loading, currentUser: user } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const res = await dispatch(signupAsync(values));

      if (res.meta.requestStatus === "fulfilled") {
        navigate("/login");
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue("email", user.email);
    formik.setFieldValue("fullName", user.fullName);
    formik.setFieldValue("birthday", user.birthday);
  }, [user]);

  return (
    <Card sx={{ minWidth: 275, maxWidth: 400, m: "50px auto", p: 3 }}>
      <CardContent>
        <div style={{ textAlign: "center" }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              disabled
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
              id="fullName"
              name="fullName"
              label="Full name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              id="birthday"
              name="birthday"
              label="birthday"
              value={formik.values.birthday}
              onChange={formik.handleChange}
              error={formik.touched.birthday && Boolean(formik.errors.birthday)}
              helperText={formik.touched.birthday && formik.errors.birthday}
              sx={{ mb: 3 }}
            />

            <Button color="primary" variant="contained" fullWidth type="submit">
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
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
