import { connect } from "@/dbConfig/dbConfig";
import CourseModel from "@/models/course-model";
import { NextRequest, NextResponse } from "next/server";



connect()

export async function POST(req: NextRequest) {
    try {
        const { name, startingDate, endingDate, minRequired, minAge, description } = await req.json();
        const validateCourse = await CourseModel.findOne({ name });
        if (validateCourse) {
            return NextResponse.json({ error: 'Course already exists' }, { status: 400 })
        }

        if (startingDate > endingDate) {
            return NextResponse.json({ error: 'Select a valid date for starting & ending' }, { status: 400 })
        }

        const minimumAge = new Date().getFullYear() - minAge;

        const newCourse = await CourseModel.create({
            name,
            startingDate,
            endingDate,
            minRequired,
            minAge: minimumAge,
            description
        })
        const savedCourse = await newCourse.save()
        console.log(savedCourse)

        return NextResponse.json({ savedCourse, message: 'Course successfully created' }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}