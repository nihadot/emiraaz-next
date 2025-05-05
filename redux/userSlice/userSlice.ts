import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from './types';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';
import { ImageItem } from '../types';



const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
    isAuthentication: false,
    ready: false // NEW: indicates whether we checked auth

};

const userSlice = createSlice({
    name: 'userSlice',
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


        isLogged(state, action: PayloadAction<{ logged: boolean }>) {
            state.isAuthentication = action.payload.logged;
        },

        isUserLoad(state, action: PayloadAction<{  user: {
            name: string;
            number: string;
            email: string;
            avatar?: ImageItem;
          }; }>) {
            state.user = action.payload.user;
        },
        setReady(state) {
            state.ready = true;
        }
        
    },

});

export const {

    loginFailure,
    loginLoading,
    loginSuccess,
    logoutFailure,
    logoutStart,
    logoutSuccess,
    isLogged,
    isUserLoad,
    setReady
} = userSlice.actions;

export default userSlice.reducer;