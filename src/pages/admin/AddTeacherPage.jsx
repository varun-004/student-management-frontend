import { useState } from "react";

import {
  createTeacher
}
from "../../services/adminTeacherService";

function AddTeacherPage() {

  const [formData,
         setFormData] =
         useState({

    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    department: "",
    designation: ""

  });

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await createTeacher(
          formData
        );

        alert(
          "Teacher Added"
        );

      } catch (error) {

        console.error(error);

      }
    };

  return (
    <div>

      <h1
        className="
          text-3xl
          font-bold
          mb-6
        "
      >
        Add Teacher
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="
          bg-white
          p-6
          rounded-xl
          shadow
          space-y-4
        "
      >

        <input
          name="employeeId"
          placeholder="Employee ID"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="department"
          placeholder="Department"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="designation"
          placeholder="Designation"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="
            bg-blue-600
            text-white
            px-4
            py-2
            rounded
          "
        >
          Save Teacher
        </button>

      </form>

    </div>
  );
}

export default AddTeacherPage;