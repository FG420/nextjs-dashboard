import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Provide name']
    },
    surname: {
        type: String,
        required: [true, 'Provide surname']
    },
    email: {
        type: String,
        required: [true, 'Provide email']
    },
    phoneNumber: {
        type: String,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    parentData: {
        name: {
            type: String,
        },
        surname: {
            type: String,
        },
        email: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
    },
    notes: { type: String },
    subscribedTo: {
        type: Schema.Types.ObjectId, ref: 'CourseModel'
    }
})

export type User = {
    name: string,
    surname: string,
    email: string,
    birthDate: Date,
    subscribedTo: string,
    phoneNumber?: number,
    notes?: string,
    parentData?: Object
}


const UserModel = mongoose.models.users || mongoose.model('users', userSchema)
export default UserModel