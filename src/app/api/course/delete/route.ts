import { connect } from "@/dbConfig/dbConfig";
import CourseModel from "@/models/course-model";
import { NextRequest, NextResponse } from "next/server";



connect()

export async function DELETE() {
    try {
        const date = Date.now()
        const deleteCourse = await CourseModel.findOneAndDelete({endingDate: date})
        if(deleteCourse){

        }

        return NextResponse.json({ message: 'Course successfully created' }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}