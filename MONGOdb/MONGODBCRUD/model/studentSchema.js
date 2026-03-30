import mongoose from "mongoose"
const studentSchema = new mongoose.schema({
    studentId: {
        type: int
    },
    name: {
        type: string,
        require: true
    },
    rollNo: {
        type: int,
        require: true
    },
    branch: {
        type: String
    },
    marks: {
        type: Number
    }
})

const student = mongoose.model("student", studentSchema);
export default student;