import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { fetchAllUsers } from 'api/users-api';
import { fetchImages } from 'api/images-api';
import { fetchImagesStatistic } from 'api/statistic-api';
import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  DiagnosisHistory,
  LatestUsers,
  LatestImages
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [users, setUsers] = React.useState([]);
  const [totalElements, setTotalElements] = React.useState(0);
  const [imagesData, setImagesData] = React.useState([]);
  const [imageStatistics, setImageStatistics] = React.useState([]);

  useEffect(() => {
    fetchAllUsers()
      .then(
        data => {
          setTotalElements(data.totalElements);
          setUsers(data.users);
        },
        error => console.error(error));
    fetchImages(0, _handleImagesSuccess, _handleImagesError, 5);
    fetchImagesStatistic()
      .then(
        data => {
          setImageStatistics(data);
        },
        error => console.error(error)
      );
  }, []);

  const _handleImagesSuccess = data => {
    setImagesData(data.images);
  };

  const _handleImagesError = error => {
    console.error(error);
  };
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Budget />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalUsers totalElements={totalElements} />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TasksProgress />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalProfit />
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          xl={18}
          xs={12}
        >
          <DiagnosisHistory imageStatistics={imageStatistics} />
        </Grid>

        <Grid
          item
          lg={4}
          md={4}
          xl={3}
          xs={12}
        >
          <LatestUsers users={users} />
        </Grid>
        <Grid
          item
          lg={8}
          md={8}
          xl={9}
          xs={12}

        >
          <LatestImages imagesData={imagesData} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
