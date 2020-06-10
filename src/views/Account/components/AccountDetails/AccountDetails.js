import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import HttpService from '../../../../services/httpService'
import ENDPOINTS from '../../../../config/endpoint'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

const AccountDetails = React.forwardRef((props, ref) => {
  const useStyles = makeStyles(() => ({
    root: {}
  }));

  const { className, user, getCurrentUser, setUserUpToDate, userUpToDate, setUser, ...rest } = props;

  const classes = useStyles();

  const [payload, setPayload] = React.useState(user);

  const handleChange = name => event => {
    setPayload({ ...payload, [name]: event.target.value });
  };

  const _handleError = error => {
    console.error(error);
  };

  const updateUser = () => {
    let userSubset = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      city: payload.city,
      country: payload.country

    }
    const httpClient = new HttpService();
    httpClient.patch({
      endpoint: `${ENDPOINTS.USERS}/${user.id}`,
      payload: userSubset,
      onSuccess: _handleUpdateUserSuccess,
      onError: _handleError
    });
  };

  const _handleUpdateUserSuccess = () => {
    getCurrentUser();
  };

  const onUserSubmit = () => {
    updateUser();
  };

  return (
    <Card ref={ref}
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
      >
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                margin="dense"
                name="firstName"
                onChange={handleChange('firstName')}
                required
                value={payload.firstName || ""}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                margin="dense"
                name="lastName"
                onChange={handleChange('lastName')}
                required
                value={payload.lastName || ""}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
                onChange={handleChange('email')}
                value={payload.email || ""}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                margin="dense"
                name="phone"
                onChange={handleChange('phone')}
                type="number"
                value={payload.phone || ""}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="City"
                margin="dense"
                name="city"
                onChange={handleChange('city')}
                value={payload.city || ""}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                margin="dense"
                name="country"
                onChange={handleChange('country')}
                value={payload.country || ""}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions >
          <Button
            color="primary"
            variant="contained"
            type="button"
            onClick={onUserSubmit}
          >
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
});

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
