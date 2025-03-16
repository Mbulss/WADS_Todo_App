# WADS ToDO List App

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

## Running with Docker

Run the app using Docker for easy deployment:

1. **Install Docker**:  
   If you don't have Docker installed, follow the [official installation guide](https://docs.docker.com/get-docker/).

2. **Pull the Docker image**:  
   ```sh
   docker pull yourusername/todo-app:latest
   ```
   Replace yourusername with your Docker Hub username. For development builds (e.g., :dev), adjust the tag accordingly.

3. **Run the container:**
    ```sh
    docker run -p 5173:5173 yourusername/todo-app:latest
    ```
This maps port 5173 in the container to port 5173 on your host machine. Access the app at http://localhost.
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

---

## Sign Up

1. Click on `Sign up` if you’re a new user.
2. Fill in the required fields (email, password, confirm password, etc.).
3. Submit the form. You’ll be automatically logged in after signing up.

## Login

1. Click `Login` if you already have an account.
2. Enter your registered email and password.
3. Click `Submit` to access your personalized todo list.

## U CAN TRY USING THIS EMAIL AND PASSWORD 
## Email : haniif.wardana@binus.ac.id Password : 2702358065

## Reset Password

1. On the login page, click `Forgot Password`.
2. Enter your registered email address.
3. Check your inbox for a password reset link and follow the instructions.

## Add Tasks

1. On the **Todo** page:
   - Enter a task description in the `Task` field.
   - Select a priority level (Low/Medium/High).
   - Set a `Due Date & Time`.
2. Click `Add Task` to save it to your list.

## Manage Tasks

- **Mark as Complete**: Check the checkbox next to a task.
- **Edit Task**:
  1. Click the `⋮` (three-dot menu) next to the task.
  2. Select `Edit`, modify the task details, and save.
- **Delete Task**:
  - Click `Delete` in the task’s menu or next to the task.

## User Profile

1. Click `Profile` (visible next to your email in the navigation bar).
2. Update your profile picture or personal details.
3. Changes are saved automatically and reflected in the navbar.

## Logout

- Click `Log out` in the navigation bar to securely end your session.

---


