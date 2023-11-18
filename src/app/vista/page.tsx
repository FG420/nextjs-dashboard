'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Course as tCourse } from '@/models/course-model'
import { ObjectId } from 'mongoose'



export default function VistaCoursesPage() {

    const [courses, viewCourses] = useState<tCourse[]>([])

    const [deleteCourse, setDelCourse] = useState(false)

    const getCourses = async () => {
        try {
            const minimumAge = new Date().getFullYear();
            const res = await axios.get('/api/course/vista');
            const data = await res.data.data
            console.log(res.data.data)
            viewCourses(data.map((i: {
                name: string,
                startingDate: Date | string,
                endingDate: Date | string,
                minRequired: number,
                minAge: number,
                _id: ObjectId | string
            }) => {
                const courses: tCourse = {
                    name: i.name,
                    startingDate: i.startingDate.toLocaleString(),
                    endingDate: i.endingDate.toLocaleString(),
                    minRequired: i.minRequired,
                    minAge: minimumAge - i.minAge,
                    description: '',
                    id: i._id
                }
                return courses
            }))
        } catch (error: any) {
            console.log(error.message)
        }
    }

    // const onDelete = async () => {
    //     try {
    //         const res = await axios.delete('/api/course/delete')
    //         setDelCourse(true)
    //     } catch (error: any) {
    //         console.log(error.message)
    //         setDelCourse(true)
            
    //     }
    // }

    useEffect(() => {
        getCourses();
        // onDelete()
    }, []);



    return (
        <div className="flex flex-wrap justify-evenly mt-10">
            {courses.map((course, index) => (
                <div key={index} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 py-8 px-2 m-4 bg-gray-700 border-2 border-gray-500 rounded-lg '>
                    <h1 className="text-white font-bold text-xl flex justify-center my-4">{course.name.toUpperCase()}</h1>
                    <p className="text-white flex justify-center">Minimum Age Required: {course.minAge} years old</p>
                    <p className="text-white flex justify-center">Partecipants Required: {course.minRequired} min.</p>
                    <p className="text-white flex justify-center font-semibold">Starting Date: {new Date(course.startingDate).toLocaleString()}</p>
                    <p className="text-white flex justify-center font-semibold">Ending Date: {new Date(course.endingDate).toLocaleString()}</p>
                    <div className='flex justify-center'>
                        <button className=' font-bold bg-orange-600 text-white rounded-full p-2 mt-7 w-28 hover:bg-orange-400 '><Link href={`vista/${course.id}`}>Details</Link></button>
                        {/* <button className=' font-bold bg-orange-600 text-white rounded-full p-1 mt-7 w-28 hover:bg-orange-400 ' onChange={onDelete}>{deleteCourse ? 'Delete' : 'for deleting it go to details'}</button> */}
                    </div>
                </div>
            ))}
        </div>
    )
}
