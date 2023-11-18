'use client'

import axios from 'axios'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Course as tCourse } from '@/models/course-model'



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

    useEffect(() => {
        getCourseDetails();
    }, []);


    return course ? (
        <div >
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
                <button className='font-bold bg-orange-600 text-white rounded-full p-2 mt-7 w-28 hover:bg-orange-400'>Add User</button>
            </div>
        </div>
    ) : null
}
