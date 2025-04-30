import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from './types';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';



const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
    isAuthentication: !!localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
};

const adminSlice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {
        loginLoading(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;
            state.isAuthentication = true;
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // Logout Reducers
        logoutStart(state) {
            state.loading = true;
            state.error = null;
        },
        logoutSuccess(state) {
            state.user = null;
            state.token = null;
            state.loading = false;
            state.isAuthentication = false;
            state.error = null;
        },
        logoutFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {

    loginFailure,
    loginLoading,
    loginSuccess,
    logoutFailure,
    logoutStart,
    logoutSuccess

} = adminSlice.actions;

export default adminSlice.reducer;