import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";

import Unauthorized from "../pages/Unauthorized";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "../auth/ProtectedRoute";
import RoleProtectedRoute from "../auth/RoleProtectedRoute";

import DashboardLayout from "../layouts/DashboardLayout";

import CoursesPage from "../pages/courses/CoursesPage";
import CourseDetailsPage from "../pages/courses/CourseDetailsPage";

import AttendanceMarkPage from "../pages/attendance/AttendanceMarkPage";
import AttendanceHistoryPage from "../pages/attendance/AttendanceHistoryPage";
import AttendanceReportPage from "../pages/attendance/AttendanceReportPage";

import MarksEntryPage from "../pages/marks/MarksEntryPage";
import StudentMarksReportPage from "../pages/marks/StudentMarksReportPage.jsx";
import TopPerformersPage from "../pages/marks/TopPerformersPage";

import StudentRiskPage from "../pages/analytics/StudentRiskPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* PROTECTED ROUTES */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* COURSES */}

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CoursesPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CourseDetailsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                <DashboardLayout>
                  <h1 className="text-3xl font-bold">Admin Page</h1>
                </DashboardLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance/mark"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AttendanceMarkPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance/history"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AttendanceHistoryPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance/report"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AttendanceReportPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/marks/entry"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <MarksEntryPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/marks/report"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <StudentMarksReportPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/marks/top-performers"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <TopPerformersPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics/risk"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <StudentRiskPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        {/* ERROR ROUTES */}

        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* DEFAULT REDIRECT */}

        <Route path="/" element={<Navigate to="/login" />} />

        {/* 404 */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
