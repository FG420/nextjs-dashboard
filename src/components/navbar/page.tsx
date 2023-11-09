'use client'

import { useState } from "react"
import NewCoursesPage from "../courses/new/page"

export default function Navbar() {

    const [isFormOpen, setIsFormOpen] = useState(false)

    const handleAddClick = () => {
        setIsFormOpen(true)
    }

    const handleCloseClick = () => {
        setIsFormOpen(false)
    }

    return (
        <div className="bg-orange-700 p-6 w-full">
            <ul className="flex justify-end">
                <span className="mr-auto ml-24">Logo</span>
                <span className="text-white mx-20">
                    {isFormOpen ? (
                        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                            <div className="bg-gray-700 p-3 rounded">
                                <button className="text-black" onClick={handleCloseClick}><img className='w-6 ' src='close-svg.svg' alt="exit-cross" /></button>
                                <NewCoursesPage />
                            </div>
                        </div>
                    ) : (
                        <button onClick={handleAddClick}>Create Course</button>
                    )}
                </span>
                <span className="mx-20">Profile</span>
            </ul>
        </div>
    )
}
