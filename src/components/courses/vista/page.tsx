'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Course as tCourse } from '@/models/course-model'



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
                minRequired: number
            }) => {
                const course: tCourse = {
                    name: i.name,
                    startingDate: i.startingDate.toLocaleString(),
                    endingDate: i.endingDate.toLocaleString(),
                    minRequired: i.minRequired
                }
                return course
            }))

        } catch (error: any) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getCourseDetails();
    }, []);

    return (
        <div className="flex flex-wrap">

            {courses.map((course, index) => (
                <div key={index} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4 m-4 bg-gray-700 rounded'>
                    <h1 className="text-white font-bold">{course.name.toUpperCase()}</h1>
                    <p className="text-white">Starting Date: {new Date(course.startingDate).toLocaleString()}</p>
                    <p className="text-white">Ending Date: {new Date(course.endingDate).toLocaleString()}</p>
                    <p className="text-white">Min Required: {course.minRequired}</p>
                </div>
            ))}
        </div>
    )
}
