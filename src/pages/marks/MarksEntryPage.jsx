import { useEffect, useState } from "react";

import { addMarks } from "../../services/marksService";

import {
  getAllCourses,
  getCourseById,
} from "../../services/courseService";

const MarksEntryPage = () => {

  const [formData, setFormData] =
    useState({
      subject: "",
      score: "",
      studentId: "",
      courseId: "",
    });

  const [courses, setCourses] =
    useState([]);

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  /*
  |--------------------------------------------------------------------------
  | LOAD COURSES
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    const loadCourses =
      async () => {

        try {

          const data =
            await getAllCourses();

          setCourses(
            data.content || []
          );

        } catch (err) {

          console.error(err);
        }
      };

    loadCourses();

  }, []);

  /*
  |--------------------------------------------------------------------------
  | INPUT CHANGE
  |--------------------------------------------------------------------------
  */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  /*
  |--------------------------------------------------------------------------
  | COURSE CHANGE
  |--------------------------------------------------------------------------
  */

  const handleCourseChange =
    async (e) => {

      const courseId =
        e.target.value;

      setFormData({
        ...formData,
        courseId,
        studentId: "",
      });

      try {

        const course =
          await getCourseById(
            courseId
          );

        setStudents(
          course.students || []
        );

      } catch (err) {

        console.error(err);
      }
    };

  /*
  |--------------------------------------------------------------------------
  | SUBMIT
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await addMarks({

        subject:
          formData.subject,

        score:
          Number(
            formData.score
          ),

        studentId:
          Number(
            formData.studentId
          ),

        courseId:
          Number(
            formData.courseId
          ),
      });

      alert(
        "Marks added successfully"
      );

      setFormData({
        subject: "",
        score: "",
        studentId: "",
        courseId: "",
      });

      setStudents([]);

    } catch (err) {

      console.error(err);

      alert(
        "Failed to add marks"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl">

      <h1 className="text-3xl font-bold mb-6">
        Marks Entry
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* COURSE */}

        <select
          value={formData.courseId}
          onChange={
            handleCourseChange
          }
          className="w-full border rounded-lg p-3"
        >

          <option value="">
            Select Course
          </option>

          {courses.map(
            (course) => (

              <option
                key={course.id}
                value={course.id}
              >

                {course.courseName}

              </option>
            )
          )}

        </select>

        {/* STUDENT */}

        <select
          name="studentId"
          value={
            formData.studentId
          }
          onChange={
            handleChange
          }
          className="w-full border rounded-lg p-3"
        >

          <option value="">
            Select Student
          </option>

          {students.map(
            (student) => (

              <option
                key={student.id}
                value={student.id}
              >

                {student.name}

              </option>
            )
          )}

        </select>

        {/* SUBJECT */}

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={
            handleChange
          }
          className="w-full border rounded-lg p-3"
        />

        {/* SCORE */}

        <input
          type="number"
          name="score"
          placeholder="Score"
          value={formData.score}
          onChange={
            handleChange
          }
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >

          {loading
            ? "Saving..."
            : "Save Marks"}

        </button>

      </form>

    </div>
  );
};

export default MarksEntryPage;
