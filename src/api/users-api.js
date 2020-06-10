import HttpService from '../services/httpService';
import ENDPOINTS from '../config/endpoint';

export const fetchAllUsers = (...pageNumber) => {
    return new Promise((resolve, reject) => {
        var size = Number.MAX_SAFE_INTEGER;
        var pageN = 0;
        if (pageNumber.length > 1) {
            size = pageNumber[0];
            pageN = pageNumber[1];
        }
        const httpClient = new HttpService();
        httpClient.get({
            endpoint: `${ENDPOINTS.USERS}?page=${pageN}&size=${size}`,
            onSuccess: data => resolve(data),
            onError: error => reject(error)
        });
    });
};
export const handleCurrentUserFetch = user => {
    localStorage.setItem('userId', JSON.stringify(user.id));
    localStorage.setItem('username', user.username);
    localStorage.setItem('firstName', user.firstName);
    localStorage.setItem('lastName', user.lastName);
    localStorage.setItem('avatar', user.avatar);
};

export const fetchCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const httpClient = new HttpService();
        httpClient.get({
            endpoint: ENDPOINTS.CURRENT_USER,
            onSuccess: data => resolve(data),
            onError: error => reject(error)
        });
    });
};
