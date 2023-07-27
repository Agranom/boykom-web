const storagePrefix = 'boykom_';

const tokenStorage = {
    getToken: () => {
        return window.localStorage.getItem(`${storagePrefix}access_token`);
    },
    setToken: (token: string) => {
        window.localStorage.setItem(`${storagePrefix}access_token`, token);
    },
    clearToken: () => {
        window.localStorage.removeItem(`${storagePrefix}access_token`);
    },
};

export default tokenStorage;
