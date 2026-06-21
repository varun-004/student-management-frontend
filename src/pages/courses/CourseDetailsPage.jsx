import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import {
  getCourseById,
  assignStudentToCourse,
  removeStudentFromCourse,
} from "../../services/courseService";

import EnrollStudentModal from "../../components/courses/EnrollStudentsModal";

import toast from "react-hot-toast";

const CourseDetailsPage = () => {
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  const [enrollLoading, setEnrollLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const { id } = useParams();

  const [course, setCourse] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | LOAD COURSE
  |--------------------------------------------------------------------------
  */

  const fetchCourse = async (showLoader = true) => {
    try {
      if (showLoader) {
        setLoading(true);
      }

      setError("");

      const data = await getCourseById(id);

      setCourse(data);
    } catch (err) {
      setError(err?.message || "Failed to load course");
      setCourse(null);
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
  const loadCourse = async () => {
    try {
      setLoading(true);

      setError("");

      const data = await getCourseById(id);

      setCourse(data);
    } catch (err) {
      setError(
        err?.message ||
          "Failed to load course"
      );

      setCourse(null);
    } finally {
      setLoading(false);
    }
  };

  loadCourse();
}, [id]);
  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="p-6 text-lg">
        Loading course...
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ERROR
  |--------------------------------------------------------------------------
  */

  if (error) {
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | NO COURSE
  |--------------------------------------------------------------------------
  */

  if (!course) {
    return (
      <div className="p-6">
        Course not found
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ENROLL STUDENT
  |--------------------------------------------------------------------------
  */

  const handleEnrollStudent = async (
    studentId
  ) => {
    try {
      setEnrollLoading(true);

      await assignStudentToCourse(
        id,
        studentId
      );

      toast.success(
      "Student enrolled successfully"
    );

      await fetchCourse();

      setIsEnrollModalOpen(false);
    } catch (err) {
      console.error(err);

       toast.error(
      err?.response?.data?.message ||
      "Student already enrolled"
    );
    } finally {
      setEnrollLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | REMOVE STUDENT
  |--------------------------------------------------------------------------
  */

  const handleRemoveStudent = async (
    studentId
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to remove this student?"
      );

    if (!confirmed) return;

    try {
      await removeStudentFromCourse(
        id,
        studentId
      );

      await fetchCourse();
    } catch (err) {
      console.error(err);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | SEARCH FILTER
  |--------------------------------------------------------------------------
  */

  const filteredStudents =
    course.students?.filter(
      (student) =>
        student.name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    ) || [];

  return (
    <div className="p-6">

      {/* COURSE INFO */}

      <div className="bg-white border rounded-xl p-6 shadow-sm">

        <h1 className="text-3xl font-bold mb-4">
          {course.courseName}
        </h1>

        <div className="space-y-2 text-gray-700">

          <p>
            <span className="font-semibold">
              Course Code:
            </span>{" "}
            {course.courseCode}
          </p>

          <p>
            <span className="font-semibold">
              Credits:
            </span>{" "}
            {course.credits}
          </p>

          <p>
            <span className="font-semibold">
              Description:
            </span>{" "}
            {course.description || "N/A"}
          </p>

        </div>

      </div>

      {/* STUDENTS */}

      <div className="bg-white border rounded-xl p-6 shadow-sm mt-6">

        <div className="flex items-center justify-between mb-5">

          <h2 className="text-2xl font-bold">
            Enrolled Students
          </h2>

          <button
            onClick={() =>
              setIsEnrollModalOpen(true)
            }
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-4
              py-2
              rounded-lg
            "
          >
            Enroll Student
          </button>

        </div>

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search student..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="
            w-full
            border
            rounded-lg
            px-4
            py-2
            mb-5
          "
        />

        {/* EMPTY STATE */}

        {filteredStudents.length === 0 ? (

          <div
            className="
              bg-gray-50
              rounded-lg
              p-6
              text-center
            "
          >
            <p className="text-gray-500">
              No students found.
            </p>
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>

                <tr className="border-b bg-gray-50">

                  <th className="text-left p-3">
                    Name
                  </th>

                  <th className="text-left p-3">
                    Email
                  </th>

                  <th className="text-left p-3">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredStudents.map(
                  (student) => (

                    <tr
                      key={student.id}
                      className="border-b"
                    >

                      <td className="p-3">
                        {student.name}
                      </td>

                      <td className="p-3">
                        {student.email}
                      </td>

                      <td className="p-3">

                        <button
                          onClick={() =>
                            handleRemoveStudent(
                              student.id
                            )
                          }
                          className="
                            text-red-600
                            hover:underline
                          "
                        >
                          Remove
                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* MODAL */}

      <EnrollStudentModal
        isOpen={isEnrollModalOpen}
        onClose={() =>
          setIsEnrollModalOpen(false)
        }
        onEnroll={handleEnrollStudent}
        loading={enrollLoading}
      />

    </div>
  );
};

export default CourseDetailsPage;
