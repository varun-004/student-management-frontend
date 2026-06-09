import { useEffect, useState } from "react";

import {
  getAllCourses,
  getCourseById,
} from "../../services/courseService";

import {
  markAttendance,
} from "../../services/attendanceService";

const AttendanceMarkPage = () => {

  const [courses, setCourses] =
    useState([]);

  const [selectedCourse,
    setSelectedCourse] =
      useState("");

  const [students, setStudents] =
    useState([]);

  useEffect(() => {

    const loadCourses =
      async () => {

        const data =
          await getAllCourses();

        setCourses(
          data.content || []
        );
      };

    loadCourses();

  }, []);

  const handleCourseChange =
    async (courseId) => {

      setSelectedCourse(courseId);

      const course =
        await getCourseById(
          courseId
        );

      setStudents(
        course.students || []
      );
    };

  const handleAttendance =
    async (
      studentId,
      present
    ) => {

      await markAttendance({

        studentId,

        courseId:
          selectedCourse,

        present,
      });

      alert(
        "Attendance Saved"
      );
    };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Mark Attendance
      </h1>

      <select
        value={selectedCourse}
        onChange={(e) =>
          handleCourseChange(
            e.target.value
          )
        }
        className="border px-4 py-2 rounded-lg mb-6"
      >

        <option value="">
          Select Course
        </option>

        {courses.map((course) => (

          <option
            key={course.id}
            value={course.id}
          >
            {course.courseName}
          </option>

        ))}

      </select>

      <div className="space-y-4">

        {students.map((student) => (

          <div
            key={student.id}
            className="flex items-center justify-between border p-4 rounded-lg"
          >

            <div>

              <h3 className="font-semibold">
                {student.name}
              </h3>

              <p>
                {student.email}
              </p>

            </div>

            <div className="flex gap-3">

              <button
                onClick={() =>
                  handleAttendance(
                    student.id,
                    true
                  )
                }
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Present
              </button>

              <button
                onClick={() =>
                  handleAttendance(
                    student.id,
                    false
                  )
                }
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Absent
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default AttendanceMarkPage;
