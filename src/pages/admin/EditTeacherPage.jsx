import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import {
  getTeacherById,
  updateTeacher
}
from "../../services/adminTeacherService";

function EditTeacherPage() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [formData,
         setFormData] =
         useState({

    firstName: "",
    lastName: "",
    department: "",
    designation: ""

  });

  useEffect(() => {

    const loadTeacher =
      async () => {

        try {

          const teacher =
            await getTeacherById(
              id
            );

          setFormData({

            firstName:
              teacher.firstName,

            lastName:
              teacher.lastName,

            department:
              teacher.department,

            designation:
              teacher.designation

          });

        } catch (error) {

          console.error(error);

        }
      };

    loadTeacher();

  }, [id]);

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

        await updateTeacher(
          id,
          formData
        );

        alert(
          "Teacher Updated"
        );

        navigate(
          "/admin/teachers"
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
        Edit Teacher
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
          name="firstName"
          value={
            formData.firstName
          }
          onChange={
            handleChange
          }
          className="
            border
            p-2
            w-full
          "
        />

        <input
          name="lastName"
          value={
            formData.lastName
          }
          onChange={
            handleChange
          }
          className="
            border
            p-2
            w-full
          "
        />

        <input
          name="department"
          value={
            formData.department
          }
          onChange={
            handleChange
          }
          className="
            border
            p-2
            w-full
          "
        />

        <input
          name="designation"
          value={
            formData.designation
          }
          onChange={
            handleChange
          }
          className="
            border
            p-2
            w-full
          "
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
          Update Teacher
        </button>

      </form>

    </div>
  );
}

export default EditTeacherPage;