import mongoose from "mongoose";

const { Schema } = mongoose;

const photoSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    desciption: {
        type: String,
        required: true,
        trim: true    // başta ve sonda girilen boşluklardan kurtulmamızı sağlar.
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    }
})


const photo = mongoose.model('Photo', Schema);
export default photo