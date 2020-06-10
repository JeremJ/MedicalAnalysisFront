import axios from 'axios';
import config from '../config/config';
import keycloak from '../keycloak'

class HttpService {
    constructor() {
        this.headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        };
    }

    _getUrl = (endpoint, queryParams = '', local = false) => {
        const queryString = queryParams ? this._getQueryParams(queryParams) : '';
        return this._getHost() + endpoint + queryString;
    };

    _getHost = () => {
        const HOST = config.HOST;
        if (!HOST) throw new Error('Cannot get host address from config file');
        return HOST;
    };

    _getQueryParams = queryParams => {
        let query = '?';
        Object.keys(queryParams).map((key, index) => {
            const formatParam = `${index !== 0 ? '&' : ''}${key}=${queryParams[key]}`;
            query = query.concat(formatParam);
            return false;
        });
        return query;
    };

    _resolveHeaders = (customHeaders = {}) => {
        return { ...this.headers, ...customHeaders };
    };

    post = options =>
        axios({
            headers: this._resolveHeaders(options.headers),
            data: options.payload ? options.payload : {},
            method: 'post',
            url: this._getUrl(options.endpoint),
            withCredentials: true
        })
            .then(({ status, data }) => {
                if (status >= 200 && status < 300) {
                    options.onSuccess(data);
                } else {
                    throw new Error();
                }
            })
            .catch(error => {
                options.onError(error);
            });

    delete = options =>
        axios({
            headers: this._resolveHeaders(options.headers),
            data: options.payload,
            url: this._getUrl(options.endpoint),
            method: 'delete',
            withCredentials: true
        })
            .then(({ status, data }) => {
                if (status >= 200 && status < 300) {
                    options.onSuccess(data);
                } else {
                    throw new Error();
                }
            })
            .catch(error => {
                options.onError(error);
            });

    put = options =>
        axios({
            headers: this._resolveHeaders(options.headers),
            data: options.payload ? options.payload : {},
            method: 'put',
            url: this._getUrl(options.endpoint),
            withCredentials: true
        })
            .then(({ status, data }) => {
                if (status >= 200 && status < 300) {
                    options.onSuccess(data);
                } else {
                    throw new Error();
                }
            })
            .catch(error => {
                options.onError(error);
            });

    patch = options =>
        axios({
            headers: this._resolveHeaders(options.headers),
            data: options.payload ? options.payload : {},
            method: 'patch',
            url: this._getUrl(options.endpoint),
            withCredentials: true
        })
            .then(({ status, data }) => {
                if (status >= 200 && status < 300) {
                    options.onSuccess(data);
                } else {
                    throw new Error();
                }
            })
            .catch(error => {
                options.onError(error);
            });

    get = options =>
        axios({
            headers: this._resolveHeaders(options.headers),
            method: 'get',
            url: this._getUrl(options.endpoint, options.queryParams, options.local),
            withCredentials: true
        })
            .then(({ status, data }) => {
                if (status >= 200 && status < 300) {
                    options.onSuccess(data);
                } else {
                    throw new Error();
                }
            })
            .catch(error => {
                options.onError(error);
            });
}

axios.interceptors.request.use((config) => {
    const callBack = () => {
        config.headers.Authorization = `Bearer ${keycloak.getToken()}`;
        return Promise.resolve(config);
    };
    return keycloak.updateToken(callBack);
});


axios.interceptors.response.use(function (response) {
    return response;
},
    function (error) {
        if (error.response.status === 401) {
            window.location = window.location.href;
        }
        return Promise.reject(error);
    }
);

export default HttpService;
