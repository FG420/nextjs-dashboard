'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'



export default function NewCoursesPage() {
    const router = useRouter();

    const [course, setCourse] = useState({
        name: '',
        startingDate: '',
        endingDate: '',
        minRequired: ''
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [error, setError] = useState(false)


    const newCourse = async () => {
        try {
            const res = await axios.post('/api/course/new', course);
            console.log(res.data);
            router.push('/')
        } catch (error: any) {
            setError(true)
            console.log(error.message)
        }
    }

    useEffect(() => {
        if (course.name.length > 0 && course.startingDate.length > 0 && course.endingDate.length > 0 && course.minRequired.length !== null) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [course])


    return (
        <div className=''>
            <div className='bg-gray-700'>
                <h1 className='flex justify-center text-lg font-bold '>Create New Course</h1>
                <form className="max-w-sm mx-auto">
                    <div className="mb-8 mt-8 ">
                        <label className="block text-white font-bold mb-2" htmlFor="title">
                            Title of course
                        </label>
                        <input className="w-full px-3 py-2 border border-gray-400 rounded-full text-gray-700 font-semibold" id="title" name="title" type="text" placeholder="Title of course" value={course.name} onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                    </div>
                    <div className="mb-8 ">
                        <label className="block text-white font-bold mb-2" htmlFor="min_participants">
                            Minimum Required:
                        </label>
                        <input className="w-full px-3 py-2 border border-gray-400 rounded-full text-gray-700 font-semibold" id="min_participants" name="min_participants" type="number" placeholder="Min. required" value={course.minRequired} onChange={(e) => setCourse({ ...course, minRequired: e.target.value })} />
                    </div>
                    <div className="">
                        <div className="flex justify-around">
                            <label className="block text-white font-bold mb-2" htmlFor="start_date">
                                Starting Date:
                            </label>
                            <label className="block text-white font-bold mb-2" htmlFor="end_date">
                                Ending Date:
                            </label>
                        </div>
                        <div className="flex justify-between ">
                            <input className="w-1/2 mr-2 px-2 py-2 border border-gray-400 rounded-full text-gray-700 font-semibold" id="start_date" name="start_date" type="datetime-local" value={course.startingDate} onChange={(e) => setCourse({ ...course, startingDate: e.target.value })} />
                            <input className="w-1/2 ml-2 px-2 py-2 border border-gray-400 rounded-full text-gray-700 font-semibold" id="end_date" name="end_date" type="datetime-local" value={course.endingDate} onChange={(e) => setCourse({ ...course, endingDate: e.target.value })} />
                        </div>
                    </div>
                    <div className="flex justify-center mt-14">
                        <button className="bg-orange-600  hover:bg-orange-700 hover:shadow-gray-400  text-white font-bold py-2 px-4 border-orange-500 border-2 rounded-full" type="submit" onClick={newCourse}>{buttonDisabled ? 'Fill the fields' : 'Create Course'}</button>
                    </div>
                    <br />
                    <br />
                </form>
            </div>
        </div>
    )
}
