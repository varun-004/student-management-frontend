import useAuth from "../../auth/useAuth";

const Navbar = () => {

  const { user, logout } = useAuth();

  const getRoleBadge = (role) => {

    switch (role) {

      case "ADMIN":
        return "bg-green-100 text-green-700";

      case "STUDENT":
        return "bg-blue-100 text-blue-700";

      case "TEACHER":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div
      className="
        bg-white
        shadow
        px-6
        py-4
        flex
        justify-between
        items-center
      "
    >

      {/* APP TITLE */}

      <div>
        <h1 className="text-2xl font-bold">
          Student Management System
        </h1>

        <p className="text-sm text-gray-500">
          Dashboard Portal
        </p>
      </div>

      {/* USER INFO */}

      <div className="flex items-center gap-4">

        <div className="text-right">

          <p className="font-semibold">
            {user?.email || "User"}
          </p>

          <span
            className={`
              px-3
              py-1
              rounded-full
              text-xs
              font-semibold
              ${getRoleBadge(user?.role)}
            `}
          >
            {user?.role}
          </span>

        </div>

        <button
          onClick={logout}
          className="
            bg-red-500
            hover:bg-red-600
            text-white
            px-4
            py-2
            rounded-lg
            transition
          "
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default Navbar;