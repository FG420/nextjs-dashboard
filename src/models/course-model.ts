import mongoose from "mongoose";

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
    }
})

// courseSchema.virtual('courseStarts').get(function () {
//     return `${this.startingDate.toLocaleDateString()}`
// })



const CourseModel = mongoose.models.courses || mongoose.model('courses', courseSchema)
export default CourseModel