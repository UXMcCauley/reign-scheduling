import React from 'react';

function FlyIn({isAddingShift, selectedEmployee, newShiftDetails, setNewShiftDetails, employees, handleClosePanel, handleSaveChanges, teams, projects}) {
    return (
        <div className="fixed right-0 top-0 bottom-0 w-1/3 bg-gray-900 shadow-lg z-50 p-4">
            <h3 className="text-xl font-bold mb-4 text-white">
                {isAddingShift ? "Add Shift" : `Edit Shift for ${selectedEmployee?.first_name} ${selectedEmployee?.last_name}`}
            </h3>

            {/* If adding a shift, display employee selection */}
            {isAddingShift && (
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1 text-white">Employee</label>
                    <select
                        value={newShiftDetails.employee}
                        onChange={(e) => setNewShiftDetails({...newShiftDetails, employee: e.target.value})}
                        className="border rounded w-full p-2 bg-gray-800 text-white"
                    >
                        <option value="">Select Employee</option>
                        {employees.map((emp) => (
                            <option key={emp._id} value={emp._id}>
                                {emp.first_name} {emp.last_name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1 text-white">Start Time</label>
                <input
                    type="time"
                    value={newShiftDetails.start_time}
                    onChange={(e) => setNewShiftDetails({...newShiftDetails, start_time: e.target.value})}
                    className="border rounded w-full p-2 bg-gray-800 text-white"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1 text-white">End Time</label>
                <input
                    type="time"
                    value={newShiftDetails.end_time}
                    onChange={(e) => setNewShiftDetails({...newShiftDetails, end_time: e.target.value})}
                    className="border rounded w-full p-2 bg-gray-800 text-white"
                />
            </div>

            {/* Select for Team */}
            <div className="mb-4">
                <label className="block text-sm font-bold mb-1 text-white">Team</label>
                <select
                    value={newShiftDetails.team}
                    onChange={(e) => setNewShiftDetails({...newShiftDetails, team: e.target.value})}
                    className="border rounded w-full p-2 bg-gray-800 text-white"
                >
                    <option value="">Select Team</option>
                    {teams.map((team, index) => (
                        <option key={index} value={team}>
                            {team}
                        </option>
                    ))}
                </select>
            </div>

            {/* Select for Project */}
            <div className="mb-4">
                <label className="block text-sm font-bold mb-1 text-white">Project</label>
                <select
                    value={newShiftDetails.project}
                    onChange={(e) => setNewShiftDetails({...newShiftDetails, project: e.target.value})}
                    className="border rounded w-full p-2 bg-gray-800 text-white"
                >
                    <option value="">Select Project</option>
                    {projects.map((project, index) => (
                        <option key={index} value={project}>
                            {project}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-between">
                <button
                    onClick={handleClosePanel}
                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
                >
                    Close
                </button>
                <button
                    onClick={handleSaveChanges}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                    Save
                </button>
            </div>
        </div>
    );
}

export default FlyIn;
