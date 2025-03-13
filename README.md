# WADS_Todo_App
Clone the Repository:
bash
Copy
Edit
git clone https://github.com/yourusername/week5-todo-app.git
cd week5-todo-app
Install Dependencies:
bash
Copy
Edit
npm install
Firebase Configuration:
Create a Firebase project and enable Authentication (Email/Password), Firestore, and (if needed) Realtime Database.
Copy your Firebase config from the Firebase console and update the firebase.js file accordingly.
Run the App:
bash
Copy
Edit
npm run dev
Additional Instructions:
Refer to the README.md file in the repository for further details on environment variables and project setup.
Features Implemented
User Authentication:
Sign up, login, and logout functionalities using Firebase Authentication.
Friendly error handling for auth errors (e.g., weak password, invalid email).
Todo List Management:
Users can add, edit, delete, and toggle completion of tasks.
Tasks are sorted based on priority (High, Medium, Low) and can be filtered (All, Completed, Pending).
User Profile Management:
A profile page that allows users to update their full name, phone number, and age.
Profile picture upload is implemented by converting the image to a base64 string and storing it in Firestore.
Responsive Design:
The app is built using Tailwind CSS to ensure it works well on both desktop and mobile devices.
Real-Time Updates:
Firestore onSnapshot listeners are used to update the navbar (e.g., user’s profile picture and full name) in real time.
Key Learnings
Firebase Integration:
Learned to integrate Firebase Authentication and Firestore into a React application.
Gained experience with real-time data updates using Firestore’s onSnapshot.
Responsive UI Development:
Improved my skills using Tailwind CSS for building responsive, mobile-friendly interfaces.
Learned to manage layout differences between desktop and mobile views.
State Management & Validation:
Learned how to manage component state using React hooks and handle asynchronous operations.
Implemented client-side validations to ensure data integrity (e.g., phone numbers, age, file upload restrictions).
Technical Challenges Encountered
Handling Image Uploads:
Converting images to base64 for Firestore storage required careful management of file size and dimensions.
Balancing quality versus file size to avoid hitting Firestore’s 1 MB document limit.
Responsive Navbar Issues:
Faced challenges with the navbar layout on mobile, especially ensuring the profile picture and menu items didn’t overflow.
Resolved by using Tailwind’s responsive classes and fine-tuning margins/paddings.
Real-Time Data Sync:
Managing real-time updates with onSnapshot was tricky, particularly ensuring the correct user data was displayed after updates.
Debugged issues with stale data by resetting state when the user changes.
