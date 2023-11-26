'use client';

import React, { FormEvent, useState } from 'react'
import './index.css';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    const handleSubmit = () => {
        localStorage.setItem('loginStatus', '1');
        alert('Login Successfully!')
        router.back();
    };

    return (
        <div className='login-container'>
            <h1>Welcome to the Login Page!</h1>
            <div className='input-area'>
                <div className='input-block'>
                    <label htmlFor="username">username:&nbsp;</label>
                    <input onInput={(e: FormEvent<HTMLInputElement>) => setUsername((e.target as HTMLInputElement).value)} className='input' id='username' type="text" />
                </div>
                <div className='input-block'>
                    <label htmlFor="password">password:&nbsp;</label>
                    <input onInput={(e: FormEvent<HTMLInputElement>) => setPassword((e.target as HTMLInputElement).value)} className='input' id='password' type="password" />
                </div>
            </div>
            <div className='button-area'>
                <button className='button' onClick={handleSubmit}>submit</button>
                <button className='button' onClick={handleBack}>cancel</button>
            </div>
        </div>
    )
}

