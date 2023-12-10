import { connect } from "@/dbConfig/dbConfig";
import CourseModel from "@/models/course-model";
import UserModel, { User } from "@/models/user-model";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(req: NextRequest) {
    try {
        const user: User = await req.json();
        console.log(user);

        const existUser = await UserModel.findOne(user);
        if (existUser) {
            return NextResponse.json({ message: "User already exist" }, { status: 400 });
        }

        if (!user.email.includes('@')) {
            return NextResponse.json({ message: "User email not valid" }, { status: 400 });
        }

        const course = await CourseModel.findOne({ _id: user.subscribedTo });
        if (user.birthDate < course.minAge) {
            return NextResponse.json({ message: "User don't have the age requirments for this course" }, { status: 400 });
        }
        const createUser = await UserModel.create(user);
        const savedUser = await createUser.save();

        return NextResponse.json({ message: 'User created successfully', savedUser }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}