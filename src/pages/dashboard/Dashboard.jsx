import {
  useEffect,
  useState
} from "react";

import {
  getDashboardStats
} from "../../services/dashboardService";

function Dashboard() {

  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const loadStats =
      async () => {

        try {

          const data =
            await getDashboardStats();

          setStats(data);

        } catch (error) {

          console.error(error);

        } finally {

          setLoading(false);

        }
      };

    loadStats();

  }, []);

  if (loading) {

    return (
      <div className="p-6">
        Loading Dashboard...
      </div>
    );
  }

  return (

    <div className="p-6">

      <h1
        className="
          text-3xl
          font-bold
          mb-8
        "
      >
        Dashboard
      </h1>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
        "
      >

        {/* Students */}

        <div
          className="
            bg-white
            shadow
            rounded-xl
            p-6
          "
        >

          <h3
            className="
              text-gray-500
              font-medium
            "
          >
            Total Students
          </h3>

          <p
            className="
              text-4xl
              font-bold
              mt-3
            "
          >
            {stats.totalStudents}
          </p>

        </div>

        {/* Teachers */}

        <div
          className="
            bg-white
            shadow
            rounded-xl
            p-6
          "
        >

          <h3
            className="
              text-gray-500
              font-medium
            "
          >
            Total Teachers
          </h3>

          <p
            className="
              text-4xl
              font-bold
              mt-3
            "
          >
            {stats.totalTeachers}
          </p>

        </div>

        {/* Courses */}

        <div
          className="
            bg-white
            shadow
            rounded-xl
            p-6
          "
        >

          <h3
            className="
              text-gray-500
              font-medium
            "
          >
            Total Courses
          </h3>

          <p
            className="
              text-4xl
              font-bold
              mt-3
            "
          >
            {stats.totalCourses}
          </p>

        </div>

        {/* Enrollments */}

        <div
          className="
            bg-white
            shadow
            rounded-xl
            p-6
          "
        >

          <h3
            className="
              text-gray-500
              font-medium
            "
          >
            Total Enrollments
          </h3>

          <p
            className="
              text-4xl
              font-bold
              mt-3
            "
          >
            {stats.totalEnrollments}
          </p>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;