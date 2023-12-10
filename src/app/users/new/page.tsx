'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'




export default function NewUserPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        birthDate: '',
        phoneNumber: '',
        notes: '',
        subscribedTo: ''
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);


    const newUser = async () => {
        try {
            const res = await axios.post('/api/user/new', user);
            router.push('/')
        } catch (error: any) {
            console.log(error.message)
        }
    }

    const getUrl = window.location.href;
    const urlParts = getUrl.split('/')
    const value = urlParts[urlParts.length - 1]

    useEffect(() => {
        setUser(prevUser => ({
            ...prevUser,
            subscribedTo: value
        }));
    }, [setUser])

    useEffect(() => {
        if (user.name.length > 0 && user.surname.length > 0 && user.email.length > 0 && user.phoneNumber.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])


    return (
        <div>
            {/* <h2 className="flex justify-center py-5 text-2xl font-bold">New Subscriber</h2> */}
            <div className=" flex items-center justify-center px-6 pb-10 pt-5">
                <div className="max-w-md mx-auto p-6 bg-gray-600 shadow-md rounded-md">
                    <form>
                        <div className='flex justify-between'>
                            <div className="mb-4 mx-2">
                                <label htmlFor="name" className="block font-semibold mb-1 text-center">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full border-gray-300 border p-2 text-black rounded-full"
                                    value={user.name}
                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-4 mx-2">
                                <label htmlFor="surname" className="block font-semibold mb-1 text-center">Surname</label>
                                <input
                                    type="text"
                                    id="surname"
                                    name="surname"
                                    className="w-full border-gray-300 border p-2 text-black rounded-full"
                                    value={user.surname}
                                    onChange={(e) => setUser({ ...user, surname: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4 mx-2">
                            <label htmlFor="email" className="block font-semibold mb-1 text-center">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full border-gray-300 border p-2 text-black rounded-full"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className='flex justify-between'>
                            <div className="mb-4 mx-2">
                                <label htmlFor="dateOfBirth" className="block font-semibold mb-1 text-center">Birth Date</label>
                                <input
                                    type="date"
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    className="w-full border-gray-300 border p-2 text-black rounded-full"
                                    value={user.birthDate}
                                    onChange={(e) => setUser({ ...user, birthDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-4 mx-2">
                                <label htmlFor="phoneNumber" className="block font-semibold mb-1 text-center">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    className="w-full border-gray-300 border p-2 text-black rounded-full"
                                    value={user.phoneNumber}
                                    onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                                    placeholder='Please prefix as well'
                                    required />
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <button
                                type="button"
                                className=" font-bold bg-orange-600 text-white rounded-full my-2 px-4 py-2 hover:bg-orange-500 hover:shadow-tot-gray" onClick={newUser}>{buttonDisabled ? 'Fill the fields' : 'Subscribe'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
