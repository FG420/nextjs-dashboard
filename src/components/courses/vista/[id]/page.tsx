'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Course as tCourse } from '@/models/course-model'



export default function CourseIdPage({params}: any) {



    return (
        <div className="flex flex-wrap justify-evenly mt-10">
            <p>Galactic Pussy</p>
            {/* {courses.map((course, index) => (
                <div key={index} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-6 m-4 bg-gray-700 border-2 border-gray-500 rounded '>
                    <h1 className="text-white font-bold">{course.name.toUpperCase()}</h1>
                    <p className="text-white">Starting Date: {new Date(course.startingDate).toLocaleString()}</p>
                    <p className="text-white">Ending Date: {new Date(course.endingDate).toLocaleString()}</p>
                    <p className="text-white">Partecipants Required: {course.minRequired} min.</p>
                    <a href="/">Details</a>
                </div>
            ))} */}
        </div>
    )
}
