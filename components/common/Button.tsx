"use client";
import { login } from '@/store/slices/auth/authSlice';
import { RootState } from '@/store/store';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Button = () => {
    const userName = useSelector((state: RootState) => state.auth.name)
    const dispatch = useDispatch();
    return (
        <div>
            <div>Name : {userName}</div>
            <button onClick={() => dispatch(login("Krishna"))}>
                Change name
            </button>
        </div>
    )
}

export default Button