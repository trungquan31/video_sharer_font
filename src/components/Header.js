import React from 'react'
import Logout from "../components/Logout.js"
import { Box } from "@mui/material";

function Header(){
  return(
    <header className="home-header">
      <Box sx={{ 
       display: "flex",
        float: "right",
        gap: 3 
      }}>
        <h4 >Welcome {localStorage.getItem('email')}</h4>
        <Logout/>
      </Box>
    </header>
  )
}

export default Header