import ky from 'ky';
import tokenStorage from '../utils/token-storage';

const httpClient = ky.extend({
    prefixUrl: process.env.REACT_APP_SERVER_URL,
    hooks: {
        beforeRequest: [
            (request) => {
                const authToken = tokenStorage.getToken();
                if (authToken) {
                    request.headers.set('Authorization', `Bearer ${tokenStorage.getToken()}`);
                }
                return request;
            },
        ],
        afterResponse: [
            (response) => {
                console.log(response);
            },
        ],
    },
});

export default httpClient;
