import api from "../api/axios";

/*
|--------------------------------------------------------------------------
| ADD MARKS
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| STUDENT MARKS
|--------------------------------------------------------------------------
*/

export const getStudentMarks =
  async (studentId) => {

    const response =
      await api.get(
        `/api/marks/student/${studentId}`
      );

    return response.data;
  };

/*
|--------------------------------------------------------------------------
| AVERAGE
|--------------------------------------------------------------------------
*/

export const getStudentAverage =
  async (studentId) => {

    const response =
      await api.get(
        `/api/marks/average/${studentId}`
      );

    return response.data;
  };

/*
|--------------------------------------------------------------------------
| GPA
|--------------------------------------------------------------------------
*/

export const getStudentGPA =
  async (studentId) => {

    const response =
      await api.get(
        `/api/marks/gpa/${studentId}`
      );

    return response.data;
  };