import api from "../api/axios";

export const getAllStudents =
  async () => {

    const response =
      await api.get("/students");

    return response.data;
  };



export const getStudentByEmail =
  async (email) => {

    const response =
      await api.get(
        `/students/email/${email}`
      );

    return response.data;
};