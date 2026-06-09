import { useEffect, useState } from "react";

import { getAllCourses, createCourse } from "../../services/courseService";

import CourseCard from "../../components/courses/CourseCard";

import Modal from "../../components/ui/Modal";

import CourseForm from "../../components/courses/CourseForm";
import toast from "react-hot-toast";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createLoading, setCreateLoading] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | LOAD COURSES
  |--------------------------------------------------------------------------
  */

  const filteredCourses = courses.filter((course) =>
    course.courseName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);

        const data = await getAllCourses();

        console.log(data);

        setCourses(data.content);
      } catch (err) {
        console.error(err);

        setError("Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | CREATE COURSE
  |--------------------------------------------------------------------------
  */

  const handleCreateCourse = async (formData) => {
    try {
      setCreateLoading(true);

      await createCourse(formData);

      /*
      |--------------------------------------------------------------------------
      | REFRESH COURSES
      |--------------------------------------------------------------------------
      */

      const updatedCourses = await getAllCourses();

      setCourses(updatedCourses.content);

      /*
      |--------------------------------------------------------------------------
      | CLOSE MODAL
      |--------------------------------------------------------------------------
      */

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);

      toast.error("Failed to create course");
    } finally {
      setCreateLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return <div className="p-6 text-lg">Loading courses...</div>;
  }

  /*
  |--------------------------------------------------------------------------
  | ERROR
  |--------------------------------------------------------------------------
  */

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      {/* HEADER */}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Add Course
        </button>
      </div>

      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
    w-full
    border
    rounded-lg
    px-4
    py-2
    mb-6
  "
      />

      {/* COURSES GRID */}

     {filteredCourses.length === 0 ? (

  <div
    className="
      bg-white
      shadow
      rounded-xl
      p-8
      text-center
    "
  >
    <p className="text-gray-500">
      No courses found.
    </p>
  </div>

) : (

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

    {filteredCourses.map(
      (course) => (
        <CourseCard
          key={course.id}
          course={course}
        />
      )
    )}

  </div>

)}

      {/* MODAL */}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Course"
      >
        <CourseForm onSubmit={handleCreateCourse} loading={createLoading} />
      </Modal>
    </div>
  );
};

export default CoursesPage;
