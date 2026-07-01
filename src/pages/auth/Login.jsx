import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../../services/authService";
import useAuth from "../../auth/useAuth";
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from "../../components/ui";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await loginUser(formData);

      login(response.token, {
        email: response.email,
        role: response.role,
      });

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_35%),linear-gradient(135deg,_#f8fafc,_#eef2ff)] px-4 py-10">
      <Card className="w-full max-w-md border-slate-200/80 shadow-xl">
        <CardHeader className="px-8 pt-8">
          <CardTitle className="text-center text-2xl">Welcome back</CardTitle>
          <p className="text-center text-sm text-slate-500">Sign in to continue managing your school workspace.</p>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" required />
            <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" required />
            <Button type="submit" className="w-full" loading={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
