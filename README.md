# Week 5 Assignment Submission

## Repository Link
Please find the repository for the Week 5 assignment at the following link: https://github.com/Mbulss/WADS_Todo_App.git

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
   git clone https://github.com/yourusername/your-repo.git
   ```
2. Navigate into the project folder:
   ```sh
   cd your-repo
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up Firebase:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project (if you haven't already).
   - Set up Firebase Authentication with Email/Password.
   - Get your Firebase configuration from **Project Settings > General > Your apps**.
   - Create a `.env` file in the root of your project and add the following variables:
     ```env
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```
4. Start the development server:
   ```sh
   npm start
   ```

Your application should now be running on `http://localhost:3000/`.

## Implemented Features

### User Authentication
- **Signup & Login:** Users can sign up and log in using their email and password via Firebase Authentication.
- **Password Confirmation:** The signup form ensures passwords match before creating an account.
- **Firebase Error Handling:** Displays user-friendly error messages for authentication failures.

### TODO List Features
- **Add Tasks:** Users can add tasks with a title, priority level (Low, Medium, High), due date, and time.
- **Task Management:** Users can mark tasks as completed, delete tasks, or filter them based on priority.
- **Firebase Database:** Tasks are stored and retrieved using Firebase Firestore, ensuring persistent data.
- **User Profile:** Displays user email and profile picture (if available) from Firebase Authentication.
- **File Upload:** Users can upload a file using a styled `Choose File` button, which has been made larger for better usability.
- **Logout Functionality:** Users can securely log out from their session.

## Firebase Configuration
Ensure that you have correctly set up Firebase Authentication and Firestore:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (if you haven't already)
3. Navigate to **Authentication > Sign-in method**, enable **Email/Password Authentication**
4. Navigate to **Firestore Database**, create a new database, and set security rules for appropriate access control
5. Retrieve Firebase configuration from **Project Settings > General > Your apps**
6. Replace the placeholder values in the `.env` file with your actual Firebase credentials.



