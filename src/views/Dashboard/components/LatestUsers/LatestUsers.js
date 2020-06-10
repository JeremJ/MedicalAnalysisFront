import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  Avatar,
  ListItemText,
  IconButton
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    padding: 0
  },
  image: {
    height: 48,
    width: 48
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestUsers = props => {
  const { className, users, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        subtitle={`${users.length} in total`}
        title="Recently registered"
      />
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {users.slice(0, 5).map((user, i) => (
            <ListItem
              divider={i < users.length - 1}
              key={user.id}
            >
              <Avatar
                className={classes.avatar}
                src={user.avatar}
              >
              </Avatar>
              <ListItemText
                primary={user.firstName + ' ' + user.lastName}
                secondary={`registered 2 hours ago`}
              />
              <IconButton
                edge="end"
                size="small"
              >
                <MoreVertIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
          component={RouterLink}
          to="/users"
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestUsers.propTypes = {
  className: PropTypes.string
};

export default LatestUsers;
