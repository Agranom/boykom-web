import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.scss';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import store from './store/store';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <Provider store={store}>
        <App/>
    </Provider>,
);

if (process.env.NODE_ENV === 'production') {
    serviceWorkerRegistration.register();
} else {
    serviceWorkerRegistration.registerLocal();
}
