import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;