import { connect } from "@/dbConfig/dbConfig";
import CourseModel from "@/models/course-model";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "url";
import { NextApiRequest, NextApiResponse } from 'next';


connect()


export async function GET(req: NextRequest) {
    try {
        const reqId = await req.nextUrl.searchParams.get('_id')
        
        const courses = await CourseModel.find({_id: reqId})
        return NextResponse.json({ courses }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
