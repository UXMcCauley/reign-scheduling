import React from 'react';

function SingleDayView({selectedDate, timeRange, dayEmployees, handleEmployeeClick}) {

    const positionClass = (position) => {
        switch (position) {
            case "Carpenter": return 'bg-blue-700'
            case "Drywall Installer": return 'bg-pink-700'
            case "Electrician": return 'bg-green-700'
            case "Flooring Installer": return 'bg-orange-500'
            case "HVAC Technician": return 'bg-purple-700'
            case "Mason": return 'bg-indigo-600'
            case "Painter": return 'bg-red-700'
            case "Plumber": return 'bg-teal-700'
            case "Roofing Specialist": return 'bg-yellow-500'
            case "Welder": return 'bg-violet-700'
            default: return 'bg-white'

        }
    }
    // Render hours grid
    const renderHours = () => {
        const hours = [];
        for (let i = timeRange.startHour; i <= timeRange.endHour; i++) {
            hours.push(i);
        }
        return (
            <div className="flex mb-4 absolute left-0 right-0 h-full">
                {hours.map((hour) => (
                    <div key={hour} className="flex-1 text-center border-r border-slate-800 first:border-l">
                        {hour}:00
                    </div>
                ))}
            </div>
        );
    };
    const renderEmployeeShifts = () => {
        return dayEmployees.map((employee, i) => {
            const startHour = parseInt(employee.start_time.split(":")[0]);
            const endHour = parseInt(employee.end_time.split(":")[0]);
            const totalHours = timeRange.endHour - timeRange.startHour;
            const leftPercentage = ((startHour - timeRange.startHour) / totalHours) * 100;
            const widthPercentage = ((endHour - startHour) / totalHours) * 100;
            const topPercentage = ((i * 40) + (i * 16));

            const positionColor = positionClass(employee.position)

            return (
                <div key={employee._id} className="relative mt-4">
                    <div
                        className={`absolute ${positionColor} text-white rounded-full p-2 cursor-pointer text-xs`}
                        style={{
                            left: `${leftPercentage}%`,
                            width: `${widthPercentage}%`,
                            top: `${topPercentage}px`,
                        }}
                        onClick={() => handleEmployeeClick(employee)}
                    >
                        {employee.first_name.slice(0,1)[0]}. {employee.last_name} ({employee.start_time} - {employee.end_time})
                    </div>
                </div>
            );
        });
    };
    return (
        <div className={"relative h-[100vh]"}>
            <h2 className="text-2xl mb-12 font-extralight border-b border-slate-900 pb-4">
                {selectedDate.toDateString()}
            </h2>

            {/* Render hours from left to right */}
            <div className={"absolute right-0 left-0 bottom-0 top-[70px]"}>{renderHours()}</div>

            {/* Render employee shifts as bars */}
            <div className="space-y-4 absolute right-0 left-0">{renderEmployeeShifts()}</div>

        </div>
    );
}

export default SingleDayView;
