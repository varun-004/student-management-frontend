import useAuth from "../../auth/useAuth";

const Navbar = () => {

  const { user, logout } = useAuth();

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        Student Management System
      </h1>

      <div className="flex items-center gap-4">

        <span className="font-medium">
          {user?.name} ({user?.role})
        </span>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default Navbar;