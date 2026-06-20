import { Outlet } from "react-router-dom";
import TeacherSidebar from "../components/teacher/TeacherSidebar";

function TeacherLayout() {
    return (
        <div className="flex">
            <TeacherSidebar />

            <main className="flex-1 p-4">
                <Outlet />
            </main>
        </div>
    );
}

export default TeacherLayout;