import httpClient from '../services/http-client';
import { StringUtils } from '../utils/string-utils';

const convertedVapidKey = StringUtils.urlBase64ToUint8Array(process.env.REACT_APP_PUBLIC_VAPID_KEY);

const sendSubscription = (subscription: PushSubscription) => {
    return httpClient.post('subscriptions', { json: subscription }).json();
};

export const subscribeToNotifications = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration: ServiceWorkerRegistration) => {
            if (!registration.pushManager) {
                console.log('Push manager unavailable.');
                return;
            }

            registration.pushManager.getSubscription().then((existedSubscription: PushSubscription | null) => {
                if (existedSubscription === null) {
                    console.log('No subscription detected, make a request.');
                    registration.pushManager.subscribe({
                        applicationServerKey: convertedVapidKey,
                        userVisibleOnly: true,
                    }).then((newSubscription: PushSubscription) => {
                        console.log('New subscription added.');
                        sendSubscription(newSubscription);
                    }).catch((e) => {
                        if (Notification.permission !== 'granted') {
                            console.log('Permission was not granted.');
                        } else {
                            console.error('An error occurred during the subscription process.', e);
                        }
                    });
                } else {
                    console.log('Existed subscription detected.');
                    sendSubscription(existedSubscription);
                }
            });
        })
            .catch((e) => console.error('An error occurred during Service Worker registration.', e));
    }
};
