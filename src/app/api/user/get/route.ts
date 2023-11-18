import { connect } from "@/dbConfig/dbConfig";
import UserModel from "@/models/user-model";
import { NextRequest, NextResponse } from "next/server";



connect()

export async function GET(req: NextRequest) {
    try {
        const reqId = await req.nextUrl.searchParams.get('subscribedTo')

        const data = await UserModel.find({subscribedTo: reqId})
        return NextResponse.json({ data }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}