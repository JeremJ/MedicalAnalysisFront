import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import ENDPOINTS from '../../config/endpoint';
import HttpService from '../../services/httpService';
import { AccountProfile, AccountDetails } from './components';
import { fetchCurrentUser, handleCurrentUserFetch } from 'api/users-api'
import { UserContext } from 'App'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Account = props => {
  const classes = useStyles();
  const { ...rest } = props;
  const { user, getCurrentUser } = React.useContext(UserContext);
  /*   const [user, setUser] = React.useState(null);
  
    useEffect(() => {
      getCurrentUser();
    }, []);
  
    const getCurrentUser = () => {
      fetchCurrentUser().then(
        data => {
          handleCurrentUserFetch(data);
          setUser(data);
  
        },
        error => console.error(error));
    } */
  return (

    <div className={classes.root}>
      {user &&
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            lg={4}
            md={6}
            xl={4}
            xs={12}
          >
            <AccountProfile
              user={user}
              getCurrentUser={getCurrentUser}
            />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xl={8}
            xs={12}
          >
            <AccountDetails
              user={user}
              getCurrentUser={getCurrentUser} />
          </Grid>
        </Grid>
      }
    </div>
  );
};

export default Account;
