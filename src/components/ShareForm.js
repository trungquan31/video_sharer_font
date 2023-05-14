import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import {
  Box,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
import {
  ToastSuccess,
  ToastError
}  from "../services/toast.js"

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

const ShareForm = ( ) => {
  const ShareSchema = Yup.object().shape({
    url: Yup.string().matches(
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
      'Enter invalid url!'
    ).required('Please enter URL')
  });

  const formik = useFormik({
    initialValues: {
      url: "",
    },
    validationSchema: ShareSchema,
    onSubmit: async (values) => {
      try{
        console.log("sharing...");
        await axios.post('http://localhost:3000/videos',
          { 
            url: values.url,
            access_token: localStorage.getItem('access_token')
          },
          { headers: { Accept: "application/json" } }
        )
        console.log("sharing...");

        ToastSuccess("Share video success")
        setTimeout(() => {
          console.log("submited!!");
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
              autoFocus={false}
              type="string"
              label="Video URL"
              {...getFieldProps("url")}
              error={Boolean(touched.url && errors.url)}
              helperText={touched.url && errors.url}
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
              {isSubmitting ? "loading..." : "SHARE"}
            </LoadingButton>
          </Box>
        </Box>
      </Form>
    </FormikProvider>

  );
};

export default ShareForm;