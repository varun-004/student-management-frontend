import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { registerUser } from "../../services/authService";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Select } from "../../components/ui";

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
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.12),_transparent_35%),linear-gradient(135deg,_#f8fafc,_#f0fdf4)] px-4 py-10">
      <Card className="w-full max-w-md border-slate-200/80 shadow-xl">
        <CardHeader className="px-8 pt-8">
          <CardTitle className="text-center text-2xl">Create account</CardTitle>
          <p className="text-center text-sm text-slate-500">Join the student management platform in a few quick steps.</p>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" required />
            <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" required />
            <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" required />
            <Select label="Role" name="role" value={formData.role} onChange={handleChange}>
              <option value="STUDENT">Student</option>
              <option value="ADMIN">Admin</option>
            </Select>
            <Button type="submit" className="w-full" loading={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;