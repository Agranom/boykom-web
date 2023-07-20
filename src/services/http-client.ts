import ky from 'ky';

const httpClient = ky.extend({
    // TODO: Move to CI/CD env variables
    prefixUrl: 'https://boykom-2ab82-default-rtdb.europe-west1.firebasedatabase.app/',
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
