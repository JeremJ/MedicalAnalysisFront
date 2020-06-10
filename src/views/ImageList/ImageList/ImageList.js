import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { ImagesToolbar, ImageCard } from '../components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const ImageList = props => {
  const classes = useStyles();
  const { imagesData, totalPages, getImages, pageNumber } = props;

  return (
    <div className={classes.content}>
      <Grid
        container
        spacing={3}
      >
        {imagesData.map(image => (
          <Grid
            item
            key={image.id}
            lg={3}
            md={6}
            xs={12}
          >
            <ImageCard getImages={getImages} image={image} pageNumber={pageNumber} />
          </Grid>
        ))}
      </Grid>
    </div>



  );
};

export default ImageList;
