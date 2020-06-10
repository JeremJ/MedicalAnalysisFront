import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


const useStyles = makeStyles(theme => ({
  image: {
    width: '100%',
    height: 'auto',
    maxWidth: '600px'
  },
  paper: {
    position: 'center',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0.5, 0.5, 0.5),
  },
}));

const ImageCardModal = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const { image } = props;

  return (
    <div className={classes.modal}>
      <div className={classes.paper}>
        <img
          alt="Image"
          src={`data:image/${image.fileExtension};base64,${image.file}`}
          className={classes.image}
        />
      </div>
    </div>
  );
})
export default ImageCardModal;