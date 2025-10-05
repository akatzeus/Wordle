# backend/controllers/admin_controller.py
from datetime import datetime
from models.game_model import find_games_by_date, find_games_by_username

def day_report(date_str):
    """
    Generate a daily report for all games played on a specific date.
    Returns: (response_dict, status_code)
    """
    try:
        # Validate date format
        datetime.strptime(date_str, "%Y-%m-%d")
        
        # Get all games for that date
        games_list = find_games_by_date(date_str)
        
        if not games_list:
            return {
                "message": "No games found for this date", 
                "date": date_str, 
                "total_games": 0
            }, 200
        
        # Extract unique usernames - handle dict case
        usernames = []
        for g in games_list:
            username = g.get("username")
            if username:
                # If username is a dict, convert to string representation
                if isinstance(username, dict):
                    # Try to get the actual username string from the dict
                    username_str = username.get("username") or username.get("name") or str(username)
                    usernames.append(username_str)
                else:
                    usernames.append(str(username))
        
        # Get unique count
        unique_users = len(set(usernames))
        
        # Calculate statistics
        total_games = len(games_list)
        total_wins = sum(1 for g in games_list if g.get("won", False))
        total_losses = total_games - total_wins
        
        return {
            "date": date_str,
            "total_games": total_games,
            "unique_users": unique_users,
            "total_wins": total_wins,
            "total_losses": total_losses,
            "win_rate": f"{(total_wins/total_games*100):.2f}%" if total_games > 0 else "0%",
            "games": games_list
        }, 200
        
    except ValueError:
        return {"message": "Invalid date format. Use YYYY-MM-DD"}, 400
    except Exception as e:
        print(f"Error in day_report: {str(e)}")
        import traceback
        traceback.print_exc()
        return {"message": f"Error generating report: {str(e)}"}, 500


def user_report(username):
    """
    Generate a report for a specific user's game history.
    Returns: (response_dict, status_code)
    """
    from models.user_model import find_by_username
    
    try:
        # Check if user exists
        user = find_by_username(username)
        if not user:
            return {"message": "User not found"}, 404
        
        # Get all games for this user
        games_list = find_games_by_username(username)
        
        if not games_list:
            return {
                "username": username,
                "total_games": 0,
                "message": "No games found for this user"
            }, 200
        
        # Calculate statistics
        total_games = len(games_list)
        total_wins = sum(1 for g in games_list if g.get("won", False))
        total_losses = total_games - total_wins
        
        # Calculate average attempts for won games
        won_games = [g for g in games_list if g.get("won", False)]
        avg_attempts = (sum(len(g.get("guesses", [])) for g in won_games) / len(won_games)) if won_games else 0
        
        return {
            "username": username,
            "total_games": total_games,
            "total_wins": total_wins,
            "total_losses": total_losses,
            "win_rate": f"{(total_wins/total_games*100):.2f}%" if total_games > 0 else "0%",
            "average_attempts_on_win": f"{avg_attempts:.2f}",
            "games": games_list
        }, 200
        
    except Exception as e:
        print(f"Error in user_report: {str(e)}")
        import traceback
        traceback.print_exc()
        return {"message": f"Error generating report: {str(e)}"}, 500