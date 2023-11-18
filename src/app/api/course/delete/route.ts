import { connect } from "@/dbConfig/dbConfig";
import CourseModel from "@/models/course-model";
import { NextRequest, NextResponse } from "next/server";



connect()

export async function DELETE(req: NextRequest) {
    try {
        const reqId = await req.json()
        const deleteCourse = await CourseModel.findOneAndDelete({_id: reqId})
        if(!deleteCourse){
            return NextResponse.json({ message: 'Course not found' }, { status: 400 })
        }
        console.log(deleteCourse)
        return NextResponse.json({ message: 'Course successfully delete' }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}