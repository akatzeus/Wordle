import React, { useState } from "react";
import { startGame, guessWord } from "../utils/api";
import Tile from "../components/Tile";
import { useNavigate } from "react-router-dom";
import { Play, LogOut, Zap, CheckCircle, List, Info } from "lucide-react";

function Game() {
  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleStart = async () => {
    setIsLoading(true);
    try {
      const res = await startGame(token);
      setGuesses([]);
      setMsg(res.data.message || "🎮 Game started! Guess a 5-letter word.");
      setGameStarted(true);
      setGameCompleted(false);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "❌ Failed to start game. Please try again.";
      setMsg(errorMsg);
      if (err.response?.status === 403) {
        setGameStarted(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuess = async () => {
    if (input.length !== 5) {
      setMsg("⚠️ Please enter exactly 5 letters!");
      return;
    }
    
    setIsLoading(true);
    try {
      console.log("Sending guess:", input);
      const res = await guessWord(input);
      console.log("Guess response:", res.data);
      
      const newGuess = { word: input, colors: res.data.colors };
      setGuesses(prev => [...prev, newGuess]);
      setMsg(res.data.message);
      setInput("");
      
      if (res.data.win || res.data.remaining_attempts === 0) {
        setGameCompleted(true);
      }
    } catch (err) {
      console.error("Guess error:", err);
      console.error("Error response:", err.response);
      
      const errorMsg = err.response?.data?.message || "❌ Invalid guess. Try again!";
      setMsg(errorMsg);
      
      if (err.response?.status === 400) {
        setGameStarted(false);
        setGuesses([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && input.length === 5 && gameStarted && !gameCompleted) {
      handleGuess();
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
      <div className="relative max-w-4xl mx-auto mb-8">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-purple-500/20">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider">
                  WORDLE
                </h1>
                <p className="text-slate-400 text-sm">Guess the 5-letter word!</p>
              </div>
            </div>
            
            {/* Logout Button */}
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

      {/* Main Game Area */}
      <div className="relative max-w-4xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-purple-500/20">
          {/* Start Game Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleStart}
              disabled={isLoading || (gameStarted && !gameCompleted)}
              className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isLoading ? (
                  <>
                    <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full"></div>
                    STARTING...
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6" fill="currentColor" />
                    {gameStarted && !gameCompleted ? "GAME IN PROGRESS" : "START GAME"}
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Message Display */}
          {msg && (
            <div className={`mb-6 p-4 rounded-xl text-center font-semibold border ${
              msg.includes('✅') || msg.includes('🎉') || msg.includes('🎮') || msg.includes('Congratulations')
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : msg.includes('❌') || msg.includes('Failed') || msg.includes('Game over')
                ? 'bg-red-500/10 text-red-400 border-red-500/30'
                : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
            }`}>
              {msg}
            </div>
          )}

          {/* Input Area */}
          {gameStarted && !gameCompleted && (
            <div className="mb-8 space-y-4">
              <div className="flex justify-center">
                <input
                  type="text"
                  maxLength="5"
                  value={input}
                  onChange={(e) => setInput(e.target.value.toUpperCase())}
                  onKeyPress={handleKeyPress}
                  placeholder="TYPE HERE"
                  className="w-80 px-6 py-4 text-center text-3xl font-bold uppercase bg-slate-900/50 border-2 border-slate-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 tracking-widest text-slate-200 placeholder-slate-600"
                  disabled={isLoading}
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleGuess}
                  disabled={isLoading || input.length !== 5}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      CHECKING...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      SUBMIT GUESS
                    </>
                  )}
                </button>
              </div>
              <p className="text-center text-slate-400 text-sm">
                Press <kbd className="px-2 py-1 bg-slate-700 rounded font-mono text-xs border border-slate-600">Enter</kbd> to submit
              </p>
            </div>
          )}

          {/* Guesses Display */}
          {guesses.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-200 flex items-center gap-2">
                  <List className="w-6 h-6 text-purple-400" />
                  YOUR GUESSES ({guesses.length})
                </h3>
                {gameCompleted && (
                  <button
                    onClick={handleStart}
                    className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-lg text-sm hover:bg-emerald-500/30 transition-colors font-semibold"
                  >
                    PLAY AGAIN
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {guesses.map((g, i) => (
                  <div key={i} className="flex justify-center gap-2">
                    {g.word.split("").map((ch, j) => (
                      <Tile key={j} letter={ch} color={g.colors[j]} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!gameStarted && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-purple-500/30">
                <Zap className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-200 mb-2">READY TO PLAY?</h3>
              <p className="text-slate-400">Click "START GAME" to begin your word guessing adventure!</p>
            </div>
          )}
        </div>

        {/* Game Instructions */}
        <div className="relative mt-6 bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-purple-500/20">
          <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-purple-400" />
            HOW TO PLAY
          </h3>
          <ul className="space-y-3 text-slate-300 text-sm">
            <li className="flex items-start gap-3">
              <span className="text-emerald-400 font-bold text-lg">●</span>
              <span><strong className="text-emerald-400">Green:</strong> Letter is correct and in the right position</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-400 font-bold text-lg">●</span>
              <span><strong className="text-orange-400">Orange:</strong> Letter is in the word but wrong position</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-slate-500 font-bold text-lg">●</span>
              <span><strong className="text-slate-400">Gray:</strong> Letter is not in the word</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Game;