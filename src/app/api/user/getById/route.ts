import { connect } from "@/dbConfig/dbConfig";
import UserModel from "@/models/user-model";
import { NextRequest, NextResponse } from "next/server";



connect()

export async function GET(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const getUser = await UserModel.findById({_id: reqBody});
        return NextResponse.json({getUser, message: "Successfully returned user"}, {status:200})

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}