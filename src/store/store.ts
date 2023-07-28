import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/store/auth-slice';

const store = configureStore({
    reducer: {
        user: authReducer,
    },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
