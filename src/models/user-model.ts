import mongoose from "mongoose";

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
        required: true
    },
    birthDate: {
        required: true,
        day: {
            type: Number,
            required: true
        },
        month: {
            type: Number,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
    },
    parentData: {
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
            required: true
        },
    },
    notes: { type: String }
})

userSchema.virtual('fullName').get(function () {
    return `${this.name} ${this.surname}`;
});

userSchema.virtual('birthDate').get(function () {
    return `${this.birthDate.day}/${this.birthDate.month}/${this.birthDate.year}`
})

// userSchema.virtual('parentFullName').get(function () {
//     return `${this.parentData?.name} ${this.parentData?.surname}`
// })

const UserModel = mongoose.models.users || mongoose.model('users', userSchema)
export default UserModel