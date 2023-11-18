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

// courseSchema.set('toJSON', {
//     virtuals: true,
//     transform: (_, ret) => {
//         delete ret._id;
//         delete ret.__v;
//         return ret;
//     }
// });

// courseSchema.set('toObject', {
//     virtuals: true,
//     transform: (_, ret) => {
//         delete ret._id;
//         delete ret.__v;
//         return ret;
//     }
// });


export type Course = {
    name: string,
    startingDate: Date | string,
    endingDate: Date | string,
    minRequired: number,
    minAge: number,
    description: string,
    id: ObjectId | string
}


const CourseModel = mongoose.models.courses || mongoose.model('courses', courseSchema)
export default CourseModel