'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'



export default function LoginPage() {
    const router = useRouter()
    const [admin, setAdmin] = useState({
        username: '',
        password: '',
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [error, setError] = useState(false)

    const onLogin = async () => {
        try {
            const res = await axios.post('api/admin/login', admin)
            console.log(res.data)
            router.push('/')
        } catch (error: any) {
            console.log('log error', error.message)
            setError(true)
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
        <div className='animation'>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className='text-6xl font-semibold mb-20'> Login </h1>
                <form className=" bg-gray-700 rounded-lg shadow-lg px-8 pt-8 pb-8 mx-auto">
                    <div className="mb-8 ">
                        <label className="flex justify-center text-orange-400 font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input className="block mx-auto shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={admin.username} onChange={(e) => setAdmin({ ...admin, username: e.target.value })} />
                        {/* <p className="text-red-500 text-sm italic py-4 text-center" onChange={(e)=> setError(true)}>{error ? 'Insert Valid Username' : ''}</p> */}
                    </div>
                    <div className="mb-5">
                        <label className="flex justify-center text-orange-400 font-bold mb-2 " htmlFor="password">
                            Password
                        </label>
                        <input className="block mx-auto shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" value={admin.password} onChange={(e) => setAdmin({ ...admin, password: e.target.value })} />
                    </div>
                    <p className="text-red-500 text-sm italic py-4 text-center" onChange={() => setError(true)}>{error ? 'Insert valid username & password' : ''}</p>
                    <div className="flex items-center justify-between mt-5">
                        <button className="mx-5 font-bold border-2 border-orange-500 rounded-full bg-orange-600 p-2 w-36 text-white hover:text-white hover:bg-orange-500 hover:shadow-tot-gray" type="button" onClick={onLogin}>{buttonDisabled ? 'Fill the fields' : 'Login'}</button>
                        <button className="mx-5 font-bold border-2 border-orange-500 rounded-full bg-orange-600 p-2 w-36 text-white hover:text-white hover:bg-orange-500 hover:shadow-tot-gray" type="button" ><Link href={'/register'}>Register</Link></button>
                    </div>
                </form>
                <p className="inline-block align-baseline font-bold text-m text-white mt-5">
                    Forgot Password? <Link className='hover:text-blue-900' href={'/forgot-password'}>Click Here</Link>
                </p>
            </div>
        </div>
    )
}
