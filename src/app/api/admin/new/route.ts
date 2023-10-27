import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import AdminModel from "@/models/admin-model";



connect()

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();

        const validateAdmin = await AdminModel.findOne({ username })
        if (validateAdmin) {
            return NextResponse.json({ error: `Admin ${username} already exist` }, { status: 400 })
        }
        const checkPass = await RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$').test(password);
        if (checkPass === false) {
            return NextResponse.json({
                message: 'The password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:'
            }, { status: 400 })
        }

        // .gentSalt() <= if omitted = 10
        const salt = await bcryptjs.genSalt(15);
        const hasedPass = await bcryptjs.hash(password, salt);

        const newAdmin = await AdminModel.create({
            username,
            password: hasedPass
        })
        const savedAdmin = await newAdmin.save()

        return NextResponse.json({ savedAdmin, message: 'Admin successfully created' }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}