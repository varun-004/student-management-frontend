import { useState,useEffect } from "react";

import { getDashboardAnalytics } from "../../services/analyticsService";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";

// import TopCoursesChart
// from "../../components/analytics/TopCoursesChart";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | LOAD DASHBOARD
  |--------------------------------------------------------------------------
  */

 const loadDashboard = async () => {
  try {
    setLoading(true);


    const data = await getDashboardAnalytics();


    setDashboardData(data);

    setError("");

  } catch (err) {

    console.error("Dashboard Error:", err);

    setError("Failed to load dashboard");

  } finally {

    setLoading(false);

  }
};

  useEffect(() => {

  const fetchDashboard = async () => {

    try {

      const data =
        await getDashboardAnalytics();

      setDashboardData(data);

    } catch (err) {

      console.error(err);

      setError(
        "Failed to load dashboard"
      );

    } finally {

      setLoading(false);

    }
  };

  fetchDashboard();

}, []);

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
          Dashboard
        </h1>

        <button
          onClick={loadDashboard}
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-4
            py-2
            rounded-lg
          "
        >
          Refresh Dashboard
        </button>
      </div>

      {/* SUMMARY CARDS */}

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        gap-6
      "
      >
        {/* TOTAL STUDENTS */}

        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">
            Total Students
          </h3>

          <p className="text-3xl font-bold">
            {dashboardData?.totalStudents || 0}
          </p>
        </div>

        {/* ATTENDANCE */}

        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">
            Average Attendance
          </h3>

          <p className="text-3xl font-bold">
            {dashboardData?.averageAttendance?.toFixed(
              2
            ) || "0.00"}
            %
          </p>
        </div>

        {/* MARKS */}

        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">
            Average Marks
          </h3>

          <p className="text-3xl font-bold">
            {dashboardData?.averageMarks?.toFixed(
              2
            ) || "0.00"}
          </p>
        </div>

        {/* TOP COURSE */}

        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">
            Top Course
          </h3>

          <p className="text-xl font-bold">
            {dashboardData?.topCourses?.[0]
              ?.courseName || "N/A"}
          </p>
        </div>
      </div>

      {/* TOP COURSES */}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">
          Top Courses
        </h2>

        <div className="bg-white shadow rounded-xl p-5">
          {dashboardData?.topCourses?.length >
          0 ? (
            dashboardData.topCourses.map(
              (course, index) => (
                <div
                  key={index}
                  className="
                    flex
                    justify-between
                    border-b
                    py-3
                  "
                >
                  <span>
                    {course.courseName}
                  </span>

                  <span>
                    {course.totalStudents} Students
                  </span>
                </div>
              )
            )
          ) : (
            <p className="text-gray-500">
              No course analytics
              available.
            </p>
          )}
        </div>
{/* 
        <TopCoursesChart
  courses={
    dashboardData?.topCourses || []
  }
/> */}
      </div>
    </div>
  );
};

export default Dashboard;