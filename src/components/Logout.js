
import React from 'react'
import { Box, Button } from "@mui/material";


function Logout({setAuth}){
  return(
    <Box sx={{ '& button': { m: 1 } }}>
      <Button size="small" variant="contained" onClick={() => {
        setAuth(false)
        localStorage.removeItem('email')
        localStorage.removeItem('access_token')
      } }>
        Log out
      </Button>
    </Box>
  )
}

export default Logout