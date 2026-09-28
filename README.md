🎮 ARCADE HUB
> A browser-based interactive gaming project combining web development, JavaScript, UI design, and computer-vision-based interaction.
🚀 About
ARCADE HUB is a futuristic browser-based gaming experience designed as a practical learning project.
The main flow is:
Login → Game 1 → Game 2 → Game 3 → Feedback
The project demonstrates how an idea can be turned into a working application through design, coding, testing, debugging, and improvement.
✨ Features
Futuristic dark/cyber-style interface
Login screen
Multiple connected games
Transition screens
Camera-based interaction
Hand tracking using MediaPipe
Timers and challenge modes
Score and target-based game logic
Quiz/clue-based gameplay
Win and lose screens
Try Again / Home navigation
🎮 Game 1: Cyber Pop
Cyber Pop is a camera-based target game.
The player uses their hand and index finger to control the on-screen aim/crosshair and interact with targets.
How it works
```text
Camera
   ↓
Hand Detection
   ↓
MediaPipe Hand Landmarks
   ↓
Index Finger Position
   ↓
JavaScript
   ↓
On-screen Aim
   ↓
Target Hit
   ↓
Score / Result
```
Challenge Modes
Time	Target
1 Minute	150
2 Minutes	200
3 Minutes	300
🧩 Game 2: Mystery Parda
Mystery Parda is a clue-based quiz game.
It contains 3 quizzes and different difficulty levels.
Difficulty	Options	Time
Easy	5	10 seconds
Normal	10	15 seconds
Hard	20	20 seconds
The game uses 20 possible items including Hourglass, Compass, Mirror, Shadow, Map, Echo, Key, Anchor, Coin, Wind, Book, Gloves, Microscope, Satellite, Black Hole, Volcano, Telescope, Lightning, Iceberg, and Battery.
🎮 Game 3
Game 3 is the final game in the current Arcade HUB flow.
The exact gameplay mechanics depend on the current implementation in `game3.html`.
🔗 Project Flow
```text
LOGIN
  ↓
VIDEO 1
  ↓
GAME 1 - CYBER POP
  ↓
VIDEO 2
  ↓
GAME 2 - MYSTERY PARDA
  ↓
VIDEO 3
  ↓
GAME 3
  ↓
FEEDBACK
```
🛠️ Technologies Used
HTML
Creates the structure of the pages, game screens, popups, buttons, HUD elements, and navigation.
CSS
Used for the futuristic interface, layout, animations, glowing elements, HUD styling, and responsive design.
JavaScript
Handles game logic, timers, scoring, user interaction, difficulty selection, win/lose conditions, and page navigation.
MediaPipe Hands
Used in Cyber Pop for browser-based hand tracking and computer-vision interaction.
Browser Camera
Provides live video input for the hand-tracking interaction.
📁 Project Structure
A possible structure is:
```text
ARCADE-HUB/
│
├── main.html
├── game1.html
├── game2.html
├── game3.html
├── transition.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── script.js
│   └── audio.js
│
├── assets/
│   ├── video1.mp4
│   ├── video2.mp4
│   └── video3.mp4
│
└── README.md
```
> File names and folders may differ depending on the final version of the project.
▶️ How to Run
VS Code + Live Server
Download or clone this repository.
Open the project folder in VS Code.
Install the Live Server extension if needed.
Open `main.html`.
Right-click and select Open with Live Server.
Allow camera access when the browser asks.
Start Arcade HUB.
A local web server is recommended because the project uses browser camera functionality and external web libraries.
📷 Camera Permission
Cyber Pop requires camera access for hand tracking.
When the browser asks for permission:
Allow → Camera Access
If camera permission is blocked, the hand-tracking interaction may not work correctly.
🧠 Learning Goals
Arcade HUB explores:
Programming logic
Web development
JavaScript
UI/UX design
Computer vision
Camera interaction
Game development concepts
Debugging
Testing
Multi-page application flow
Project integration
🔄 Development Process
```text
IDEA
  ↓
DESIGN
  ↓
CODE
  ↓
TEST
  ↓
DEBUG
  ↓
IMPROVE
  ↓
DEMO
```
Building Arcade HUB demonstrates that creating an application involves more than writing code. Testing, debugging, integration, and improving the user experience are also part of development.
🔮 Future Improvements
Possible future additions:
Player profiles
Score storage
Leaderboards
More games
Better animations
Additional camera-based interactions
Database integration
Online multiplayer
Mobile adaptation
Advanced game statistics
👨‍💻 Developer
ARCADE HUB
A practical learning project exploring web development, JavaScript, interactive UI, and computer-vision-based interaction.
📌 Source Code
GitHub Repository:  
`YOUR_GITHUB_REPOSITORY_LINK`
Replace the placeholder with the public GitHub repository URL.
⭐ Explore the Project
⭐ Star the repository
👀 Explore the source code
🧠 Study the project structure
🛠️ Experiment with the code
🚀 Build your own version
---
🎮 PLAY • EXPLORE • UNLOCK
ARCADE HUB
