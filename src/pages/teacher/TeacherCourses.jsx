import { useEffect, useState } from "react";

import {
  getTeacherByEmail,
  getTeacherCourses
}
from "../../services/teacherService";

import { useNavigate } from "react-router-dom";

function TeacherCourses() {

  const [courses, setCourses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);
    const navigate = useNavigate();

useEffect(() => {
  const loadCourses = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const teacher = await getTeacherByEmail(user.email);
      const data = await getTeacherCourses(teacher.id);
      setCourses(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  loadCourses();
}, []);
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>

      <h1
        className="
          text-3xl
          font-bold
          mb-6
        "
      >
        My Courses
      </h1>

      <div
        className="
          grid
          md:grid-cols-3
          gap-4
        "
      >

        {courses.map(course => (
<div
  key={course.id}
  onClick={() =>
    navigate(
      `/teacher/course/${course.id}`
    )
  }
  className="
    bg-white
    shadow
    rounded-xl
    p-5
    cursor-pointer
  "
>
            <h2
              className="
                text-xl
                font-bold
              "
            >
              {course.courseName}
            </h2>

            <p
              className="
                text-gray-500
              "
            >
              {course.courseCode}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TeacherCourses;