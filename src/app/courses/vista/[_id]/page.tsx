'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Course as tCourse } from '@/models/course-model'
import { User as tUser } from '@/models/user-model'
import Link from 'next/link'
import NewUserPage from '@/app/users/new/page'
import Navbar from '@/components/navbar/page'
import { ObjectId } from 'mongoose'



export default function CourseIdPage({ params }: any) {
    const router = useRouter()

    const minimumAge = new Date().getFullYear();
    const [tab, seeTab] = useState(true)

    const [course, setCourse] = useState<tCourse | null>(null);
    const getCourseDetails = async () => {
        try {
            const res = await axios.get(`/api/course/vistaById/?_id=${params._id}`)
            const data = await res.data.courses[0]
            console.log(data)
            return setCourse(data)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    const [users, viewUsers] = useState<tUser[]>([])
    const getUsers = async () => {
        try {
            const res = await axios.get(`/api/user/get/?subscribedTo=${params._id}`);
            const data = await res.data.data
            console.log(res.data.data)
            viewUsers(data.map((i: {
                name: string,
                surname: string,
                email: string,
                birthDate: Date | number,
                subscribedTo: string,
                phoneNumber: string,
                notes?: string,
                _id : ObjectId
            }) => {
                const users: tUser = {
                    name: i.name,
                    surname: i.surname,
                    email: i.email,
                    birthDate: i.birthDate,
                    subscribedTo: '',
                    phoneNumber: i.phoneNumber,
                    _id : i._id
                }
                return users
            }))
        } catch (error: any) {
            console.log(error.message)
        }
    }

    const [isFormOpen, setIsFormOpen] = useState(false)
    const handleAddClick = () => {
        setIsFormOpen(true)
    }
    const handleCloseClick = () => {
        setIsFormOpen(false)
    }


    useEffect(() => {
        if (users.length == 0) {
            seeTab(false)
        } else {
            seeTab(true)
        }
        getCourseDetails();
        getUsers();
    }, []);


    return course ? (
        <>
            <Navbar />
            <div className=''>
                <h1 className=' flex flex-wrap justify-center mt-20 mb-20 text-white font-bold text-4xl'>{course.name}</h1>
                <div className="">
                    <div className="flex justify-around items-start tab-screen:block">
                        <div className=' tab-screen:w-full tab-screen:text-center'>
                            <div className='flex justify-around'>
                                <div className="">
                                    <p className='text-white font-bold px-4 text-center'>Starting Date: {new Date(course.startingDate).toLocaleString()}</p>
                                </div>
                                <div className="">
                                    <p className='text-white font-bold px-4 text-center'>Ending Date: {new Date(course.endingDate).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="flex justify-around">
                                <div className="">
                                    <p className='text-white font-semibold px-4 text-center'>Partecipants required: {course.minRequired}</p>
                                </div>
                                <div className="">
                                    <p className='text-white font-semibold px-4 text-center'>Age Required: {minimumAge - course.minAge} years old</p>
                                </div>
                            </div>
                            <div className='flex mt-10 tab-screen:justify-center'>
                                <p className=' text-white font-medium px-4'>{course.description}</p>
                            </div>
                            <div className='flex justify-end m-4 tab-screen:justify-center tab-screen:my-8'>
                                {isFormOpen ? (
                                    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-80 flex justify-center items-center rounded">
                                        <div className="bg-gray-700 rounded">
                                            <div className="pr-3 pt-1 text-right">
                                                <span className="hover:cursor-pointer text-red-600 font-extrabold " onClick={handleCloseClick}>X</span>
                                            </div>
                                            <NewUserPage />
                                        </div>
                                    </div>
                                ) : (
                                    <button className=' font-bold bg-orange-600 text-white rounded-full p-3 mt-7 h-12 hover:bg-orange-500 hover:shadow-tot-gray' onClick={handleAddClick}>Add Partecipants</button>
                                )}
                            </div>
                        </div>
                        <div className=' tab-screen:w-full'>
                            {users.length > 0 ?
                                (<div className="flex justify-center" >
                                    <table className="table-auto ">
                                        <thead>
                                            <tr className='bg-gray-700 '>
                                                <th className="p-3 border-2 border-gray-400 ">Name</th>
                                                <th className="p-3 border-2 border-gray-400 ">Email</th>
                                                <th className="p-3 border-2 border-gray-400 ">Phone Number</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user, index) => (
                                                <tr key={index} className="">
                                                    <td className="border-2 border-gray-400 p-3 text-center text-white font-bold "><Link href={`../../../users/${user._id}`}>{user.name} {user.surname}</Link></td>
                                                    <td className="border-2 border-gray-400 p-3 text-center text-white font-semibold">{user.email}</td>
                                                    <td className="border-2 border-gray-400 p-3 text-center text-white font-semibold">{user.phoneNumber}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>) : (<div className="hidden">
                                    <table className="table-auto ">
                                        <thead>
                                            <tr className='bg-gray-700 '>
                                                <th className="p-3 border-2 border-gray-400 ">Name</th>
                                                <th className="p-3 border-2 border-gray-400 ">Email</th>
                                                <th className="p-3 border-2 border-gray-400 tab-screen:hidden">Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user, index) => (
                                                <tr key={index} className="">
                                                    <td className="border-2 border-gray-400 p-3 text-center text-white font-bold">{user.name} {user.surname}</td>
                                                    <td className="border-2 border-gray-400 p-3 text-center text-white font-semibold">{user.email}</td>
                                                    <td className="border-2 border-gray-400 p-3 text-center text-white tab-screen:hidden"><Link href={'../../../users/'}></Link></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : null
}
