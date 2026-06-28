import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import {
  getCourseStudents
}
from "../../services/teacherService";

function TeacherCourseDetails() {

  const { courseId } =
    useParams();

  const navigate =
    useNavigate();

  const [students,
         setStudents] =
         useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getCourseStudents(courseId);
        setStudents(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (courseId) {
      fetchStudents();
    }
  }, [courseId]);

  return (
    <div>

      <div
        className="
          flex
          justify-between
          mb-6
        "
      >
        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Course Students
        </h1>

        <div
          className="
            flex
            gap-2
          "
        >

          <button
            onClick={() =>
              navigate(
                `/teacher/course/${courseId}/attendance`
              )
            }
            className="
              bg-green-600
              text-white
              px-4
              py-2
              rounded
            "
          >
            Attendance
          </button>

          <button
            onClick={() =>
              navigate(
                `/teacher/course/${courseId}/marks`
              )
            }
            className="
              bg-blue-600
              text-white
              px-4
              py-2
              rounded
            "
          >
            Marks
          </button>

        </div>
      </div>

      <div
        className="
          bg-white
          rounded-xl
          shadow
        "
      >

        {students.map(student => (

          <div
            key={student.id}
            className="
              border-b
              p-4
            "
          >

            <h3
              className="
                font-semibold
              "
            >
              {student.name}
            </h3>

            <p
              className="
                text-gray-500
              "
            >
              {student.email}
            </p>

          </div>

        ))}

      </div>

      <button
  onClick={() =>
    navigate(
      `/teacher/course/${courseId}/analytics`
    )
  }
  className="
    bg-purple-600
    text-white
    px-4
    py-2
    rounded
  "
>
  Analytics
</button>

<button
  onClick={() =>
    navigate(
      `/teacher/course/${courseId}/marks-history`
    )
  }
>
  Marks History
</button>

<button
  onClick={() =>
    navigate(
      `/teacher/course/${courseId}/attendance-history`
    )
  }
  className="
    bg-yellow-500
    hover:bg-yellow-600
    text-white
    px-5
    py-2
    rounded-lg
  "
>
  Attendance History
</button>

    </div>
  );
}

export default TeacherCourseDetails;