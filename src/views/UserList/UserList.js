import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import { fetchAllUsers } from '../../api/users-api';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();
  const [users, setUsers] = React.useState([]);
  const [totalElements, setTotalElements] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  React.useEffect(() => fetchUsers(rowsPerPage, page), []);

  const fetchUsers = (...pageDetails) => {
    fetchAllUsers(...pageDetails)
      .then(
        data => {
          setUsers(data.users);
          setTotalElements(data.totalElements)
        },
        error => console.error(error));
  };


  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTable
          users={users}
          totalElements={totalElements}
          fetchUsers={fetchUsers}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage} />
      </div>
    </div>
  );
};

export default UserList;
