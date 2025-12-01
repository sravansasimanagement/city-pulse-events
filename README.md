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

---

## Demo / Screenshots

### Video Demo
You can click the below link directly:

[![City Pulse]([https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID](https://drive.google.com/file/d/1-3AzeFDKtqom7HDMcJBbNXBqCLM505mr/view?usp=sharing))


### Screenshots
 Add screenshots for clarity:
<img width="1144" height="717" alt="event_login" src="https://github.com/user-attachments/assets/524bf0ff-a361-4ff7-9aa7-09f3d86f508b" />


<img width="1164" height="718" alt="event_signup" src="https://github.com/user-attachments/assets/c114488e-c5a0-4ddd-af85-465bb032d54a" />

<img width="1163" height="760" alt="event_splash" src="https://github.com/user-attachments/assets/6c425302-7d63-43fc-b3c2-09aefc497e46" />

<img width="1154" height="713" alt="event_home" src="https://github.com/user-attachments/assets/0c698897-2792-46bd-83ca-ae03fb6ff125" />

<img width="1156" height="717" alt="even_details" src="https://github.com/user-attachments/assets/93ea2f7b-7f93-4a88-914d-cc1afe79c36b" />

<img width="1181" height="804" alt="event_profile" src="https://github.com/user-attachments/assets/4636d7ba-a09f-4b43-b132-dea0bd269e5e" />



