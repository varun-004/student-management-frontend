import { Link } from "react-router-dom";

import useAuth from "../../auth/useAuth";


const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-5">
      <ul className="space-y-4">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        {user?.role === "ADMIN" && (
          <>
            <li>
              <Link to="/courses">Courses</Link>
            </li>

            <li>
              <Link to="/attendance/mark">
                Attendance
              </Link>
            </li>

            <li>
              <Link to="/marks/entry">Marks</Link>
            </li>
          </>
        )}

        {user?.role === "STUDENT" && (
          <>
            <li>
              <Link to="/attendance/history">
                Attendance
              </Link>
            </li>

            <li>
              <Link to="/marks/report">
                Marks
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;