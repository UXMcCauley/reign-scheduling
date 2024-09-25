import {connectToDatabase} from "@/lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {

    const {db} = await connectToDatabase()
    const cursor = await db.collection("shifts").find({})
    const employees = await cursor.toArray()
    await cursor.close()

    const positions = await db.collection("shifts").distinct("position");
    const projects = await db.collection("shifts").distinct("project");
    const teams = await db.collection("shifts").distinct("team");

    // const hours = await db.collection('shifts').aggregate([
    //     {
    //         // Add a field to calculate the time difference in hours between start_time and end_time
    //         $addFields: {
    //             hoursWorked: {
    //                 $divide: [
    //                     {
    //                         $subtract: [
    //                             { $toDate: "$end_time" },
    //                             { $toDate: "$start_time" }
    //                         ]
    //                     },
    //                     1000 * 60 * 60 // Convert milliseconds to hours
    //                 ]
    //             }
    //         }
    //     },
    //     {
    //         // Group by the date field and sum the total hours worked for each date
    //         $group: {
    //             _id: "$date",
    //             totalHours: { $sum: "$hoursWorked" }
    //         }
    //     },
    //     {
    //         // Sort by date in ascending order (optional)
    //         $sort: { _id: 1 }
    //     }
    // ]).toArray();


    const sums = await db.collection('shifts').aggregate([
        {
            // Convert `employeeId` in `shifts` from string/number to ObjectId
            $addFields: {
                employeeIdObjectId: { $toObjectId: '$employeeId' }
            }
        },
        {
            // Join the "employees" collection based on the converted ObjectId field
            $lookup: {
                from: 'employees',
                localField: 'employeeIdObjectId', // Field in shifts collection converted to ObjectId
                foreignField: '_id', // ObjectId field in employees collection
                as: 'employeeData',
            },
        },
        {
            // Unwind the employee data array (since lookup returns an array)
            $unwind: '$employeeData',
        },
        {
            // Group by the "date" field and sum the pay
            $group: {
                _id: '$date',
                totalPay: { $sum: '$employeeData.pay' }, // Summing the pay field from employees collection
                averagePay: { $avg: '$employeeData.pay' }, // Summing the pay field from employees collection
            },
        },
        {
            // Sort by date in ascending order (optional)
            $sort: { _id: 1 },
        },
    ]).toArray();


    res.json({employees, projects, positions, teams, sums})

}
