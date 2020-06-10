import React, { useEffect } from 'react';
import HttpService from '../../services/httpService';
import ENDPOINTS from '../../config/endpoint';

const getUser = () => {
    const httpClient = new HttpService();

    httpClient.get({
        endpoint: ENDPOINTS.CURRENT_USER,
        onSuccess: _handleUserSuccess,
        onError: _handleUserError
    });
};

const _handleUserSuccess = user => {
    localStorage.setItem('userId', JSON.stringify(user.id));
    localStorage.setItem('username', user.username);
    localStorage.setItem('firstName', user.firstName);
    localStorage.setItem('lastName', user.lastName);
    localStorage.setItem('avatar', user.avatar);
};

const _handleUserError = error => {
    console.error(error);
};


export default { getUser };