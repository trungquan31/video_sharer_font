import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Link, Box, Divider } from "@mui/material";
import styled from "@emotion/styled";
import ShareForm from "../components/ShareForm";
import { motion } from "framer-motion";
import { ToastContainer } from 'react-toastify';

const RootStyle = styled("div")({
  background: "rgb(249, 250, 251)",
  height: "100vh",
  display: "grid",
  placeItems: "center",
});

const HeadingStyle = styled(Box)({
  textAlign: "center",
});

const ContentStyle = styled("div")({
  maxWidth: 480,
  padding: 25,
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  background: "#fff",
});

let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const Share = () => {
  return (
    <RootStyle>
      <ToastContainer/>

      <Container maxWidth="sm">
        <ContentStyle>
          <HeadingStyle component={motion.div} {...fadeInUp}>
            <Typography sx={{ color: "text.secondary", mb: 5 }}>
              SHARING VIDEO
            </Typography>
          </HeadingStyle>

          <Divider sx={{ my: 3 }} component={motion.div} {...fadeInUp}>
          </Divider>

          <HeadingStyle component={motion.div} {...fadeInUp}>
          </HeadingStyle>

          <ShareForm />
          <Typography
            component={motion.p}
            {...fadeInUp}
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
          >
            <Link variant="subtitle2" component={RouterLink} to="/">
              Back to Home Page
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default Share;