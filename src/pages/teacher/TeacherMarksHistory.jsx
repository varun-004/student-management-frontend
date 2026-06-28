import { useEffect, useState, useCallback } from "react";

import { useParams } from "react-router-dom";

import {
  getMarksByCourse,
  deleteMarks,
  updateMarks,
} from "../../services/teacherService";

function TeacherMarksHistory() {
  const { courseId } = useParams();

  const [marks, setMarks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editingMark, setEditingMark] = useState(null);

  const [editedScore, setEditedScore] = useState("");

  const loadMarks = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getMarksByCourse(courseId);

      setMarks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [courseId]);
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

  const handleDelete = async (marksId) => {
    const confirmed = window.confirm("Delete this marks record?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteMarks(marksId);

      await loadMarks();
    } catch (error) {
      console.error(error);

      alert("Failed to delete marks");
    }
  };

  if (loading) {
    return <h2>Loading Marks...</h2>;
  }

  const handleEdit = (mark) => {
    setEditingMark(mark);

    setEditedScore(mark.score);
  };

  const handleUpdate = async () => {
    try {
      await updateMarks(
        editingMark.id,

        {
          score: Number(editedScore),
        },
      );

      setEditingMark(null);

      await loadMarks();

      alert("Marks Updated");
    } catch (error) {
      console.error(error);

      alert("Update Failed");
    }
  };

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
              <th className="p-3 text-left">Student</th>

              <th className="p-3 text-left">Subject</th>

              <th className="p-3 text-left">Score</th>

              <th className="p-3 text-left">Grade</th>

              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {marks.map((mark) => (
              <tr
                key={mark.id}
                className="
                  border-b
                "
              >
                <td className="p-3">{mark.studentName}</td>

                <td className="p-3">{mark.subject}</td>

                <td className="p-3">
                  {editingMark?.id === mark.id ? (
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editedScore}
                      onChange={(e) => setEditedScore(e.target.value)}
                      className="
        border
        rounded
        p-1
        w-24
      "
                    />
                  ) : (
                    mark.score
                  )}
                </td>

                <td className="p-3">{mark.grade}</td>

                <td className="p-3">
                  {editingMark?.id === mark.id ? (
                    <div className="flex gap-3">
                      <button
                        onClick={handleUpdate}
                        className="
          text-green-600
          hover:underline
        "
                      >
                        Save
                      </button>

                      <button
                        onClick={() => setEditingMark(null)}
                        className="
          text-gray-600
          hover:underline
        "
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(mark)}
                        className="
          text-blue-600
          hover:underline
        "
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(mark.id)}
                        className="
          text-red-600
          hover:underline
        "
                      >
                        Delete
                      </button>
                    </div>
                  )}
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
