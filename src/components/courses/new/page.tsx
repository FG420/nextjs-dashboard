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
        minRequired: '',
        minAge: '',
        description: ''
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
        if (course.name.length > 0 && course.startingDate.length > 0 && course.endingDate.length > 0 && course.minRequired.length !== null && course.description.length > 0) {
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
                        <label className="block text-white font-bold mb-2 text-center" htmlFor="title">
                            Title of course
                        </label>
                        <input className="w-full px-3 py-2 border border-gray-400 rounded-full text-gray-700 font-semibold" id="title" name="title" type="text" placeholder="Course's name" value={course.name} onChange={(e) => setCourse({ ...course, name: e.target.value })} required />
                    </div>
                    <div className="">
                        <div className="">
                            <label className="flex justify-between text-white font-bold  ml-11 mr-10 mt-6 mb-6" htmlFor="min_participants">
                                Minimum Partecipants:
                                <input className="w-16 px-2 py-2 rounded-full text-gray-700 font-semibold" name="min_part" type="number" min={0} value={course.minRequired} onChange={(e) => setCourse({ ...course, minRequired: e.target.value })} required />
                            </label>
                            <label className="flex justify-between text-white font-bold  ml-11 mr-10 mt-6 mb-6" htmlFor="min_age">
                                Minimum Age:
                                <input className=" w-16 px-2 py-2 rounded-full text-gray-700 font-semibold" name="min_age" type="number" min={0} value={course.minAge} onChange={(e) => setCourse({ ...course, minAge: e.target.value })} required />
                            </label>
                        </div>
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
                            <input className="w-1/2 mr-2 px-2 py-2 border border-gray-400 rounded-full text-gray-700 font-semibold" id="start_date" name="start_date" type="datetime-local" value={course.startingDate} onChange={(e) => setCourse({ ...course, startingDate: e.target.value })} required />
                            <input className="w-1/2 ml-2 px-2 py-2 border border-gray-400 rounded-full text-gray-700 font-semibold" id="end_date" name="end_date" type="datetime-local" value={course.endingDate} onChange={(e) => setCourse({ ...course, endingDate: e.target.value })} required />
                        </div>
                    </div>
                    <div className="mb-8 mt-8 ">
                        <label className="block text-white font-bold mb-2 text-center" htmlFor="title">
                            Description
                        </label>
                        <input className="w-full px-3 py-2 border border-gray-400 rounded-full text-gray-700 font-semibold" id="title" name="title" type="text" placeholder="Course's name" value={course.description} onChange={(e) => setCourse({ ...course, description: e.target.value })} required />
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
