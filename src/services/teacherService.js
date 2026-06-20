import api from "../api/axios";

export const getTeacherByEmail = async (
  email
) => {

  const response =
    await api.get(
      `/api/teachers/email/${email}`
    );

  return response.data;
};

export const getTeacherCourses = async (
  teacherId
) => {

  const response =
    await api.get(
      `/api/courses/teacher/${teacherId}`
    );

  return response.data;
};


export const getCourseStudents =
  async (courseId) => {

    const response =
      await api.get(
        `/api/courses/${courseId}/students`
      );

    return response.data;
};


export const markAttendance =
  async (attendanceData) => {

    const response =
      await api.post(
        "/api/attendance",
        attendanceData
      );

    return response.data;
};


export const addMarks = async (
  marksData
) => {

  const response =
    await api.post(
      "/api/marks",
      marksData
    );

  return response.data;
};

export const getCourseAnalytics =
  async (courseId) => {

    const response =
      await api.get(
        `/api/teachers/course/${courseId}/analytics`
      );

    return response.data;
};