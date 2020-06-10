import HttpService from '../services/httpService';
import ENDPOINTS from '../config/endpoint';

export const fetchImages = (pageNum, _handleImagesSuccess, _handleImagesError, pageSize) => {
    return new Promise((resolve, reject) => {
        const httpClient = new HttpService();
        httpClient.get({
            endpoint: `${ENDPOINTS.IMAGE}?page=${pageNum}&size=${pageSize}`,
            onSuccess: _handleImagesSuccess,
            onError: _handleImagesError
        });
    });
};