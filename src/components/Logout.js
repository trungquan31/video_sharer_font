
import React from 'react'
import { Box, Button } from "@mui/material";

function Logout(){
  return(
    <Box sx={{ '& button': { m: 1 } }}>
      <Button size="small" variant="contained" onClick={() => {
        localStorage.removeItem('email')
        window.location.reload(false);
      } }>
        Log out
      </Button>
    </Box>
  )
}

export default Logout