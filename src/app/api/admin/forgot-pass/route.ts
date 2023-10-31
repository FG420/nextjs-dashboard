import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import AdminModel from "@/models/admin-model";



connect()

export async function PUT(req: NextRequest) {
    try {
        const { username, oldPassword, newPassword } = await req.json();

        const validateAdmin = await AdminModel.findOne({ username })
        if (!validateAdmin) {
            return NextResponse.json({ error: `Admin ${username} don't exist` }, { status: 400 })
        }
        const checkPass = await RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$').test(newPassword);
        if (checkPass === false) {
            return NextResponse.json({
                message: 'The password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:'
            }, { status: 400 })
        }

        const compare = await bcryptjs.compare(newPassword, oldPassword);
        if (compare === true) {
            return NextResponse.json({
                message: 'The password must different from the old one'
            }, { status: 400 })
        }
        const salt = await bcryptjs.genSalt(15);
        const newHasedPass = await bcryptjs.hash(newPassword, salt);

        const updateAdmin = await AdminModel.findByIdAndUpdate(validateAdmin, { password: newHasedPass })


        return NextResponse.json({ updateAdmin, message: 'Password successfully changed' }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}