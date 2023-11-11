import { connect } from "@/dbConfig/dbConfig";
import CourseModel from "@/models/course-model";
import { NextResponse } from "next/server";



connect()

export async function GET() {
    try {
        const data = await CourseModel.find()
        return NextResponse.json({ data }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}