# Wordle

A full-stack Wordle-inspired web game with admin reporting functionality. Built with **Python Flask** for the backend and **React.js** for the frontend, using **MongoDB** as the database.

---

## Features

### Player Users
- Register and login with a username and password
- Play the Wordle-style guessing game
- Maximum of 3 words per day per user
- 5 guesses per word
- Color-coded feedback:
  - **Green**: Correct letter in the correct position
  - **Orange**: Correct letter in wrong position
  - **Gray**: Letter not in the word
- Game history is saved in the database

### Admin Users
- View daily reports:
  - Total users
  - Correct guesses
  - Detailed game history
- View individual user reports:
  - Games played per date
  - Correct guesses
  - Accuracy percentage

---

## Tech Stack

- **Frontend:** React.js, Axios, TailwindCSS, lucide-react icons
- **Backend:** Python Flask, Flask-CORS
- **Database:** MongoDB
- **Version Control:** Git / GitHub

---



