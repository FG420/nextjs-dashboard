import { connect } from "@/dbConfig/dbConfig";
import CourseModel from "@/models/course-model";
import { NextRequest, NextResponse } from "next/server";



connect()

export async function GET(req : NextRequest) {
    try {
        const reqId = req
        
        // const courseId = await (await CourseModel.find()).map((e) => e._id)
        const data = await CourseModel.findById(reqId)

        return NextResponse.json({ data }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}