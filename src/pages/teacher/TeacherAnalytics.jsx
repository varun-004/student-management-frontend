import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import {
  getCourseAnalytics
}
from "../../services/teacherService";

function TeacherAnalytics() {

  const { courseId } =
    useParams();

  const [analytics,
         setAnalytics] =
         useState(null);

  const [loading,
         setLoading] =
         useState(true);

  useEffect(() => {

    const loadAnalytics =
      async () => {

        try {

          const data =
            await getCourseAnalytics(
              courseId
            );

          setAnalytics(data);

        } catch (error) {

          console.error(error);

        } finally {

          setLoading(false);

        }
      };

    loadAnalytics();

  }, [courseId]);

  if (loading) {

    return (
      <h2>
        Loading Analytics...
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
        Course Analytics
      </h1>

      <div
        className="
          grid
          md:grid-cols-3
          gap-6
        "
      >

        <div
          className="
            bg-white
            p-6
            rounded-xl
            shadow
          "
        >
          <h3>
            Students
          </h3>

          <p
            className="
              text-3xl
              font-bold
            "
          >
            {
              analytics.studentCount
            }
          </p>
        </div>

        <div
          className="
            bg-white
            p-6
            rounded-xl
            shadow
          "
        >
          <h3>
            Average Marks
          </h3>

          <p
            className="
              text-3xl
              font-bold
            "
          >
            {
              analytics.averageMarks?.toFixed(2)
            }
          </p>
        </div>

        <div
          className="
            bg-white
            p-6
            rounded-xl
            shadow
          "
        >
          <h3>
            Attendance
          </h3>

          <p
            className="
              text-3xl
              font-bold
            "
          >
            {
              analytics.attendancePercentage?.toFixed(2)
            }%
          </p>
        </div>

      </div>

    </div>
  );
}

export default TeacherAnalytics;