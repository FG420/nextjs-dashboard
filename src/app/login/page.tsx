'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'



export default function LoginPage() {
    const router = useRouter()
    const [admin, setAdmin] = useState({
        username: '',
        password: '',
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const onLogin = async () => {
        try {
            const res = await axios.post('api/admin/login', admin)
            router.push('/')
        } catch (error: any) {
            console.log('log error', error.message)
        }
    }

    useEffect(() => {
        if (admin.username.length > 0 && admin.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [admin])




    return (
        <div>
            <h1>Login</h1>
            <br />
            <br />
            <label  htmlFor="username">Username</label>
            <input className='text-black' type="text" name="" id="" value={admin.username} onChange={(e) => setAdmin({...admin, username: e.target.value})}/>
            <label htmlFor="password">Password</label>
            <input className='text-black' type="password" name="" id="" value={admin.password} onChange={(e) => setAdmin({...admin, password: e.target.value})}/>
            <button className='bg-white text-black' onClick={onLogin}>{buttonDisabled? 'Fill the fields' : 'Login'}</button>
        </div>
    )
}
