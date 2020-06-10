import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { StatusBullet } from 'components';

const useStyles = makeStyles(theme => ({
  root: {
  },
  content: {
    padding: 0
  },
  inner: {
    minWidth: 300
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const statusColors = (probability) => {
  var color;
  color = probability > 0.6 ? 'danger' : probability <= 0.6 && probability > 0.45 ? 'info' : 'success';
  return color;
};

const statusLabels = {
  'success': 'low probability',
  'danger': 'high probability',
  'info': 'need for further research',
};

const LatestImages = props => {
  const { className, imagesData, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <Button
            color="primary"
            size="small"
            variant="outlined"
          >
            New Image
          </Button>
        }
        title="Recently Uploaded Images"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image Name</TableCell>
                  <TableCell>File Size</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Prediction</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {imagesData.map(image => (
                  <TableRow
                    hover
                    key={image.id}
                  >
                    <TableCell>{image.fileName}</TableCell>
                    <TableCell>{Math.abs(image.size / 1024).toFixed(0) + ' ' + `KB`}</TableCell>
                    <TableCell>
                      {moment(image.date).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={statusColors(image.diseaseProbability)}
                          size="sm"
                        />
                        {statusLabels[statusColors(image.diseaseProbability)]}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
          component={RouterLink}
          to="/images"
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestImages.propTypes = {
  className: PropTypes.string
};

export default LatestImages;
