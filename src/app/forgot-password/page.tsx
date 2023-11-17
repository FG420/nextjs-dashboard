'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'



export default function LoginPage() {
    const router = useRouter()
    const [admin, setNewPass] = useState({
        username: '',
        oldPassword: '',
        newPassword: '',
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [error, setError] = useState(false)

    const onForgotPassword = async () => {
        try {
            const res = await axios.put('api/admin/forgot-pass', admin)
            console.log(res.data)
            router.push('/login')
        } catch (error: any) {
            console.log('log error', error.message)
            setError(true)
        }
    }

    useEffect(() => {
        if (admin.username.length > 0 && admin.oldPassword.length > 0 && admin.newPassword.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [admin])


    return (
        <div className='animation'>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className='text-6xl tab-screen:text-4xl font-semibold mb-20'>Forgot Password</h1>
                <form className="w-90 bg-gray-700 rounded-lg shadow-lg px-8 pt-8 pb-8 mx-auto">
                    <div className="mb-8 ">
                        <label className="flex justify-center text-orange-400 font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input className="block mx-auto shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={admin.username} onChange={(e) => setNewPass({ ...admin, username: e.target.value })} />
                        {/* <p className="text-red-500 text-sm italic py-4 text-center" onChange={(e)=> setError(true)}>{error ? 'Insert Valid Username' : ''}</p> */}
                    </div>
                    <div className="mb-7">
                        <label className="flex justify-center text-orange-400 font-bold mb-2 " htmlFor="password">
                            Old Password
                        </label>
                        <input className="block mx-auto shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" value={admin.oldPassword} onChange={(e) => setNewPass({ ...admin, oldPassword: e.target.value })} />
                    </div>
                    <div className="mb-5">
                        <label className="flex justify-center text-orange-400 font-bold mb-2 " htmlFor="password">
                            New Password
                        </label>
                        <input className="block mx-auto shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" value={admin.newPassword} onChange={(e) => setNewPass({ ...admin, newPassword: e.target.value })} />
                    </div>
                    <p className="text-red-500 text-sm italic py-4 text-center" onChange={() => setError(true)}>{error ? 'The passwords have errors' : ''}</p>
                    <div className="flex items-center justify-between mt-5">
                        <button className="mx-auto font-bold border-2 border-orange-500 rounded-full bg-orange-600 p-2 w-40 text-white hover:text-white hover:bg-orange-500 shadow hover:hover:shadow-tot-gray" type="button" onClick={onForgotPassword}>{buttonDisabled ? 'Fill the fields' : 'Submit'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
