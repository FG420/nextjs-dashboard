import mongoose, { ObjectId, Schema } from "mongoose";

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
    notes: { type: String },
    subscribedTo: {
        type: Schema.Types.ObjectId, ref: 'CourseModel'
    }
})

export type User = {
    name: string,
    surname: string,
    email: string,
    birthDate: Date | number,
    subscribedTo: string,
    phoneNumber: string,
    notes?: string,
    _id : ObjectId
}


const UserModel = mongoose.models.users || mongoose.model('users', userSchema)
export default UserModel