import React from "react";
import { useNavigate } from "react-router-dom";
import { Play, Zap, Target, Trophy, Users, ArrowRight } from "lucide-react";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 font-mono overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-700/20 via-transparent to-transparent"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider">
              WORDLE
            </span>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2.5 text-slate-300 hover:text-white font-semibold transition-colors"
            >
              LOGIN
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/30 transition-all transform hover:scale-105"
            >
              SIGN UP
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent tracking-wider animate-pulse">
            WORDLE
          </h1>
          <p className="text-2xl md:text-3xl text-slate-300 mb-4">
            The Ultimate Word Guessing Challenge
          </p>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            Test your vocabulary and deduction skills. Guess the 5-letter word in 6 attempts or less.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate("/game")}
              className="group px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/60 transition-all transform hover:scale-105 flex items-center gap-3"
            >
              <Play className="w-6 h-6" fill="currentColor" />
              PLAY NOW
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-10 py-4 bg-slate-800/50 backdrop-blur-xl border-2 border-purple-500/30 text-slate-200 rounded-xl font-bold text-lg hover:bg-slate-700/50 transition-all"
            >
              CREATE ACCOUNT
            </button>
          </div>
        </div>

        {/* Demo Tiles */}
        <div className="flex justify-center gap-2 mb-20">
          <div className="w-16 h-16 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            W
          </div>
          <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            O
          </div>
          <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            R
          </div>
          <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            L
          </div>
          <div className="w-16 h-16 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            D
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4 border border-purple-500/30">
              <Target className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-200 mb-2">DAILY CHALLENGE</h3>
            <p className="text-slate-400">
              New word every day. Test your skills and compete with players worldwide.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="w-12 h-12 bg-pink-600/20 rounded-lg flex items-center justify-center mb-4 border border-pink-500/30">
              <Trophy className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-200 mb-2">TRACK PROGRESS</h3>
            <p className="text-slate-400">
              Monitor your wins, streaks, and improve your word-guessing strategy.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4 border border-blue-500/30">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-200 mb-2">COMMUNITY</h3>
            <p className="text-slate-400">
              Join thousands of players in the ultimate word puzzle experience.
            </p>
          </div>
        </div>

        {/* How to Play */}
        <div className="mt-20 max-w-3xl mx-auto bg-slate-800/50 backdrop-blur-xl p-8 rounded-2xl border border-purple-500/20">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            HOW TO PLAY
          </h2>
          <div className="space-y-4 text-slate-300">
            <div className="flex items-start gap-3">
              <span className="text-emerald-400 font-bold text-xl">●</span>
              <p><strong className="text-emerald-400">Green:</strong> Letter is correct and in the right position</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-orange-400 font-bold text-xl">●</span>
              <p><strong className="text-orange-400">Orange:</strong> Letter is in the word but wrong position</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-slate-500 font-bold text-xl">●</span>
              <p><strong className="text-slate-400">Gray:</strong> Letter is not in the word</p>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-center text-slate-400">
                You have 6 attempts to guess the correct 5-letter word. Good luck!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-center text-slate-500 text-sm">
            © 2025 WORDLE. Challenge your mind, one word at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;