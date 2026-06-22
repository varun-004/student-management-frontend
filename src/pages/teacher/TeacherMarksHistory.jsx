import { useEffect, useState, useCallback } from "react";

import { useParams } from "react-router-dom";

import {
  getMarksByCourse,
  deleteMarks
} from "../../services/teacherService";

function TeacherMarksHistory() {

  const { courseId } = useParams();

  const [marks, setMarks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadMarks = useCallback(
    async () => {
      try {
        const data = await getMarksByCourse(courseId);
        setMarks(data);
      } catch (error) {
        console.error(error);
      }
    },
    [courseId]
  );

  useEffect(() => {
    let isMounted = true;

    const fetchMarks = async () => {
      try {
        const data = await getMarksByCourse(courseId);

        if (isMounted) {
          setMarks(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMarks();

    return () => {
      isMounted = false;
    };
  }, [courseId]);

  const handleDelete =
    async (marksId) => {

      const confirmed =
        window.confirm(
          "Delete this marks record?"
        );

      if (!confirmed) {
        return;
      }

      try {

        await deleteMarks(
          marksId
        );

        await loadMarks();

      } catch (error) {

        console.error(error);

        alert(
          "Failed to delete marks"
        );
      }
    };

  if (loading) {

    return (
      <h2>
        Loading Marks...
      </h2>
    );
  }

  return (
    <div className="p-6">

      <h1
        className="
          text-3xl
          font-bold
          mb-6
        "
      >
        Marks History
      </h1>

      <div
        className="
          bg-white
          shadow
          rounded-xl
          overflow-hidden
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
                bg-gray-100
              "
            >

              <th className="p-3 text-left">
                Student
              </th>

              <th className="p-3 text-left">
                Subject
              </th>

              <th className="p-3 text-left">
                Score
              </th>

              <th className="p-3 text-left">
                Grade
              </th>

              <th className="p-3 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {marks.map(mark => (

              <tr
                key={mark.id}
                className="
                  border-b
                "
              >

                <td className="p-3">
                  {mark.studentName}
                </td>

                <td className="p-3">
                  {mark.subject}
                </td>

                <td className="p-3">
                  {mark.score}
                </td>

                <td className="p-3">
                  {mark.grade}
                </td>

                <td className="p-3">

                  <button
                    onClick={() =>
                      handleDelete(
                        mark.id
                      )
                    }
                    className="
                      text-red-600
                      hover:underline
                    "
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default TeacherMarksHistory;
