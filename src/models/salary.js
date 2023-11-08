import mongoose from "mongoose";

const Schema = mongoose.Schema;

const salaryConfig = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    hourlyWage: {
        type: Number,
        required: true,
        min: 1
    },
    rateType: {
        type: String,
        required: true,
        enum: ["horaire", "brut", "net"]
    }
});

const SalaryConfig = mongoose.model("SalaryConfig", salaryConfig);

export default SalaryConfig;