import React from 'react';
import ReactDOM from 'react-dom';
import keycloak from './keycloak';
import * as serviceWorker from './serviceWorker';
import App from './App';


const renderApp = () => ReactDOM.render(<App />, document.getElementById('root'));
keycloak.initKeycloak(renderApp);
serviceWorker.unregister();
