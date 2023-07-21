import ky from 'ky';

const httpClient = ky.extend({
    // TODO: Move to CI/CD env variables
    prefixUrl: 'http://localhost:3000/',
    hooks: {
        beforeRequest: [
            (request) => {
                console.log(request);
            },
        ],
        afterResponse: [
            (response) => {
                console.log(response);
            },
        ],
    },
});

export default httpClient
