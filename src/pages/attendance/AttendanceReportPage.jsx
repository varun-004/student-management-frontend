import { useState, useEffect } from "react";

import { getAttendancePercentage } from "../../services/attendanceService";

import { getStudentByEmail } from "../../services/studentService";

const AttendanceReportPage = () => {
  const [percentage, setPercentage] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        const student = await getStudentByEmail(user.email);

        const data = await getAttendancePercentage(student.id);

        setPercentage(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadAttendance();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="p-6">
      <h1
        className="
          text-3xl
          font-bold
          mb-6
        "
      >
        My Attendance
      </h1>

      <div
        className="
          mt-6
          p-4
          border
          rounded-lg
          bg-white
          shadow
        "
      >
        <h2
          className="
            text-xl
            font-semibold
          "
        >
          Attendance Percentage
        </h2>

        <p
          className="
    text-3xl
    font-bold
    mt-2
  "
        >
          {percentage !== null
            ? `${Number(percentage).toFixed(2)}%`
            : "No attendance data"}
        </p>
      </div>
    </div>
  );
};

export default AttendanceReportPage;
