import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';
import Modal from '@material-ui/core/Modal';
import ImageCardModal from '../ImageCardModal/ImageCardModal'
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import HttpService from '../../../../services/httpService'
import ENDPOINTS from '../../../../config/endpoint'

const dateFormat = require('dateformat');
const useStyles = makeStyles(theme => ({
  root: {},
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: 'auto',
    width: '70%',
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

const ImageCard = props => {
  const { className, image, getImages, pageNumber, ...rest } = props;
  const [imageCardModalOpen, setImageCardModalOpen] = React.useState(false);
  const [imageCardPopperOpen, setImageCardPopperOpen] = React.useState(false);

  const classes = useStyles();

  const onImageCardElementClick = () => {
    setImageCardModalOpen(true);
  };

  const handleImagePopperToggle = () => {
    setImageCardPopperOpen(prevOpen => !prevOpen);
  };

  const datesDiffInHours = imageDate => {
    var hours = Math.abs((new Date().getTime() - new Date(imageDate).getTime()) / 36e5);
    return Math.floor(hours);
  };

  const datesDiffInMinutes = imageDate => {
    var minutes = Math.abs((new Date().getTime() - new Date(imageDate).getTime()));
    return Math.round(((minutes % 86400000) % 3600000) / 60000);
  };

  const displayAccordingToUploadedTime = imageDate => {
    if (datesDiffInHours(imageDate) >= 1) {
      return `${datesDiffInHours(imageDate)} hours ago`;
    } else {
      return `${datesDiffInMinutes(imageDate)} minutes ago`;
    }
  };

  const deleteImage = imageId => {
    return new Promise((resolve, reject) => {
      const httpClient = new HttpService();
      httpClient.delete({
        endpoint: `${ENDPOINTS.IMAGE}/${imageId}`,
        onSuccess: data => resolve(data),
        onError: error => reject(error)
      });
    });
  };

  const handleDelete = () => {
    deleteImage(image.id)
      .then(() => getImages(pageNumber - 1));
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent >
        <div onClick={() => setImageCardModalOpen(true)}
          className={classes.imageContainer}>
          <img
            alt="Image"
            className={classes.image}
            src={`data:image/${image.fileExtension};base64,${image.file}`}
          />
        </div>
        <Typography
          align="center"
          color="textSecondary"
          gutterBottom
          variant="h6"
        >
          {image.fileName}
        </Typography>

      </CardContent>
      <Divider />
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              {displayAccordingToUploadedTime(image.date)}
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          > {image.diseaseProbability.toFixed(5)}
            <Button

              onClick={handleDelete}
            >
              <DeleteIcon className={classes.statsIcon} />
            </Button>
          </Grid>
        </Grid>

      </CardActions>
      <Modal className={classes.modal} open={imageCardModalOpen} onClose={() => setImageCardModalOpen(false)}>
        <ImageCardModal image={image} />
      </Modal>
    </Card>

  );
};

ImageCard.propTypes = {
  className: PropTypes.string,
  image: PropTypes.object.isRequired
};

export default ImageCard;
