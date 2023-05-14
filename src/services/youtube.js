import React from "react";
import PropTypes from "prop-types";
import Grid from '@mui/material/Grid';


const YoutubeEmbed = ({embedId}) => (
  <Grid item xs={8} >
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube-nocookie.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </Grid>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed