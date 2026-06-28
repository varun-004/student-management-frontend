import { useEffect, useState } from "react";

import { getAllCourses } from "../../services/courseService";

import {
  getAttendanceByCourse,
  exportAttendanceCsv
} from "../../services/attendanceService";

const AttendanceHistoryPage = () => {
  const [courses, setCourses] = useState([]);

  const [attendance, setAttendance] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | LOAD COURSES
  |--------------------------------------------------------------------------
  */

  const handleExport = async () => {
    if (!selectedCourse) {
      alert("Please select a course first.");

      return;
    }

    try {
      const file = await exportAttendanceCsv(selectedCourse);

      const url = window.URL.createObjectURL(file);

      const link = document.createElement("a");

      link.href = url;

      link.download = "attendance.csv";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);

      alert("Failed to export CSV");
    }
  };

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getAllCourses();

        setCourses(data.content || []);
      } catch (err) {
        console.error(err);
      }
    };

    loadCourses();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | LOAD ATTENDANCE
  |--------------------------------------------------------------------------
  */

  const handleCourseChange = async (courseId) => {
    try {
      setLoading(true);

      setSelectedCourse(courseId);

      if (!courseId) {
        setAttendance([]);

        return;
      }

      const data = await getAttendanceByCourse(courseId);

      setAttendance(data);

      setError("");
    } catch (err) {
      console.error(err);

      setError("Failed to load attendance records");
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | SEARCH FILTER
  |--------------------------------------------------------------------------
  */

  const filteredAttendance = attendance.filter((record) =>
    record.studentName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6">
      <h1
        className="
          text-3xl
          font-bold
          mb-6
        "
      >
        Attendance History
      </h1>

      {/* FILTERS */}

      <div
        className="
          flex
          gap-4
          mb-6
        "
      >
        <select
          value={selectedCourse}
          onChange={(e) => handleCourseChange(e.target.value)}
          className="
            border
            px-4
            py-2
            rounded-lg
          "
        >
          <option value="">Select Course</option>

          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.courseName}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search Student..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            border
            px-4
            py-2
            rounded-lg
            flex-1
          "
        />
      </div>

      {/* LOADING */}

      {loading && <div className="mb-4">Loading attendance...</div>}

      {/* ERROR */}

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* EMPTY */}

      {!loading && filteredAttendance.length === 0 ? (
        <div
          className="
              bg-white
              rounded-xl
              shadow
              p-8
              text-center
            "
        >
          No attendance records found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <button
            onClick={handleExport}
            disabled={!selectedCourse}
            className="
    bg-green-600
    hover:bg-green-700
    text-white
    px-5
    py-2
    rounded-lg
  "
          >
            Export CSV
          </button>

          <table
            className="
                w-full
                border
                rounded-lg
              "
          >
            <thead>
              <tr
                className="
                    bg-gray-100
                  "
              >
                <th className="p-3">Student</th>

                <th className="p-3">Course</th>

                <th className="p-3">Date</th>

                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredAttendance.map((record) => (
                <tr key={record.id} className="border-t">
                  <td className="p-3">{record.studentName}</td>

                  <td className="p-3">{record.courseName}</td>

                  <td className="p-3">{record.attendanceDate}</td>

                  <td className="p-3">
                    <span
                      className={
                        record.present
                          ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                          : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                      }
                    >
                      {record.present ? "Present" : "Absent"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttendanceHistoryPage;
