'use client';

import React, { FormEvent, useState } from 'react'
import './index.css';
import { useRouter } from 'next/navigation';
import { POST } from '../api/login/route';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    // if user login successfully, then set the localStorage and go back to the menu
    const handleSubmitSuccess = () => {
        localStorage.setItem('loginStatus', '1');
        alert('Login Successfully!')
        router.back();
    };

    const handleSubmit = async () => {
        // If it's testing, use the mock request instead of the real one
        const isTesting = process.env.NODE_ENV === 'test';
        const customFetch: (path: any, req: any) => Promise<any> = isTesting
            ? (_: any, req: any): Promise<any> => {
                return POST(req);
            }
            : fetch;
        customFetch('api/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        }).then(async (res) => {
            const body = isTesting ? res : await res.json();
            if (res.status === 200 && body.code === 0) {
                handleSubmitSuccess();
            } else if (res.status === 200) {
                alert(`Login request failed: username or password is incorrect, please try again.`);
            } else {
                alert(`Login request failed: ${res.status} ${res.statusText}`)
            }
        }).catch((error: Error) => {
            alert(`Login request failed: ${error.message}`)
        });
    };

    return (
        <div className='login-container'>
            <h1>Welcome to the Login Page!</h1>
            <div className='input-area'>
                <div className='input-block'>
                    <label htmlFor="username">username:&nbsp;</label>
                    <input
                        title='username'
                        onInput={(e: FormEvent<HTMLInputElement>) => setUsername((e.target as HTMLInputElement).value)}
                        onChange={(e: FormEvent<HTMLInputElement>) => setUsername((e.target as HTMLInputElement).value)}
                        className='input'
                        id='username'
                        type="text"
                    />
                </div>
                <div className='input-block'>
                    <label htmlFor="password">password:&nbsp;</label>
                    <input
                        title='password'
                        onInput={(e: FormEvent<HTMLInputElement>) => setPassword((e.target as HTMLInputElement).value)}
                        onChange={(e: FormEvent<HTMLInputElement>) => setPassword((e.target as HTMLInputElement).value)}
                        className='input'
                        id='password'
                        type="password"
                    />
                </div>
            </div>
            <div className='button-area'>
                <button className='button' onClick={handleSubmit}>submit</button>
                <button className='button' onClick={handleBack}>cancel</button>
            </div>
        </div>
    )
}

