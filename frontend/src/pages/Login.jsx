import React, { useState } from "react";
import { loginUser, setAuthToken } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg("");

    try {
      console.log("Attempting login with:", form);
      const response = await loginUser(form);
      console.log("Login response:", response.data);

      const { token, role } = response.data;

      if (!token) {
        throw new Error("No token received from server");
      }

      setAuthToken(token);
      console.log("Token stored in localStorage");

      setMsg("✅ Login successful! Redirecting...");

      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/game");
        }
      }, 1500);
    } catch (err) {
      console.error("Login error:", err);
      const errorMsg = err.response?.data?.message || err.message || "Login failed";
      setMsg("❌ " + errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 font-mono">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-700/20 via-transparent to-transparent"></div>
      
      <div className="relative bg-slate-800/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-purple-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl"></div>
        
        <div className="relative">
          <div className="flex justify-center mb-6">
            <div className="bg-purple-600/20 p-4 rounded-full border-2 border-purple-500/30">
              <Lock className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider">
            LOGIN
          </h1>
          <p className="text-center text-slate-400 mb-8 text-sm">Access your account</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 pl-11 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                required
              />
            </div>
            
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 pl-11 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg font-bold tracking-wider hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? "LOGGING IN..." : "LOGIN"}
            </button>
          </form>

          {msg && (
            <div className={`mt-5 text-center p-3 rounded-lg border ${
              msg.includes("✅") 
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                : "bg-red-500/10 text-red-400 border-red-500/30"
            }`}>
              {msg}
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm">
              Don't have an account?{" "}
              <span 
                className="text-purple-400 cursor-pointer hover:text-purple-300 font-semibold hover:underline transition-colors" 
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;