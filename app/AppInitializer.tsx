'use client'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {  loginSuccess } from '@/redux/userSlice/userSlice';
import { LOCAL_STORAGE_KEYS } from '@/api/storage';

export default function AppInitializer() {
    const dispatch = useDispatch();

    useEffect(() => {

        const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
        const userData = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);

        if (token && userData) {
            const user = JSON.parse(userData);

            dispatch(loginSuccess({
                user: user,
                token: token,
            }))

        }

        console.log('first')

    }, []);



    return null; // No UI, just initializing
}
