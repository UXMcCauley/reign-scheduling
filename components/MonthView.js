import React, {useState} from 'react';

function MonthView({sums, getEmployeesForDay, handleDayClick, timeRange}) {
    const [totalHours, setTotalHours] = useState([]);
    const dotClass = (position) => {
        switch (position) {
            case "Carpenter": return 'bg-blue-700'
            case "Drywall Installer": return 'bg-pink-700'
            case "Electrician": return 'bg-green-700'
            case "Flooring Installer": return 'bg-orange-700'
            case "HVAC Technician": return 'bg-purple-700'
            case "Mason": return 'bg-indigo-600'
            case "Painter": return 'bg-red-700'
            case "Plumber": return 'bg-teal-700'
            case "Roofing Specialist": return 'bg-yellow-700'
            case "Welder": return 'bg-violet-700'
            default: return 'bg-white'

        }
    }
    function limitToTwoDecimals(number) {
        return parseFloat(number.toFixed(2));
    }
    return (
        <div>
            {/* Render the month grid */}
            <div className="grid grid-cols-7 gap-1">
                {Array.from({length: 30}).map((_, index) => {

                    const day = new Date(2024, 8, index + 1); // September 2024 example
                    const employeesForDay = getEmployeesForDay(day);
                    return (
                        <div
                            key={index}
                            className="bg-gray-900 cursor-pointer hover:bg-indigo-500 hover:bg-opacity-15 relative flex flex-col justify-between"
                            onClick={() => handleDayClick(day)}
                        >
                            <div className={' bg-slate-800 bg-opacity-30 flex justify-between items-center'}>
                                <div className={"px-4 py-2 text-xl font-bold text-pink-400"}>{index + 1}</div>
                                {sums.filter(sum => sum._id === employeesForDay[0].date).map(filteredSum => {
                                    return (
                                        <div
                                            className={"px-4 py-2 text-xs"}>${limitToTwoDecimals((employeesForDay.length * 6) * filteredSum.totalPay)}<span
                                            className={"text-gray-500"}> / day</span></div>
                                    )
                                }) }
                            </div>
                            <div className={"py-2 px-4"}>
                                <ul>
                                {employeesForDay.slice(0, 5).map((employee, i) => {
                                        if (i !== 4) {
                                            return (
                                                <li key={employee._id} className={"text-xs font-extralight"}>
                                                    <span className={`dot ${dotClass(employee.position)}`}></span>{" "}
                                                    {employee.first_name.slice(0,1)[0]}. {employee.last_name}
                                                </li>
                                            )
                                        } else {
                                            return (
                                                <li key={i} className={"text-xs"}>
                                                    +{employeesForDay.length - 4} more
                                                </li>
                                            )
                                        }
                                    })}
                                </ul>
                            </div>
                            <div>
                                {sums.filter(sum => sum._id === employeesForDay[0].date).map(filteredSum => {
                                    return (
                                        <div className={"flex justify-between text-xs px-4 py-2"}>
                                            <div>${limitToTwoDecimals(filteredSum.totalPay)}<span className={"text-gray-500"}> / hr</span></div>
                                            <div>${limitToTwoDecimals(filteredSum.averagePay)}<span
                                                className={"text-gray-500"}> / av</span></div>
                                        </div>
                                    )
                                }) }
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MonthView;
