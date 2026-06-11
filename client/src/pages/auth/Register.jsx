import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import { useNavigate,Link } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const register = async (e) => {
    e.preventDefault();

    if (!name.trim()) return toast.error("Name is required");
    if (!email.trim()) return toast.error("Email is required");
    if (!password.trim()) return toast.error("Password is required");

    try {
      setLoading(true);

      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success(data.message);

      setName("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 px-4">
      <form
        onSubmit={register}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h1>

        <p className="text-center text-gray-500 text-sm">
          Register to continue
        </p>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#6C63FF]"
        />

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
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#6C63FF]"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[#6C63FF] text-white py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
        <p>
          Already having an Account?
           <Link to={"/login"} className="text-[#7A72FF] underline">
            Login
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Register;
