import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../services/authService";
import toast from "react-hot-toast";


const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await registerUser(formData);

      toast.success(
  "Registration successful"
);

      navigate("/login");

    } catch (error) {

      console.log(error);

      toast.error(
  "Registration failed"
);


    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>

            <label className="block mb-1 font-medium">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />

          </div>

          <div>

            <label className="block mb-1 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />

          </div>

          <div>

            <label className="block mb-1 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />

          </div>

          <div>

            <label className="block mb-1 font-medium">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="STUDENT">
                Student
              </option>

              <option value="ADMIN">
                Admin
              </option>

            </select>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <p className="mt-4 text-center">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-blue-600 font-medium"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;