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
        <div className='flex content-center'>
            <div className='w-2/5  bg-gray-700  p-5 '>
                <h1 className='flex justify-center text-4xl font-semibold py-10'>Login</h1>
                <div className=' py-5'>
                    <label className='flex justify-center font-medium' htmlFor="username">Username</label>
                    <div className=' flex justify-center'>
                        <input className='  text-black' type="text" name="" id="" value={admin.username} onChange={(e) => setAdmin({ ...admin, username: e.target.value })} />
                    </div>
                </div>
                <div className=' py-5'>
                    <label className='flex justify-center font-medium' htmlFor="password">Password</label>
                    <div className=' flex justify-center'>
                        <input className='flex text-black ' type="password" name="" id="" value={admin.password} onChange={(e) => setAdmin({ ...admin, password: e.target.value })} />
                    </div>
                </div>
                <div className=' flex justify-center py-5'>
                    <button className=' font-bold border-2 border-orange-500 rounded-full bg-orange-600 p-2 w-40 text-white hover:text-white hover:bg-orange-500 shadow hover:shadow-gray-400' onClick={onLogin}>{buttonDisabled ? 'Fill the fields' : 'Login'}</button>
                </div>
            </div>
            <div className= ' bg-gradient-radial from-red-600 via-orange-400 to-yellow-300 flex justify-center w-full p-10'>
                <img className='' src="vercel.svg" alt="" />
            </div>
        </div>
    )
}
