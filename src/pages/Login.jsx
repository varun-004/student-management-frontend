import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data
            );

            alert("Login Successful");

            console.log(response.data);

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            if (error.response) {

                console.log(error.response.data);

                alert(
                    error.response.data.message
                    || "Login Failed"
                );

            } else {

                alert("Backend connection error");
            }
        }
    };

    return (

        <div style={{ padding: "20px" }}>

            <h2>Login Page</h2>

            <form onSubmit={handleLogin}>

                <div>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                </div>

                <br />

                <div>

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                </div>

                <br />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;