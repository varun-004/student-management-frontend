import {
  useEffect,
  useState
} from "react";

import {
  getAllTeachers,
  deleteTeacher
}
from "../../services/adminTeacherService";
import { Link }
from "react-router-dom";


function TeachersPage() {

  const [teachers,
         setTeachers] =
         useState([]);

 

useEffect(() => {

  const loadTeachers = async () => {

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


 const handleDelete = async (id) => {

  const confirmed =
    window.confirm(
      "Delete teacher?"
    );

  if (!confirmed) return;

  try {

    await deleteTeacher(id);

    setTeachers(
      prev =>
        prev.filter(
          teacher =>
            teacher.id !== id
        )
    );

    alert(
      "Teacher deleted successfully"
    );

  } catch (error) {

    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to delete teacher"
    );

  }
};

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
          Teachers
        </h1>
      </div>

      <div
        className="
          bg-white
          rounded-xl
          shadow
        "
      >

        <table
          className="
            w-full
          "
        >

          <thead>

            <tr
              className="
                border-b
              "
            >
              <th>Name</th>

              <th>Email</th>

              <th>Department</th>

              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {teachers.map(
              teacher => (

                <tr
                  key={teacher.id}
                  className="
                    border-b
                  "
                >

                  <td>
                    {
                      teacher.firstName
                    }{" "}
                    {
                      teacher.lastName
                    }
                  </td>

                  <td>
                    {
                      teacher.email
                    }
                  </td>

                  <td>
                    {
                      teacher.department
                    }
                  </td>

                  <td>

                    <div className="flex gap-2">

  <Link
    to={`/admin/teachers/edit/${teacher.id}`}
    className="
      bg-blue-600
      text-white
      px-3
      py-1
      rounded
    "
  >
    Edit
  </Link>

  <button
    onClick={() =>
      handleDelete(
        teacher.id
      )
    }
    className="
      bg-red-600
      text-white
      px-3
      py-1
      rounded
    "
  >
    Delete
  </button>

</div>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      <Link
  to="/admin/teachers/add"
  className="
    bg-green-600
    text-white
    px-4
    py-2
    rounded
  "
>
  Add Teacher
</Link>

    </div>
  );
}

export default TeachersPage;