# Champions League

This project is maintained by [Barel Heby](https://github.com/BarelHeby).

The <b>Champions League App</b> is an engaging web application designed to enhance the experience of following the Champions League tournament. It provides a comprehensive platform for tracking games, placing bets, and comparing user standings.

## Key Features

1. <b>Betting On Games</b>

   - Users can place bets on upcoming matches.
   - Track the outcomes of bets and see how they influence the overall standings.

2. <b>Interactive Leaderboard</b>
   - View and compare your position on the leaderboard relative to other users.

## How It Works

1.  <b>Registration and Login</b>
    - Users log in using provided credentials to access their profiles and place bets.
2.  <b>Betting</b>

    - Place bets on upcoming games through the intuitive user interface.
    - Monitor the results of your bets and their impact on your standing.

3.  <b>Leaderboard</b>
    - Access the leaderboard to view your ranking compared to other users.
    - Analyze the leaderboard to see top performers and track your progress.

## How to Run the Application

### 1. Clone the Repository

First, you need to clone the repository to your local machine. Open a terminal and run the following command:

```sh
$ git clone https://github.com/BarelHeby/champions-league.git
```

### 2. Start the Backend Server

Navigate to the root directory of the cloned repository. Then, run the following command to start the backend server:

```sh
python manage.py runserver 0.0.0.0:8002
```

This command will start the Django development server on your local machine, listening on all network interfaces (0.0.0.0) and port 8002.

### 3. Start the Frontend Client

Open a new terminal window or tab, navigate to the frontend directory, and run the following commands:

```sh
cd frontend
npm install
npm start
```

- `cd frontend` : Changes the current directory to the frontend directory.
- `npm install` : Installs all the dependencies required for the frontend.
- `npm start` : Starts the React development server.

### 4. Access the Application

Once both the backend server and frontend client are running, you can access the application in your web browser in `http://localhost:3000`.

### 5. Login Credentials

Use the following credentials to log in and gain full access to the application:

- `Username`: barel123
- `Password`: barel123

This will give you full access to the app.

### Enjoy

Enjoy exploring and using the Champions League application!
