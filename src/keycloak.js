import Keycloak from 'keycloak-js';


// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const _kc = new Keycloak('/keycloak.json');

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback) => {
    _kc.init({
        onLoad: 'check-sso',
        promiseType: 'native',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        pkceMethod: 'S256',
    })
        .then((authenticated) => {
            if (authenticated) {
                onAuthenticatedCallback();
            } else {
                console.warn("not authenticated!");
                doLogin();
            }
        })
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const updateToken = (successCallback) => {
    return _kc.updateToken(70)
        .then(successCallback)
        .catch(doLogin)
};

const updateTokenOrLogout = () => {
    return _kc.updateToken(70)
        .catch(doLogout)
};

const getUsername = () => _kc.tokenParsed.preferred_username;


export default {
    initKeycloak,
    doLogin,
    doLogout,
    getToken,
    updateToken,
    getUsername,
    updateTokenOrLogout,
}