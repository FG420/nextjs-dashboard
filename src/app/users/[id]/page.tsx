'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Course as tCourse } from '@/models/course-model'
import { User as tUser } from '@/models/user-model'
import Link from 'next/link'
import NewUserPage from '@/app/users/new/page'
import Navbar from '@/components/navbar/page'




export default function UserIdPage({ params }: any) {

    return (
        <div>
            Ciao
        </div>
    )
}
