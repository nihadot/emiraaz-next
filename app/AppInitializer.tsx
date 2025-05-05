'use client'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { isLogged, isUserLoad, setReady } from '@/redux/userSlice/userSlice';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';

export default function AppInitializer() {
    const dispatch = useDispatch();

    useEffect(() => {

        const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
        const userData = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);

        if (token) {
            dispatch(isLogged({ logged: true }));
        }

        if (userData) {
            const user = JSON.parse(userData);
            dispatch(isUserLoad({ user }));
        }

            dispatch(setReady());

    }, []);



    return null; // No UI, just initializing
}
