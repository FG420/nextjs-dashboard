'use client'

import { useState } from "react"
import NewCoursesPage from "../../app/courses/new/page"
import Link from "next/link"

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
                <span className="mr-auto ml-24"><Link href={'/'}><img src="bot-let-wolf.svg" alt="logo" width={60} ></img></Link></span>
                <span className=" text-white">
                    {isFormOpen ? (
                        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-80 flex justify-center items-center">
                            <div className="bg-gray-700 rounded">
                                <div className="pr-3 pt-1 text-right">
                                    <span className="hover:cursor-pointer text-red-600 font-extrabold " onClick={handleCloseClick}>X</span>
                                </div>
                                {/* <button className="flex justify-end" onClick={handleCloseClick}></button> */}
                                <NewCoursesPage />
                            </div>
                        </div>
                    ) : (
                        <button onClick={handleAddClick} className=" bg-blue-700  rounded-lg p-2  font-medium hover:bg-blue-500 hover:shadow-tot-gray" >Create Course</button>
                    )}
                </span>
                <span className="mx-20" >Profile</span>
            </ul>
        </div>
    )
}
