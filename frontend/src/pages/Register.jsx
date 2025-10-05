import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserPlus, User, Lock, Shield } from "lucide-react";

const API_BASE = "http://localhost:5000/api";

function Register() {
  const [form, setForm] = useState({ username: "", password: "", role: "player" });
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const validateUsername = (username) => {
    if (!username || username.length < 3 || username.length > 20) return "3-20 chars required";
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return "Only letters, numbers, _ allowed";
    return "";
  };

  const validatePassword = (password) => {
    if (!password || password.length < 6) return "Min 6 characters";
    if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) return "Must contain at least one letter and one number";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "username") setErrors({ ...errors, username: validateUsername(value) });
    if (name === "password") setErrors({ ...errors, password: validatePassword(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameError = validateUsername(form.username);
    const passwordError = validatePassword(form.password);

    if (usernameError || passwordError) {
      setErrors({ username: usernameError, password: passwordError });
      setMsg("❌ Fix validation errors");
      return;
    }

    setIsLoading(true);
    setMsg("");

    try {
      const res = await axios.post(`${API_BASE}/auth/register`, form);
      const { message, role } = res.data;

      setMsg("✅ " + message);
      setIsLoading(false);

      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/login");
        }
      }, 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed";
      setMsg("❌ " + errorMsg);
      setIsLoading(false);
    }
  };

  const isFormValid = () => form.username && form.password && !errors.username && !errors.password;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 font-mono">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-700/20 via-transparent to-transparent"></div>
      
      <div className="relative bg-slate-800/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-purple-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl"></div>
        
        <div className="relative">
          <div className="flex justify-center mb-6">
            <div className="bg-purple-600/20 p-4 rounded-full border-2 border-purple-500/30">
              <UserPlus className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider">
            REGISTER
          </h1>
          <p className="text-center text-slate-400 mb-8 text-sm">Create your account</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username (3-20 chars)"
                  value={form.username}
                  onChange={handleChange}
                  className={`w-full bg-slate-900/50 border rounded-lg p-3 pl-11 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.username 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-slate-700 focus:border-purple-500 focus:ring-purple-500/20"
                  }`}
                />
              </div>
              {errors.username && (
                <p className="text-red-400 text-xs mt-2 ml-1">{errors.username}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password (min 6 chars)"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full bg-slate-900/50 border rounded-lg p-3 pl-11 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.password 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-slate-700 focus:border-purple-500 focus:ring-purple-500/20"
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-2 ml-1">{errors.password}</p>
              )}
            </div>

            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10">
                <Shield className="w-5 h-5" />
              </div>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 pl-11 text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none cursor-pointer"
              >
                <option value="player" className="bg-slate-800">🎮 Player</option>
                <option value="admin" className="bg-slate-800">👑 Admin</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid() || isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg font-bold tracking-wider hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? "CREATING..." : "CREATE ACCOUNT"}
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
              Already have an account?{" "}
              <span 
                className="text-purple-400 cursor-pointer hover:text-purple-300 font-semibold hover:underline transition-colors" 
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;