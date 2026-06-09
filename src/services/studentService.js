import api from "../api/axios";

export const getAllStudents =
  async () => {

    const response =
      await api.get("/students");

    return response.data;
  };
