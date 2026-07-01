import { NavLink } from "react-router-dom";
function TeacherSidebar() {
    return (
        <div
            style={{
                width: "250px",
                minHeight: "100vh",
                borderRight: "1px solid #ddd",
                padding: "20px"
            }}
        >
            <h2>Teacher Panel</h2>

            <ul>
                <li>
                    <NavLink to="/teacher/dashboard">
                        Dashboard
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/teacher/courses">
                        My Courses
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/teacher/attendance">
                        Attendance
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/teacher/marks">
                        Marks
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/teacher/analytics">
                        Analytics
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default TeacherSidebar;