import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import { eAppRoutes } from '../../../const/app-routes.enum';
import tokenStorage from '../../../utils/token-storage';
import { getUser as getUserFn } from '../../user/api/get-user';
import { IUser } from '../../user/models/user.interface';

export const getUser = createAsyncThunk(
    'auth/signIn',
    getUserFn,
);

export const signOut = createAsyncThunk(
    'auth/signOut',
    () => {
        tokenStorage.clearToken();
        window.location.assign(eAppRoutes.Home);
    },
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        user: null as IUser | null,
        error: null as SerializedError | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.error;
            })
            .addCase(signOut.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
