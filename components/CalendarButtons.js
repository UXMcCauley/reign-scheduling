import React from 'react';

function CalendarButtons({handleAddShiftClick, handleBackToMonthView, selectedDate}) {
    return (
        <div className={'flex items-center justify-between w-full mb-8'}>
            <div className={"text-3xl font-extralight"}>Employee Schedules</div>
            <div className={'flex'}>
                <div className={`${selectedDate === null ? 'hidden' : 'visible'}`}>
                    <button
                        onClick={handleBackToMonthView}
                        className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-700 text-xs mr-4"
                    >
                        Back to Calendar
                    </button>
                </div>
                <div>
                    <button
                        onClick={handleAddShiftClick}
                        className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-700 text-xs"
                    >
                        Add Shift
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CalendarButtons;
