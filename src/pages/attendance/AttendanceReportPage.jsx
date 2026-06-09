import { useState } from "react";
import { getAttendancePercentage } from "../../services/attendanceService";

const AttendanceReportPage = () => {

  const [studentId, setStudentId] =
    useState("");

  const [percentage, setPercentage] =
    useState(null);

  const handleSearch = async () => {

    try {

      const data =
        await getAttendancePercentage(
          studentId
        );

      setPercentage(data);

    } catch (err) {

      console.error(err);

      alert(
        "Failed to load report"
      );
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Attendance Report
      </h1>

      <div className="flex gap-4">

        <input
          type="number"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) =>
            setStudentId(
              e.target.value
            )
          }
          className="border px-4 py-2 rounded-lg"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Get Report
        </button>

      </div>

      {percentage !== null && (

        <div className="mt-6 p-4 border rounded-lg">

          <h2 className="text-xl font-semibold">

            Attendance Percentage

          </h2>

          <p className="text-3xl font-bold mt-2">

            {percentage.toFixed(2)}%

          </p>

        </div>

      )}

    </div>
  );
};

export default AttendanceReportPage;