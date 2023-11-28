import mongoose from "mongoose";

const Schema = mongoose.Schema;

const timeEntry = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    entryType: {
        type: String,
        enum: ["Entrée", "Sortie"],
        required: true
    },
    entryTimeInSec: {
        type: Number,
        required: true,
        min: 0,
        max: 86399
    }
});