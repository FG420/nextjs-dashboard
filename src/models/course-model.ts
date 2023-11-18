import mongoose, { ObjectId } from "mongoose";

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Provide name']
    },
    startingDate: {
        type: Date,
        required: [true, 'Provide a starting date for the course']
    },
    endingDate: {
        type: Date,
        required: [true, 'Provide a ending date for the course']
    },
    minRequired: {
        type: Number,
        required: [true, 'Provide a minimum number of people']
    },
    minAge: {
        type: Number,
        required: [true, 'Provide a minimum age for participate']
    },
    description: {
        type: String,
        required: [true, 'Provide a description for the course']
    }
})


export type Course = {
    name: string,
    startingDate: Date | string,
    endingDate: Date | string,
    minRequired: number,
    minAge: number, // da cambiare, mettere in formato Date cos' da poter avere maggior controllo sulle iscrizioni degli users
    description: string,
    id: ObjectId | string
}


const CourseModel = mongoose.models.courses || mongoose.model('courses', courseSchema)
export default CourseModel