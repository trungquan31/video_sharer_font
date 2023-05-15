import { Button, Container, Box } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import { useState, useEffect } from "react";
import Header from "../components/Header.js"
import axios from 'axios';
import {
  ToastSuccess,
}  from "../services/toast.js"
import { ToastContainer } from 'react-toastify';
import YoutubeEmbed from "../services/youtube.js"
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import ApiRouterConstants from "../constants/api.router.constants.js"
import Broadcast from "../components/Broadcast.js"
import { ActionCableProvider } from 'react-actioncable-provider';

const Home = () => {
  const navigate = useNavigate();

  const [urls, setUrls] = useState([]);

  const [notFoundMessages, setMessages] = useState('')

  useEffect(() => {
    ToastSuccess("WELCOME TO HOME PAGE!")
    const fetchData = async () =>{
      await axios.get(ApiRouterConstants.VIDEO_API, {
          params: { access_token: localStorage.getItem('access_token') },
          headers: { Accept: "application/json" },
      }).then((response) => {
        setTimeout(() => {
          console.log('call api success')
          if (response.data[0] !== '') {
            setUrls(response.data)
          } else {
            setMessages('You have no shared Video')
          }
        }, 100);
      }).catch((error) => {
        console.log('exios error', error)
      })
    }
    fetchData();
  }, []);

  const GridVideo = ({urls}) => {
    const component = []
    if (urls[0] === '') {
      return (<p>{notFoundMessages}</p>)
    }
    urls.map((url) => {
      let videoId = getIdFromUrl(url)
      component.push( <YoutubeEmbed key={url} embedId={videoId}/>)
    })
    return component
  }

  const getIdFromUrl = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match&&match[7].length === 11)? match[7] : false;
  }

  return (
    <ActionCableProvider>
      <ToastContainer/>
      
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
        }}
      > 
        <Broadcast/>
        <Header />
        <Box sx={{ 
          '& > :not(style)': { m: 1 },
          float: 'left' 
        }}>
          <Button variant="contained" endIcon={<ShareIcon />}  onClick={() => {
            navigate("/users/share")
          }}>
            SHARE VIDEO
          </Button>
        </Box>
        <Grid container spacing={2} columns={16}>
          <GridVideo urls = {urls} />
        </Grid>
      </Container>
    </ActionCableProvider>
  );
};

export default Home;