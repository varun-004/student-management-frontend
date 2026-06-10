import { useState } from "react";

import {
  getStudentMarks,
  getStudentAverage,
  getStudentGPA,
} from "../../services/marksService";

import toast from "react-hot-toast";


const StudentMarksReportPage = () => {

  const [studentId, setStudentId] =
    useState("");

  const [marks, setMarks] =
    useState([]);

  const [average, setAverage] =
    useState(null);

  const [gpa, setGpa] =
    useState(null);

  const handleSearch = async () => {

    try {

      const marksData =
        await getStudentMarks(
          studentId
        );

      const averageData =
        await getStudentAverage(
          studentId
        );

      const gpaData =
        await getStudentGPA(
          studentId
        );

      setMarks(
        marksData || []
      );

      setAverage(
        averageData
      );

      setGpa(
        gpaData
      );

    } catch (err) {

      console.error(err);

      toast.error(
        "Failed to load report"
      );
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Student Marks Report
      </h1>

      {/* SEARCH */}

      <div className="flex gap-4 mb-6">

        <input
          type="number"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) =>
            setStudentId(
              e.target.value
            )
          }
          className="border rounded-lg px-4 py-2"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Load Report
        </button>

      </div>

      {/* STUDENT INFO */}

      {marks.length > 0 && (

        <div className="border rounded-lg p-4 mb-6 bg-white shadow-sm">

          <h2 className="text-xl font-semibold">

            Student:
            {" "}
            {marks[0].studentName}

          </h2>

        </div>

      )}

      {/* STATS */}

      {average !== null && (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          <div className="border rounded-lg p-4 bg-white shadow-sm">

            <h3 className="font-semibold text-gray-600">

              Average Marks

            </h3>

            <p className="text-3xl font-bold text-blue-600 mt-2">

              {average.toFixed(2)}

            </p>

          </div>

          <div className="border rounded-lg p-4 bg-white shadow-sm">

            <h3 className="font-semibold text-gray-600">

              GPA

            </h3>

            <p className="text-3xl font-bold text-green-600 mt-2">

              {gpa.toFixed(2)}

            </p>

          </div>

        </div>

      )}

      {/* MARKS TABLE */}

      <div className="overflow-x-auto">

        <table className="w-full border rounded-lg overflow-hidden">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-3 text-left">
                Subject
              </th>

              <th className="p-3 text-left">
                Course
              </th>

              <th className="p-3 text-left">
                Score
              </th>

              <th className="p-3 text-left">
                Grade
              </th>

            </tr>

          </thead>

          <tbody>

            {marks.map((mark) => (

              <tr
                key={mark.id}
                className="border-t"
              >

                <td className="p-3">
                  {mark.subject}
                </td>

                <td className="p-3">
                  {mark.courseName}
                </td>

                <td className="p-3">
                  {mark.score}
                </td>

                <td className="p-3">

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">

                    {mark.grade}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default StudentMarksReportPage;
