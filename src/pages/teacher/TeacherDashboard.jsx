import { useEffect, useState } from "react";

import {
  getTeacherByEmail,
  getTeacherDashboard
} from "../../services/teacherService";

function TeacherDashboard() {

  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const loadDashboard =
      async () => {

        try {

          const user =
            JSON.parse(
              localStorage.getItem("user")
            );

          const teacher =
            await getTeacherByEmail(
              user.email
            );

          const data =
            await getTeacherDashboard(
              teacher.id
            );

          setStats(data);

        } catch (error) {

          console.error(error);

        } finally {

          setLoading(false);

        }
      };

    loadDashboard();

  }, []);

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
        Teacher Dashboard
      </h1>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        "
      >

        <DashboardCard
          title="My Courses"
          value={stats.totalCourses}
        />

        <DashboardCard
          title="My Students"
          value={stats.totalStudents}
        />

        <DashboardCard
          title="Attendance Records"
          value={stats.totalAttendanceRecords}
        />

        <DashboardCard
          title="Marks Records"
          value={stats.totalMarksRecords}
        />

      </div>

    </div>

  );
}

function DashboardCard({
  title,
  value
}) {

  return (

    <div
      className="
        bg-white
        shadow
        rounded-xl
        p-6
      "
    >

      <h2
        className="
          text-gray-500
        "
      >
        {title}
      </h2>

      <p
        className="
          text-4xl
          font-bold
          mt-3
        "
      >
        {value}
      </p>

    </div>

  );
}

export default TeacherDashboard;