import { useState } from "react";
import { CssBaseline } from "@mui/material";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Share from "./pages/Share.js";
import Signup from "./pages/Signup.js";


function App() {
  const [auth, setAuth] = useState(false);
  const location = useLocation();
  const [email, setEmail] = useState("");
  const PageNotFound = () => (
    <h1
      style={{
        color: "#fff",
        fontSize: "25px",
        textAlign: "center",
        marginTop: "210px",
      }}
    >
      404: Page not found
    </h1>
  );
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} setEmail={setEmail} email={email} />} />
        <Route path="/signup" element={<Signup setAuth={setAuth} setEmail={setEmail} />} />
        <Route
          path="/"
          element={
            auth ? (
              <Home setAuth={setAuth}/>
            ) : (
              <Navigate to="/login" state={{ from: location }} replace />
            )
          }
        />
        <Route path="/users/share" element={
            auth ? (
              <Share />
            ) : (
              <Navigate to="/login" state={{ from: location }} replace />
            )
          }/>
        <Route path="*" element={<PageNotFound />} /> 
      </Routes>
    </>
  );
}

export default App;