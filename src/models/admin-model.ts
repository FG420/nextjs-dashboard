import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Provide username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Provide password'],
        unique: true
    }
})
const AdminModel = mongoose.models.admins || mongoose.model('admins', adminSchema)
export default AdminModel