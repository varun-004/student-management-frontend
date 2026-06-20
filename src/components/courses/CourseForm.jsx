import { useState, useEffect } from "react";

import { getAllTeachers }
from "../../services/adminTeacherService";

const CourseForm = ({
  onSubmit,
  loading
}) => {

  const [teachers,
         setTeachers] =
         useState([]);

  const [formData,
         setFormData] =
         useState({
           courseName: "",
           courseCode: "",
           description: "",
           credits: 0,
           teacherId: ""
         });

  useEffect(() => {

    const loadTeachers =
      async () => {

        try {

          const data =
            await getAllTeachers();

          setTeachers(data);

        } catch (error) {

          console.error(error);

        }
      };

    loadTeachers();

  }, []);

  const handleChange = (e) => {

    setFormData(prev => ({
      ...prev,
      [e.target.name]:
        e.target.value
    }));
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit({
      ...formData,
      teacherId:
        Number(
          formData.teacherId
        )
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >

      {/* COURSE NAME */}

      <div>

        <label
          className="
            block
            mb-1
            font-medium
          "
        >
          Course Name
        </label>

        <input
          type="text"
          name="courseName"
          value={formData.courseName}
          onChange={handleChange}
          placeholder="Enter course name"
          className="
            w-full
            border
            rounded-lg
            px-3
            py-2
          "
          required
        />

      </div>

      {/* COURSE CODE */}

      <div>

        <label
          className="
            block
            mb-1
            font-medium
          "
        >
          Course Code
        </label>

        <input
          type="text"
          name="courseCode"
          value={formData.courseCode}
          onChange={handleChange}
          placeholder="Enter course code"
          className="
            w-full
            border
            rounded-lg
            px-3
            py-2
          "
          required
        />

      </div>

      {/* DESCRIPTION */}

      <div>

        <label
          className="
            block
            mb-1
            font-medium
          "
        >
          Description
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
          rows="4"
          className="
            w-full
            border
            rounded-lg
            px-3
            py-2
          "
        />

      </div>

      {/* CREDITS */}

      <div>

        <label
          className="
            block
            mb-1
            font-medium
          "
        >
          Credits
        </label>

        <input
          type="number"
          name="credits"
          value={formData.credits}
          onChange={handleChange}
          placeholder="Enter credits"
          className="
            w-full
            border
            rounded-lg
            px-3
            py-2
          "
          required
        />

      </div>

      {/* TEACHER */}

      <div>

        <label
          className="
            block
            mb-1
            font-medium
          "
        >
          Teacher
        </label>

        <select
          name="teacherId"
          value={formData.teacherId}
          onChange={handleChange}
          className="
            w-full
            border
            rounded-lg
            px-3
            py-2
          "
          required
        >

          <option value="">
            Select Teacher
          </option>

          {teachers.map(
            teacher => (

              <option
                key={teacher.id}
                value={teacher.id}
              >
                {teacher.firstName}
                {" "}
                {teacher.lastName}
              </option>

            )
          )}

        </select>

      </div>

      {/* SUBMIT */}

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          py-2
          rounded-lg
        "
      >
        {loading
          ? "Creating..."
          : "Create Course"}
      </button>

    </form>
  );
};

export default CourseForm;