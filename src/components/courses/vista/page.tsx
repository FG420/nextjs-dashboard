'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Course as tCourse } from '@/models/course-model'
import { ObjectId } from 'mongoose'



export default function VistaCoursesPage() {

    const [courses, viewCourses] = useState<tCourse[]>([])

    const getCourseDetails = async () => {
        try {
            const res = await axios.get('/api/course/vista');
            const data = await res.data.data
            console.log(res.data.data)
            viewCourses(data.map((i: {
                name: string,
                startingDate: Date | string,
                endingDate: Date | string,
                minRequired: number,
                id: ObjectId    
            }) => {
                const course: tCourse = {
                    name: i.name,
                    startingDate: i.startingDate.toLocaleString(),
                    endingDate: i.endingDate.toLocaleString(),
                    minRequired: i.minRequired,
                    id: i.id
                }
                return course
            }))

    // const getCourseId = async () => {
        
    // }

        } catch (error: any) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getCourseDetails();
    }, []);



    return (
        <div className="flex flex-wrap justify-evenly mt-10">
            {/* <button className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-6 m-4  rounded border-2 border-gray-500'>Add Course</button> */}
            {courses.map((course, index) => (
                <div key={index} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-6 m-4 bg-gray-700 border-2 border-gray-500 rounded-lg '>
                    <h1 className="text-white font-bold">{course.name.toUpperCase()}</h1>
                    <p className="text-white">Starting Date: {new Date(course.startingDate).toLocaleString()}</p>
                    <p className="text-white">Ending Date: {new Date(course.endingDate).toLocaleString()}</p>
                    <p className="text-white">Partecipants Required: {course.minRequired} min.</p>
                    {/* <p className="text-white">id: {course.id}</p> */}
                    <button className=' font-bold bg-orange-600 text-white rounded-full p-1 mt-5 w-24 hover:bg-orange-400 '><Link href={`/${course.id}`}>Details</Link></button>
                </div>
            ))}
        </div>
    )
}
