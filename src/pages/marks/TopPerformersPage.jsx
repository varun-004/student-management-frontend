import { useEffect, useState } from "react";

import { getTopPerformers }
from "../../services/marksService";

const TopPerformersPage = () => {

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const loadData = async () => {

      try {

        const data =
          await getTopPerformers();

        setStudents(data);

      } catch (err) {

        console.error(err);

        setError(
          "Failed to load top performers"
        );

      } finally {

        setLoading(false);
      }
    };

    loadData();

  }, []);

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Top Performers
      </h1>

      {students.length === 0 ? (

        <div className="bg-white p-6 rounded-xl shadow">
          No data available
        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full border">

            <thead>

              <tr className="bg-gray-100">

                <th className="p-3">
                  Rank
                </th>

                <th className="p-3">
                  Student
                </th>

                <th className="p-3">
                  Average Marks
                </th>

              </tr>

            </thead>

            <tbody>

              {students.map(
                (student, index) => (

                  <tr
                    key={student.studentId}
                    className="border-t"
                  >

                    <td className="p-3">
                      #{index + 1}
                    </td>

                    <td className="p-3">
                      {student.studentName}
                    </td>

                    <td className="p-3">
                      {student.averageMarks.toFixed(
                        2
                      )}
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

export default TopPerformersPage;