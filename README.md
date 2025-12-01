# City Pulse – Local Events Explorer

City Pulse is a **React + TypeScript** web application that allows users to explore local events with features such as searching, viewing event details, marking favorites, authentication, and user profile management.

The app integrates **Firebase Authentication**, **Firestore**, **Material UI**, and **React Router**.  

---

## Features

### Authentication
- User registration (Name, Contact, NumberEmail, Password)
- Login / Logout
- Firebase-based user management
- Stores additional user fields (Full Name, Phone Number)

### Events & Maps
- Event listing from external API
- Event details page
- Google Maps preview (Material UI styled)

### Favorites
- Add/remove favorite events
- Persist favorites using `localStorage`

### User Profile
- Profile picture avatar
- Displays user full name & phone number
- Favorite events listed with delete option

### UI & UX
- Material UI styled components
- Splash screen with animation
- Clean & responsive layout

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + TypeScript |
| UI Framework | Material UI (MUI) |
| API Calls | Fetch / Axios |
| Auth | Firebase Authentication |
| Data Storage | LocalStorage |
| Routing | React Router v6 |
| Build Tool | Vite / CRA |

---

##  Project Setup Instructions

Follow these steps to run City Pulse locally.

###  Clone the Repository

git clone https://github.com/sravansasimanagement/city-pulse-events.git
cd city-pulse-events
npm install

### .env setup

Create a .env file in the project root with your Firebase keys and API keys:

VITE_TM_API_KEY=API_KEY

REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY

REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN

REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID

REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET

REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID

REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID


### Running the App
To run the app in development mode, use: npm run dev

The app will be available at http://localhost:5173/

### Building the App
To create a production-ready build of the app, run: npm run build

The optimized build will be located in the build/ directory.


