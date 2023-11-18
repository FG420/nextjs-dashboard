'use client'

import axios from 'axios'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Course as tCourse } from '@/models/course-model'
import { User as tUser } from '@/models/user-model'




export default function CourseIdPage({ params }: any) {

    const router = useRouter()
    
    const [course, setCourse] = useState<tCourse | null>(null);
    const getCourseDetails = async () => {
        try {
            const res = await axios.get(`/api/course/vistaById/?_id=${params._id}`)
            const data = await res.data.courses[0]
            console.log(data)
            return setCourse(data)
        } catch (error: any) {
            console.log(error.message)
            // router.back()
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
                birthDate: Date,
                subscribedTo: string,
                phoneNumber?: number,
                notes?: string,
                parentData?: Object

            }) => {
                const users: tUser = {
                    name: i.name,
                    surname: i.surname,
                    email: i.email,
                    birthDate: i.birthDate,
                    subscribedTo: '',
                    phoneNumber: i.phoneNumber,
                    notes: i.notes,
                    parentData: i.parentData
                }
                return users
            }))
        } catch (error: any) {
            console.log(error.message)
        }
    }


    useEffect(() => {
        getCourseDetails();
        getUsers();
    }, []);


    return course ? (
        <><div>
            <h1 className=' flex flex-wrap justify-center mt-20 mb-20 ml-10 mr-10 text-white font-bold text-4xl'>{course.name}</h1>
            <div className=''>
                <div className="flex flex-wrap justify-between mx-12 my-5 md:flex-col">
                    <div className="md:w-1/2">
                        <p className='text-white'>Partecipants required: {course.minRequired}</p>
                    </div>
                    <div className="md:w-1/2">
                        <p className='text-white'>Age Required: {course.minAge}</p>
                    </div>
                </div>
                <div className='flex justify-between mx-12 my-5 md:flex-col'>
                    <div className="md:w-1/2">
                        <p className='text-white font-bold'>Starting Date: {new Date(course.startingDate).toLocaleString()}</p>
                    </div>
                    <div className="md:w-1/2">
                        <p className='text-white font-bold'>Ending Date: {new Date(course.endingDate).toLocaleString()}</p>
                    </div>
                </div>
            </div>
            <div>
                <p className=' text-white'>{course.description}</p>
            </div>
            <div>
                <button className=' font-bold bg-orange-600 text-white rounded-full p-3 mt-7 h-12 hover:bg-orange-500 hover:shadow-tot-gray'>Add Partecipants</button>
            </div>

        </div><div className="flex flex-wrap justify-evenly mt-10">
                {users.map((user, index) => (
                    <div key={index} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 py-8 px-2 m-4 bg-gray-700 border-2 border-gray-500 rounded-lg '>
                        <h1 className="text-white font-bold text-xl flex justify-center my-4">Name: {user.name}</h1>
                        <p className="text-white flex justify-center">Surname: {user.surname}</p>
                        <p className="text-white flex justify-center">Email: {user.email}</p>
                        <p className="text-white flex justify-center font-semibold">Phone number: {user.phoneNumber}</p>
                        <p className="text-white flex justify-center font-semibold">Note: {user.notes}</p>
                    </div>
                ))}
        </div></>
    ) : null
}
