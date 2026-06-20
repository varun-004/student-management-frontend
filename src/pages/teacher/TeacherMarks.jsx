import { useCallback, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import {
  getCourseStudents,
  addMarks
}
from "../../services/teacherService";

function TeacherMarks() {

  const { courseId } =
    useParams();

  const [students,
         setStudents] =
         useState([]);

  const [subject,
         setSubject] =
         useState("");

  const [scores,
         setScores] =
         useState({});

  const [loading,
         setLoading] =
         useState(true);

  const [saving,
         setSaving] =
         useState(false);

  const loadStudents = useCallback(
    async () => {

      try {

        const data =
          await getCourseStudents(
            courseId
          );

        setStudents(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    },
    [courseId]
  );

  useEffect(() => {

    const fetchStudents = async () => {
      await loadStudents();
    };

    fetchStudents();

  }, [courseId]);

  const handleScoreChange =
    (studentId, value) => {

      setScores(
        prev => ({
          ...prev,
          [studentId]: value
        })
      );
    };

  const handleSaveMarks =
    async () => {

      try {

        setSaving(true);

        for (const student of students) {

          await addMarks({

            studentId:
              student.id,

            courseId:
              Number(courseId),

            subject,

            score:
              Number(
                scores[
                  student.id
                ] || 0
              )
          });
        }

        alert(
          "Marks saved successfully"
        );

      } catch (error) {

        console.error(error);

        alert(
          "Failed to save marks"
        );

      } finally {

        setSaving(false);

      }
    };

  if (loading) {

    return (
      <h2>
        Loading Students...
      </h2>
    );
  }

  return (
    <div className="p-6">

      <div
        className="
          flex
          justify-between
          items-center
          mb-6
        "
      >

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Enter Marks
        </h1>

        <button
          onClick={
            handleSaveMarks
          }
          disabled={saving}
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5
            py-2
            rounded-lg
          "
        >
          {
            saving
              ? "Saving..."
              : "Save Marks"
          }
        </button>

      </div>

      <div
        className="
          mb-6
        "
      >

        <label
          className="
            block
            mb-2
            font-medium
          "
        >
          Subject
        </label>

        <input
          type="text"
          value={subject}
          onChange={(e) =>
            setSubject(
              e.target.value
            )
          }
          className="
            border
            rounded-lg
            p-2
            w-full
          "
          placeholder="Java"
        />

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
              flex
              justify-between
              items-center
              border-b
              p-4
            "
          >

            <div>

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

            <input
              type="number"
              min="0"
              max="100"
              value={
                scores[
                  student.id
                ] || ""
              }
              onChange={(e) =>
                handleScoreChange(
                  student.id,
                  e.target.value
                )
              }
              className="
                border
                rounded
                p-2
                w-24
              "
            />

          </div>

        ))}

      </div>

    </div>
  );
}

export default TeacherMarks;