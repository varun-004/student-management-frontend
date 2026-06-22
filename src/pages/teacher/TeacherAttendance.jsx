import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import {
  getCourseStudents,
  markAttendance,
} from "../../services/teacherService";

function TeacherAttendance() {
  const { courseId } = useParams();

  const [students, setStudents] = useState([]);

  const [attendanceData, setAttendanceData] = useState({});

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  useEffect(() => {
    let active = true;

    const fetchStudents = async () => {
      try {
        const data = await getCourseStudents(courseId);

        if (!active) {
          return;
        }

        setStudents(data);
      } catch (error) {
        console.error(error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchStudents();

    return () => {
      active = false;
    };
  }, [courseId]);

  const handleCheckboxChange = (studentId, checked) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: checked,
    }));
  };

  const handleSaveAttendance = async () => {
    try {
      setSaving(true);

      for (const student of students) {
        await markAttendance({
          studentId: student.id,

          courseId: Number(courseId),

          attendanceDate,

          present: attendanceData[student.id] || false,
        });
      }

      alert("Attendance saved successfully");
    } catch (error) {
      console.error(error);

      alert(error?.response?.data?.message || "Failed to save attendance");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <h2>Loading Students...</h2>;
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
          Mark Attendance
        </h1>

        <div className="mt-4">
          <label
            className="
      font-semibold
      mr-3
    "
          >
            Attendance Date
          </label>

          <input
            type="date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
            className="
      border
      px-3
      py-2
      rounded-lg
    "
          />
        </div>

        <button
          onClick={handleSaveAttendance}
          disabled={saving}
          className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-5
            py-2
            rounded-lg
          "
        >
          {saving ? "Saving..." : "Save Attendance"}
        </button>
      </div>

      <div
        className="
          bg-white
          rounded-xl
          shadow
        "
      >
        {students.map((student) => (
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
              type="checkbox"
              checked={attendanceData[student.id] || false}
              onChange={(e) =>
                handleCheckboxChange(student.id, e.target.checked)
              }
              className="
                w-5
                h-5
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeacherAttendance;
