import { useState, useEffect } from "react";

import {
  getCourseWiseAttendance
} from "../../services/attendanceService";

import {
  getStudentByEmail
} from "../../services/studentService";

const AttendanceReportPage = () => {

  const [attendance,
         setAttendance] =
         useState([]);

  const [loading,
         setLoading] =
         useState(true);

  useEffect(() => {

    const loadAttendance =
      async () => {

        try {

          const user =
            JSON.parse(
              localStorage.getItem("user")
            );

          const student =
            await getStudentByEmail(
              user.email
            );

          const data =
            await getCourseWiseAttendance(
              student.id
            );

          setAttendance(data);

        } catch (error) {

          console.error(error);

        } finally {

          setLoading(false);

        }
      };

    loadAttendance();

  }, []);

  if (loading) {

    return (
      <h2>
        Loading...
      </h2>
    );
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

      <div className="space-y-4">

        {attendance.length === 0 ? (

          <p>
            No attendance data
          </p>

        ) : (

          attendance.map(course => (

            <div
              key={course.courseId}
              className="
                border
                p-4
                rounded-lg
                bg-white
                shadow
              "
            >

              <h3
                className="
                  font-semibold
                  text-lg
                "
              >
                {course.courseName}
              </h3>

              <p
                className="
                  text-2xl
                  font-bold
                  mt-2
                "
              >
                {course.percentage.toFixed(2)}%
              </p>

            </div>

          ))

        )}

      </div>

    </div>
  );
};

export default AttendanceReportPage;