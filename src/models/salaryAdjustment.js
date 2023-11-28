import mongoose from "mongoose";

const Schema = mongoose.Schema;

const salaryAdjustment = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["Supplément", "Déduction"],
        required: true
    },
    calculationBasis: {
        type: String,
        enum: ["Horaire", "Intermédiaire", "Brut"],
        required: true
    },
    percentage: {   
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
});

const SalaryAdjustment = mongoose.model("SalaryAdjustment", salaryAdjustment);

export default SalaryAdjustment;