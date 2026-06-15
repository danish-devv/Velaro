import { useState,useContext } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext"
const Login = () => {
  const {login}=useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) return toast.error("Email is required");
    if (!password.trim()) return toast.error("Password is required");

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      toast.success(response.data.message);
      login(response.data.user,response.data.token)
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-auto mt-10 bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Login Account
        </h1>

        <p className="text-center text-gray-500 text-sm">Login to continue</p>

        <input
          disabled={loading}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#6C63FF]"
        />

        <input
          disabled={loading}
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#6C63FF]"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[#6C63FF] text-white py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Logging In..." : "Log In"}
        </button>
        <p>
          Not having a Account?{" "}
          <Link to={"/register"} className="text-[#7A72FF] underline">
            Register
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
