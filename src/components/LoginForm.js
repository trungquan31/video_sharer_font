import React, { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import {
  ToastError
}  from "../services/toast.js"
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { ToastContainer } from 'react-toastify';

let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};

const LoginForm = ({ setAuth} ) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Provide a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try{
        console.log("submitting...");
        const res = await axios.post('http://localhost:3000/sessions/signin',
          { 
            email: values.email,
            password: values.password
          },
          { headers: { Accept: "application/json" } }
        )
        setTimeout(() => {
          console.log("submited!!");
          if (res.data.access_token) {
            setAuth(true);
            localStorage.setItem('access_token', res.data.access_token)
            localStorage.setItem('email', res.data.email)
          }
          navigate(from, {replace: true } );
        }, 100);
      } catch(error) {
        console.log('exios error', error)
        ToastError(error.response.data.errors)
        
      }
    },
  });

  const { errors, touched, handleSubmit , isSubmitting, getFieldProps } =
    formik;

  return (
    <FormikProvider value={formik}>
    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Box
        component={motion.div}
        animate={{
          transition: {
            staggerChildren: 0.55,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          animate={animate}
        >
          <TextField
            fullWidth
            // autoFocus={true}
            autoComplete="email"
            type="email"
            label="Email Address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            // autoFocus={true}
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <Icon icon="eva:eye-fill" />
                    ) : (
                      <Icon icon="eva:eye-off-fill" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={animate}
        >

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {isSubmitting ? "loading..." : "Login"}
          </LoadingButton>
        </Box>
      </Box>
    </Form>
    </FormikProvider>
  );
};

export default LoginForm;