# WADS ToDO List App

## Repository Link
Please find the repository for the Week 5 assignment at the following link:  
[GitHub Repository](https://github.com/Mbulss/WADS_Todo_App.git)

## Setup Instructions
To run this project on your local machine, follow these steps:

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) 
- [Firebase Account](https://firebase.google.com/)

### Installation Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/Mbulss/WADS_Todo_App.git
2. Navigate into the project folder:
   ```sh
   cd WADS_Todo_App
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up Firebase:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project (if you haven't already).
   - Set up Firebase Authentication with Email/Password.
   - Set up Firestore Database.
   - Update the `firebase.js` file with your Firebase API.
5. Start the development server:
   ```sh
   npm start
   ```

Your application should now be running on `http://localhost:5173/` (this link may not be accurate as it is from my local machine).

## Implemented Features

### User Authentication
- **Signup & Login:** Users can sign up and log in using their email and password via Firebase Authentication.
- **Password Confirmation:** The signup form ensures passwords match before creating an account.
- **Reset Password**: Users can reset their password if forgotten, a password reset email is sent via Firebase Authentication.
- **Firebase Error Handling:** Displays user-friendly error messages for authentication failures.

### TODO List Features
- **Add Tasks:** Users can add tasks with a title, priority level (Low, Medium, High), due date, and time.
  
- **Task Management:** Users can mark tasks as completed, delete tasks, or filter them based on priority.
  
- **Firebase Database:** Tasks are stored and retrieved using Firebase Firestore, ensuring persistent data.
  
- **User Profile:** By clicking the Profile (beside your email/username) u can access user profile. Displays user email and profile picture (if available if not they will used for default Profile.png) from Firebase Authentication.

- **File Upload:** Users can upload a file using a styled `Choose File` button, which has been made larger for better usability.
  
- **Logout Functionality:** Users can securely log out from their session.

## Firebase Configuration
Ensure that you have correctly set up Firebase Authentication and Firestore:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (if you haven't already)
3. Navigate to **Authentication > Sign-in method**, enable **Email/Password Authentication**
4. Navigate to **Firestore Database**, create a new database, and set security rules for appropriate access control
5. Retrieve Firebase configuration from **Project Settings > General > Your apps**
6. Update `firebase.js` file with your actual Firebase credentials.



