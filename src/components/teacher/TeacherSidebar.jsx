import { Link } from "react-router-dom";

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
                    <Link to="/teacher/dashboard">
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link to="/teacher/courses">
                        My Courses
                    </Link>
                </li>

                <li>
                    <Link to="/teacher/attendance">
                        Attendance
                    </Link>
                </li>

                <li>
                    <Link to="/teacher/marks">
                        Marks
                    </Link>
                </li>

                <li>
                    <Link to="/teacher/analytics">
                        Analytics
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default TeacherSidebar;