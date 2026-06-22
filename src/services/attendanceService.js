import api from "../api/axios";

/*
|--------------------------------------------------------------------------
| MARK ATTENDANCE
|--------------------------------------------------------------------------
*/

export const markAttendance =
  async (attendanceData) => {

    const response =
      await api.post(
        "/api/attendance",
        attendanceData
      );

    return response.data;
  };

/*
|--------------------------------------------------------------------------
| GET COURSE ATTENDANCE
|--------------------------------------------------------------------------
*/

export const getAttendanceByCourse =
  async (courseId) => {

    const response =
      await api.get(
        `/api/attendance/course/${courseId}`
      );

    return response.data;
  };

/*
|--------------------------------------------------------------------------
| GET STUDENT ATTENDANCE
|--------------------------------------------------------------------------
*/

export const getAttendanceByStudent =
  async (studentId) => {

    const response =
      await api.get(
        `/api/attendance/student/${studentId}`
      );

    return response.data;
  };

export const getAttendancePercentage =
  async (studentId) => {

    const response =
      await api.get(
        `/api/attendance/percentage/${studentId}`
      );

    return response.data;
  };

  export const getCourseWiseAttendance =
  async (studentId) => {

    const response =
      await api.get(
        `/api/attendance/student/${studentId}/course-wise`
      );

    return response.data;
};