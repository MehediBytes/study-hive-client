import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthProvider";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import loginAnime from "../assets/login-cuate.png";

const LogIn = () => {
    const { login, googleLogin, showPassword, setShowPassword } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    // Firebase Email Login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast.success("Logged in successfully!");
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(
                error.message.includes("auth/user-not-found")
                    ? "User not found! Please register."
                    : "Invalid Email or Password!"
            );
        }
    };

    // Google Login with Axios
    const handleGoogleLogin = async () => {
        try {
            const result = await googleLogin();
            const user = result.user;

            // Save user info to MongoDB using Axios
            await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                role: "user",
            });

            // Show toast and navigate
            toast.success("Logged in with Google!");
            navigate(from, { replace: true });
        } catch (error) {
            toast.error("Google login failed!");
        }
    };

    return (
        <div className="pb-8 px-5">
            <Helmet>
                <title>Login | Study-Hive</title>
            </Helmet>
            <div className="md:flex md:justify-center md:items-center gap-20">
                <div className="w-full max-w-sm">
                    <img src={loginAnime} className="h-96 w-full" alt="" />
                </div>
                <div className="p-4 card bg-base-100 rounded-lg shadow-lg w-full max-w-sm border border-green-400">
                    <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Login</h2>
                    <hr className="border-green-400" />
                    <form onSubmit={handleLogin} className="space-y-6 mt-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Email</label>
                            <input
                                type="email"
                                className="input input-bordered w-full border-green-400 focus:ring focus:ring-blue-200 rounded-lg"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="relative">
                            <label className="block text-gray-700 font-medium mb-2">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="input input-bordered w-full border-green-400 focus:ring focus:ring-blue-200 rounded-lg pr-10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {/* Password Toggle Icon */}
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2/3 transform -translate-y-1/2 cursor-pointer"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <button
                            type="submit"
                            className="btn w-full bg-green-600 text-base-100 font-bold hover:bg-green-400"
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="btn w-full bg-base-100 text-green-600 border-green-400 hover:bg-green-200 flex items-center justify-center space-x-2"
                        >
                            <FaGoogle className="text-lg" />
                            <span>Login with Google</span>
                        </button>
                    </form>
                    <p className="text-sm mt-6 text-center">
                        Don't have an account?{" "}
                        <Link to="/auth/register" className="text-green-600 font-bold hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
