import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    position: String,
    date: Date,
    start_time: String,
    end_time: String,
    team: String,
    project: String,
});

export default mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);
