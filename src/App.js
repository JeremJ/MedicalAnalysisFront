import React, { useEffect } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import _kc from './keycloak';
import { fetchCurrentUser, handleCurrentUserFetch } from 'api/users-api'


const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

export const UserContext = React.createContext({});

function App() {
  const [isLoading, setLoading] = React.useState(true); // isLoading not used...
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    setLoading(true);
    getCurrentUser();
  }, []);

  const getCurrentUser = () => {
    fetchCurrentUser().then(
      data => {
        handleCurrentUserFetch(data);
        setUser(data);
        setLoading(false);
      },
      error => console.error(error));
  }

  return (
    <UserContext.Provider value={{ user, getCurrentUser }}>
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    </UserContext.Provider>
  );
}
export default App;