import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";

import Unauthorized from "../pages/Unauthorized";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "../auth/ProtectedRoute";
import RoleProtectedRoute from "../auth/RoleProtectedRoute";

import DashboardLayout from "../layouts/DashboardLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />



        {/* Protected Routes */}

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



        {/* Admin Routes */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                <DashboardLayout>
                  <h1 className="text-3xl font-bold">
                    Admin Page
                  </h1>
                </DashboardLayout>
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />



        {/* Error Routes */}

        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />



        {/* Default Redirect */}

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />



        {/* 404 */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;