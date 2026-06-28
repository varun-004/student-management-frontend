import api from "../api/axios";

export const downloadStudentReport = async (studentId) => {

    const response = await api.get(

        `/api/report/student/${studentId}`,

        {
            responseType: "blob"
        }

    );

    return response.data;
};
