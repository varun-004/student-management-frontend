import { useState, useEffect } from "react";

import {
  getStudentMarks,
  getStudentAverage,
  getStudentGPA,
} from "../../services/marksService";

import {
  getStudentByEmail
} from "../../services/studentService";

import {
  downloadStudentReport
} from "../../services/reportService";

const StudentMarksReportPage = () => {
  const [marks, setMarks] = useState([]);

  const [average, setAverage] = useState(null);

  const [gpa, setGpa] = useState(null);

  const [loading, setLoading] = useState(true);

  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    const loadMarks = async () => {
      try {
        const user = JSON.parse(
  localStorage.getItem("user")
);

const student =
  await getStudentByEmail(
    user.email
  );

setStudentId(student.id);

const marksData =
  await getStudentMarks(
    student.id
  );

const averageData =
  await getStudentAverage(
    student.id
  );

const gpaData =
  await getStudentGPA(
    student.id
  );

        setMarks(marksData || []);

        setAverage(averageData);

        setGpa(gpaData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadMarks();
  }, []);

  const handleDownloadReport = async () => {
    try {
      const pdf = await downloadStudentReport(studentId);

      const url = window.URL.createObjectURL(new Blob([pdf]));

      const link = document.createElement("a");

      link.href = url;

      link.download = "Student_Report.pdf";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);

      alert("Failed to download report.");
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
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
        My Marks
      </h1>

      <div className="mb-6">
        <button
          onClick={handleDownloadReport}
          className="
      bg-blue-600
      hover:bg-blue-700
      text-white
      px-5
      py-2
      rounded-lg
    "
        >
          Download Report Card PDF
        </button>
      </div>

      {marks.length > 0 && (
        <div
          className="
            border
            rounded-lg
            p-4
            mb-6
            bg-white
            shadow-sm
          "
        >
          <h2
            className="
              text-xl
              font-semibold
            "
          >
            Student: {marks[0].studentName}
          </h2>
        </div>
      )}

      {average !== null && (
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-4
            mb-6
          "
        >
          <div
            className="
              border
              rounded-lg
              p-4
              bg-white
              shadow-sm
            "
          >
            <h3
              className="
                font-semibold
                text-gray-600
              "
            >
              Average Marks
            </h3>

            <p
              className="
                text-3xl
                font-bold
                text-blue-600
                mt-2
              "
            >
              {average.toFixed(2)}
            </p>
          </div>

          <div
            className="
              border
              rounded-lg
              p-4
              bg-white
              shadow-sm
            "
          >
            <h3
              className="
                font-semibold
                text-gray-600
              "
            >
              GPA
            </h3>

            <p
              className="
                text-3xl
                font-bold
                text-green-600
                mt-2
              "
            >
              {gpa.toFixed(2)}
            </p>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table
          className="
            w-full
            border
            rounded-lg
            overflow-hidden
          "
        >
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Subject</th>

              <th className="p-3 text-left">Course</th>

              <th className="p-3 text-left">Score</th>

              <th className="p-3 text-left">Grade</th>
            </tr>
          </thead>

          <tbody>
            {marks.map((mark) => (
              <tr key={mark.id} className="border-t">
                <td className="p-3">{mark.subject}</td>

                <td className="p-3">{mark.courseName}</td>

                <td className="p-3">{mark.score}</td>

                <td className="p-3">
                  <span
                    className="
                      px-3
                      py-1
                      rounded-full
                      bg-green-100
                      text-green-700
                      text-sm
                    "
                  >
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
