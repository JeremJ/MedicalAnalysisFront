import HttpService from '../services/httpService';
import ENDPOINTS from '../config/endpoint';

export const fetchImagesStatistic = () => {
    return new Promise((resolve, reject) => {
        const httpClient = new HttpService();
        httpClient.get({
            endpoint: `${ENDPOINTS.IMAGE_STATISTIC}`,
            onSuccess: data => resolve(data),
            onError: error => reject(error)
        });
    });
};