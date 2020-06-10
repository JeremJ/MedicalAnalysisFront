import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';

import ImageToolbarModal from '../ImageToolbarModal/ImageToolbarModal';
import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const ImagesToolbar = props => {
  const { getImages, className, pageNumber, ...rest } = props;
  const [addImageModalOpen, setAddImageModalOpen] = React.useState(false);

  const classes = useStyles();

  const [initialState] = React.useState({
    id: null,
    description: ''
  });
  const [payload, setPayload] = React.useState(initialState);

  const handleModalClose = () => {
    clearData();
    setAddImageModalOpen(false);
  };

  const clearData = () => {
    setPayload(initialState);
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button
          color="primary"
          variant="contained"
          onClick={() => setAddImageModalOpen(true)}
        >
          Add image
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search image"
        />

      </div>
      <Modal open={addImageModalOpen} onClose={() => handleModalClose()}>
        <ImageToolbarModal
          payload={payload}
          setPayload={setPayload}
          getImages={getImages}
          pageNumber={pageNumber}
          closeModal={() => handleModalClose()}
        />
      </Modal>
    </div>

  );
};

ImagesToolbar.propTypes = {
  className: PropTypes.string
};

export default ImagesToolbar;
