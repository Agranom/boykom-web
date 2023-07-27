import ky from 'ky';
import tokenStorage from '../utils/token-storage';

const httpClient = ky.extend({
    // TODO: Move to CI/CD env variables
    prefixUrl: 'http://localhost:3000/',
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
