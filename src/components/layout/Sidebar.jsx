import { Link } from "react-router-dom";

import useAuth from "../../auth/useAuth";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div
      className="
        w-64
        bg-gray-900
        text-white
        min-h-screen
        p-5
      "
    >
      {/* LOGO */}

      <div className="mb-8">
        <h1 className="text-2xl font-bold">SMS</h1>

        <p className="text-gray-400 text-sm">Student Management</p>
      </div>

      <ul className="space-y-2">
        {/* DASHBOARD */}

        <li>
          <Link
            to="/dashboard"
            className="
              block
              px-3
              py-2
              rounded-lg
              hover:bg-gray-800
            "
          >
            Dashboard
          </Link>
        </li>

        {/* ADMIN MENU */}

        {user?.role === "ADMIN" && (
          <>
            <div className="mt-6 mb-2 text-xs uppercase text-gray-400 font-semibold">
              Courses
            </div>

            <li>
              <Link
                to="/courses"
                className="block px-3 py-2 rounded-lg hover:bg-gray-800"
              >
                Courses
              </Link>
            </li>

            <div className="mt-6 mb-2 text-xs uppercase text-gray-400 font-semibold">
              Attendance
            </div>

            <li>
              <Link
                to="/attendance/mark"
                className="block px-3 py-2 rounded-lg hover:bg-gray-800"
              >
                Mark Attendance
              </Link>
            </li>

            <li>
              <Link
                to="/attendance/history"
                className="block px-3 py-2 rounded-lg hover:bg-gray-800"
              >
                Attendance History
              </Link>
            </li>

            <li>
              <Link
                to="/attendance/report"
                className="block px-3 py-2 rounded-lg hover:bg-gray-800"
              >
                Attendance Report
              </Link>
            </li>

            <div className="mt-6 mb-2 text-xs uppercase text-gray-400 font-semibold">
              Marks
            </div>

            <li>
              <Link
                to="/marks/entry"
                className="block px-3 py-2 rounded-lg hover:bg-gray-800"
              >
                Marks Entry
              </Link>
            </li>

            <li>
              <Link
                to="/marks/report"
                className="block px-3 py-2 rounded-lg hover:bg-gray-800"
              >
                Marks Report
              </Link>
            </li>

            <li>
              <Link
                to="/marks/top-performers"
                className="block px-3 py-2 rounded-lg hover:bg-gray-800"
              >
                Top Performers
              </Link>
            </li>

            <div className="mt-6 mb-2 text-xs uppercase text-gray-400 font-semibold">
              Analytics
            </div>

            <li>
              <Link
                to="/analytics/risk"
                className="block px-3 py-2 rounded-lg hover:bg-gray-800"
              >
                Student Risk Analytics
              </Link>
            </li>

            <li>
              <Link
                to="/admin/teachers"
                className="
      block
      px-3
      py-2
      rounded-lg
      hover:bg-gray-800
    "
              >
                Teachers
              </Link>
            </li>
          </>
        )}

        {/* STUDENT MENU */}

        {user?.role === "STUDENT" && (
          <>
            <div className="mt-6 mb-2 text-xs uppercase text-gray-400 font-semibold">
              My Records
            </div>

            <li>
              <Link
                to="/attendance/report"
                className="block px-3 py-2 rounded-lg hover:bg-gray-800"
              >
                My Attendance
              </Link>
            </li>

            <li>
              <Link
                to="/marks/report"
                className="block px-3 py-2 rounded-lg hover:bg-gray-800"
              >
                My Marks
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* TEACHER MENU */}

      {user?.role === "TEACHER" && (
        <>
          <div className="mt-6 mb-2 text-xs uppercase text-gray-400 font-semibold">
            Teaching
          </div>
          <li>
            <Link
              to="/teacher/courses"
              className="block px-3 py-2 rounded-lg hover:bg-gray-800"
            >
              My Courses
            </Link>
          </li>

          <li>
            <Link
              to="/attendance/mark"
              className="block px-3 py-2 rounded-lg hover:bg-gray-800"
            >
              Mark Attendance
            </Link>
          </li>

          <li>
            <Link
              to="/marks/entry"
              className="block px-3 py-2 rounded-lg hover:bg-gray-800"
            >
              Enter Marks
            </Link>
          </li>
        </>
      )}
    </div>
  );
};

export default Sidebar;
