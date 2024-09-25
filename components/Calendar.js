import {useState} from "react";
import MonthView from "@/components/MonthView";
import SingleDayView from "@/components/SingleDayView";
import FlyIn from "@/components/FlyIn";
import CalendarButtons from "@/components/CalendarButtons";

const Calendar = ({employees, teams, projects, positions, sums}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [dayEmployees, setDayEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isAddingShift, setIsAddingShift] = useState(false);
    const [newShiftDetails, setNewShiftDetails] = useState({
        employee: '',
        start_time: '',
        end_time: '',
        team: '',
        project: '',
    });
    const [timeRange, setTimeRange] = useState({startHour: 0, endHour: 24});

    // Handle day click to open the single-day view
    const handleDayClick = (day) => {
        setSelectedDate(day); // Set the selected date
        const employeesForDay = getEmployeesForDay(day); // Filter employees for the day

        // Sort employees by last name in alphabetical order
        const sortedEmployees = employeesForDay.sort((a, b) =>
            a.last_name.localeCompare(b.last_name)
        );

        setDayEmployees(sortedEmployees); // Set employees for that day

        if (employeesForDay.length > 0) {
            // Calculate the earliest start and latest end times
            const earliestStart = Math.min(...employeesForDay.map(emp => parseInt(emp.start_time.split(":")[0])));
            const latestEnd = Math.max(...employeesForDay.map(emp => parseInt(emp.end_time.split(":")[0])));
            setTimeRange({startHour: earliestStart, endHour: latestEnd});
        } else {
            setTimeRange({startHour: 0, endHour: 24});
        }
    };

    // Handle back to month view
    const handleBackToMonthView = () => {
        setSelectedDate(null); // Clear the selected date
        setDayEmployees([]);
    };

    // Filter function to get employees working on the selected day
    const getEmployeesForDay = (day) => {
        return employees.filter(
            (employee) => new Date(employee.date).toDateString() === day.toDateString()
        );
    };

    // Handle employee click to open the editing panel
    const handleEmployeeClick = (employee) => {
        setSelectedEmployee(employee); // Set the employee to edit
        setIsAddingShift(false); // Ensure we're not adding a shift but editing
        setIsPanelOpen(true); // Open the edit panel
    };

    // Handle click to add a new shift
    const handleAddShiftClick = () => {
        setSelectedEmployee(null); // Clear selected employee
        setNewShiftDetails({employee: '', start_time: '', end_time: '', team: '', project: ''}); // Reset shift details
        setIsAddingShift(true); // We're adding a shift, not editing
        setIsPanelOpen(true); // Open the panel
    };

    // Close the editing panel
    const handleClosePanel = () => {
        setSelectedEmployee(null); // Clear selected employee
        setIsPanelOpen(false); // Close the panel
        setIsAddingShift(false); // Reset the adding state
    };

    // Handle save changes for new or edited shift
    const handleSaveChanges = () => {
        if (isAddingShift) {
            // Check for overlapping hours with existing shifts
            if (checkOverlap(newShiftDetails.employee, newShiftDetails.start_time, newShiftDetails.end_time)) {
                alert('Shift overlaps with another shift for the same employee.');
                return;
            }

            // Add the new shift logic here (e.g., update database, add to dayEmployees state)
            const newShift = {
                ...employees.find(emp => emp._id === newShiftDetails.employee),
                start_time: newShiftDetails.start_time,
                end_time: newShiftDetails.end_time,
                team: newShiftDetails.team,
                project: newShiftDetails.project,
                date: selectedDate,
            };
            setDayEmployees([...dayEmployees, newShift]); // Add new shift to the day's employees
        }

        handleClosePanel(); // Close the panel after saving
    };

    // Check if the new shift overlaps with any existing shifts for the same employee
    const checkOverlap = (employeeId, newStart, newEnd) => {
        const newStartHour = parseInt(newStart.split(":")[0]);
        const newEndHour = parseInt(newEnd.split(":")[0]);

        return dayEmployees.some((employee) => {
            if (employee._id === employeeId) {
                const existingStartHour = parseInt(employee.start_time.split(":")[0]);
                const existingEndHour = parseInt(employee.end_time.split(":")[0]);

                // Check if the new shift overlaps with the existing shift
                return (
                    (newStartHour >= existingStartHour && newStartHour < existingEndHour) ||
                    (newEndHour > existingStartHour && newEndHour <= existingEndHour)
                );
            }
            return false;
        });
    };

    // Render employee bars for their shifts
    return (
        <div className="calendar-container p-4 relative">
            <CalendarButtons handleBackToMonthView={handleBackToMonthView} handleAddShiftClick={handleAddShiftClick} selectedDate={selectedDate} />
            {/* Render the month grid or the single-day view */}
            {!selectedDate ? (
                <MonthView employees={employees} handleDayClick={handleDayClick}
                           getEmployeesForDay={getEmployeesForDay} sums={sums} timerange={timeRange} />
            ) : (
                // Single-day view when a date is selected
                <SingleDayView dayEmployees={dayEmployees} selectedDate={selectedDate} timeRange={timeRange}
                               handleAddShiftClick={handleAddShiftClick} handleBackToMonthView={handleBackToMonthView}
                               handleEmployeeClick={handleEmployeeClick}/>
            )}

            {/* Sliding panel for editing or adding employee shifts */}
            {isPanelOpen && (
                <FlyIn isAddingShift={isAddingShift} isPanelOpen={isPanelOpen} newShiftDetails={newShiftDetails}
                       setNewShiftDetails={setNewShiftDetails} selectedEmployee={selectedEmployee}
                       handleClosePanel={handleClosePanel} handleSaveChanges={handleSaveChanges} employees={employees}
                teams={teams} projects={projects}/>
            )}
        </div>
    );
};

export default Calendar;
