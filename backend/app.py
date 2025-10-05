# backend/app.py
from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth_bp
from routes.game_routes import game_bp
from routes.admin_routes import admin_bp

app = Flask(__name__)

# ✅ Enable CORS only for React frontend
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Register blueprints
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(game_bp, url_prefix="/api/game")
app.register_blueprint(admin_bp, url_prefix="/api/admin")


@app.route("/")
def home():
    return {"message": "Wordle API is running!"}, 200

@app.route("/health")
def health():
    return {"status": "healthy"}, 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)
