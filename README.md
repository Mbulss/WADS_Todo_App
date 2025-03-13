# WADS_Todo_App

A **React + Firebase** Todo application that includes user authentication, real-time database operations, and a user profile page. This project was created for **Week 5** of WADS and demonstrates core concepts such as sorting, filtering, authentication, and responsive design using Tailwind CSS.

## Table of Contents

- [Getting Started](#getting-started)
- [Firebase Configuration](#firebase-configuration)
- [Features](#features)
- [Key Learnings](#key-learnings)
- [Technical Challenges](#technical-challenges)
- [License](#license)

---

## Getting Started

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/yourusername/WADS_Todo_App.git
   cd WADS_Todo_App
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```
   
3. **Run the Development Server**  
   ```bash
   npm run dev
   ```
   The app should be available at **`http://localhost:5173`** (or whichever port Vite chooses).

4. **Build for Production**  
   ```bash
   npm run build
   npm run preview
   ```

---

## Firebase Configuration

1. **Create a Firebase Project**  
   - Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project (or use an existing one).
   - Enable **Authentication** (Email/Password) and **Firestore** in the Firebase console.

2. **Update `firebase.js`**  
   - Copy your project’s Firebase config (apiKey, authDomain, etc.) from the Firebase Console.
   - Paste it into `firebase.js` inside the `initializeApp(firebaseConfig)` call.

3. **Security Rules**  
   - Make sure you have appropriate Firestore security rules to allow reads/writes for authenticated users.

---

## Features

1. **User Authentication**  
   - Users can sign up, log in, and log out using Firebase Authentication.  
   - Friendly error handling for weak passwords, invalid emails, etc.

2. **Todo List Management**  
   - Add, edit, and delete tasks.  
   - Toggle task completion status.  
   - Sort tasks by priority (High, Medium, Low) and filter (All, Completed, Pending).

3. **User Profile**  
   - A profile page allows users to edit their **full name**, **phone number**, **age**, and **profile picture**.  
   - Profile pictures are stored as base64 in Firestore (be mindful of the 1 MB document limit).

4. **Real-Time Updates**  
   - The NavBar uses `onSnapshot` to display the user’s display name and photo in real time.

5. **Responsive UI**  
   - Built with Tailwind CSS, ensuring it looks good on both desktop and mobile devices.  
   - A hamburger menu toggles the mobile NavBar items.

---

## Key Learnings

- **React + Firebase Integration**  
  Learned how to integrate Firebase Authentication and Firestore with a React front-end, handling user sessions, real-time updates, and secure reads/writes.

- **Responsive Design with Tailwind CSS**  
  Improved skills in building mobile-friendly layouts, toggling menus, and ensuring components adapt across screen sizes.

- **Client-Side Validations**  
  Implemented checks for negative ages, phone numbers containing only digits, and image file size/dimensions to maintain data integrity.

---

## Technical Challenges

- **Firestore Document Size**  
  Storing images as base64 can quickly approach Firestore’s 1 MB document limit, requiring compression or strict file-size checks.

- **Real-Time Listeners**  
  Managing multiple `onSnapshot` calls (e.g., for NavBar and Todo List) and ensuring stale data didn’t persist was tricky.

- **Responsive Navbar**  
  Creating a single NavBar component that works elegantly on desktop (horizontal) and mobile (hamburger menu) required careful use of Tailwind’s responsive classes.
