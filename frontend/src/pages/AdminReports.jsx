import React, { useState } from "react";
import { getDailyReport, getUserReport } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { BarChart3, LogOut, Calendar, User, FileText, CheckCircle, X } from "lucide-react";

function AdminReports() {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [username, setUsername] = useState("");
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("daily");

  const fetchDay = async () => {
    if (!date) {
      setError("Please select a date");
      return;
    }
    setIsLoading(true);
    setError("");
    setReport(null);
    try {
      const res = await getDailyReport(date);
      setReport(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch daily report");
      console.error("Daily report error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUser = async () => {
    if (!username) {
      setError("Please enter a username");
      return;
    }
    setIsLoading(true);
    setError("");
    setReport(null);
    try {
      const res = await getUserReport(username);
      setReport(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch user report");
      console.error("User report error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 font-mono">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-700/20 via-transparent to-transparent"></div>
      
      {/* Header */}
      <div className="relative max-w-6xl mx-auto mb-8">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-purple-500/20">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider">
                  ADMIN REPORTS
                </h1>
                <p className="text-slate-400 text-sm">View and analyze game statistics</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 border border-red-500/30 transition-all duration-300 font-semibold"
            >
              <LogOut className="w-5 h-5" />
              LOGOUT
            </button>
          </div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Tab Navigation */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-purple-500/20">
          <div className="flex border-b border-slate-700">
            <button
              onClick={() => {
                setActiveTab("daily");
                setReport(null);
                setError("");
              }}
              className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "daily"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-700/50"
              }`}
            >
              <Calendar className="w-5 h-5" />
              DAILY REPORT
            </button>
            <button
              onClick={() => {
                setActiveTab("user");
                setReport(null);
                setError("");
              }}
              className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "user"
                  ? "bg-gradient-to-r from-blue-600 to-pink-600 text-white"
                  : "text-slate-400 hover:bg-slate-700/50"
              }`}
            >
              <User className="w-5 h-5" />
              USER REPORT
            </button>
          </div>

          {/* Content Area */}
          <div className="p-8">
            {activeTab === "daily" ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    SELECT DATE
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    />
                  </div>
                </div>
                <button
                  onClick={fetchDay}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      LOADING...
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5" />
                      FETCH DAILY REPORT
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    ENTER USERNAME
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
                    />
                  </div>
                </div>
                <button
                  onClick={fetchUser}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-pink-600 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      LOADING...
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5" />
                      FETCH USER REPORT
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
                <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-red-400">ERROR</p>
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Report Display */}
            {report && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-200 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                    REPORT RESULTS
                  </h3>
                  <button
                    onClick={() => setReport(null)}
                    className="text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 overflow-x-auto">
                  <pre className="text-sm text-emerald-400 font-mono whitespace-pre-wrap">
                    {JSON.stringify(report, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminReports;