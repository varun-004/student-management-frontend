import { useEffect, useState } from "react";

import {
  getStudentRisks,
} from "../../services/analyticsService";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";

const StudentRiskPage = () => {

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /*
  |--------------------------------------------------------------------------
  | LOAD DATA
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

  const fetchRiskData = async () => {

    try {

      const data =
        await getStudentRisks();

      setStudents(data);

    } catch (err) {

      console.error(err);

      setError(
        "Failed to load student risk analytics"
      );

    } finally {

      setLoading(false);

    }
  };

  fetchRiskData();

}, []);
  /*
  |--------------------------------------------------------------------------
  | RISK BADGES
  |--------------------------------------------------------------------------
  */

  const getRiskBadge = (risk) => {

    switch (risk) {

      case "LOW":
      case "SAFE":
        return "bg-green-100 text-green-700";

      case "MEDIUM":
      case "WARNING":
        return "bg-yellow-100 text-yellow-700";

      case "HIGH":
      case "CRITICAL":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  /*
  |--------------------------------------------------------------------------
  | REFRESH DATA
  |--------------------------------------------------------------------------
  */

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getStudentRisks();
      setStudents(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load student risk analytics");
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return <LoadingSpinner />;
  }

  /*
  |--------------------------------------------------------------------------
  | ERROR
  |--------------------------------------------------------------------------
  */

  if (error) {
    return (
      <ErrorMessage
        message={error}
      />
    );
  }

  return (
    <div className="p-6">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Student Risk Analytics
        </h1>

        <button
          onClick={loadData}
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-4
            py-2
            rounded-lg
          "
        >
          Refresh
        </button>

      </div>

      {/* EMPTY STATE */}

      {students.length === 0 ? (

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
            No risk analytics available.
          </p>
        </div>

      ) : (

        <div
          className="
            bg-white
            shadow
            rounded-xl
            overflow-hidden
          "
        >

          <table className="w-full">

            <thead>

              <tr className="bg-gray-100">

                <th className="p-4 text-left">
                  Student
                </th>

                <th className="p-4 text-left">
                  Attendance %
                </th>

                <th className="p-4 text-left">
                  Average Marks
                </th>

                <th className="p-4 text-left">
                  Risk Level
                </th>

              </tr>

            </thead>

            <tbody>

              {students.map(
                (student) => (

                  <tr
                    key={student.studentId}
                    className="border-t"
                  >

                    <td className="p-4">
                      {student.studentName}
                    </td>

                    <td className="p-4">
                      {student.attendance.toFixed(2)}%
                    </td>

                    <td className="p-4">
                      {student.marks.toFixed(2)}
                    </td>

                    <td className="p-4">

                      <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          font-medium
                          ${getRiskBadge(
                            student.riskLevel
                          )}
                        `}
                      >
                        {student.riskLevel}
                      </span>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
};

export default StudentRiskPage;