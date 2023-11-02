import { connect } from "@/dbConfig/dbConfig";
import CourseModel from "@/models/course-model";
import { NextResponse } from "next/server";



connect()

export async function GET() {
    try {
        
        // .map((e)=> e.startingDate.toLocaleString() +' '+ e.endingDate.toLocaleString())
        
        const startDate = new Date()
        const endDate = new Date()
        
        const courses = await CourseModel.find()

        
        return NextResponse.json({courses}, {status: 200})

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}