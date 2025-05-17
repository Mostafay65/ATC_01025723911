import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) errors.push(` ${email} is not a valid email`);
    if (password.length < 8) errors.push(" Password must be at least 8 characters");
    setErrors(errors);

    if (errors.length === 0) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_HOST_URL}/auth/login`,
          {
            email,
            password,
          }
        );
        localStorage.setItem("Areeb-token", res.data.accessToken);
        navigate("/");
        window.location.reload();
      } catch (err) {
        console.log(err);
        setErrors([err.response.data.message]);
      }
    }
  };

  return (
    <section className="w-full max-w-md mx-auto my-30 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Log in Here</h2>
        </div>
        <div className="mb-4">
          {errors.map((error, index) => (
            <p key={index} className="text-red-500 text-sm mb-2">
              *{error}
            </p>
          ))}
        </div>
        <div className="space-y-4">
          <div className="relative">
            <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
          <p className="text-center text-gray-600">
            Don't have an account? <br />
            <Link to="/auth/signup" className="text-blue-600 hover:underline">
              SignUp Here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
