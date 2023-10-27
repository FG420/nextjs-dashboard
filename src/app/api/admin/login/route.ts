import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import AdminModel from "@/models/admin-model";
import jwt from 'jsonwebtoken'



connect()

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();

        const validateAdmin = await AdminModel.findOne({ username })
        if (!validateAdmin) {
            return NextResponse.json({ error: `Admin ${username} not found` }, { status: 400 })
        }
        const checkPass = await bcryptjs.compare(password, validateAdmin.password);
        if (!checkPass) {
            return NextResponse.json({ error: `Password invalid` }, { status: 400 })
        }

        const tokenData = {
            id: validateAdmin._id,
            username: validateAdmin.username,
            password: validateAdmin.password
        }

        const token = await jwt.sign(tokenData, process.env.token_secret!, { expiresIn: '1d' });
        const res = NextResponse.json({ message: 'Admin successfully logged', success: true, token })
        console.log(res)
        res.cookies.set('token', token, { httpOnly: true })
        return res

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}