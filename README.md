# Study Hive - A group study application 🐝  

Welcome to **Study Hive**, the application is for online group study. Study Hive is designed to make learning collaborative and engaging by allowing users to create, complete, and grade assignments with their friends or anyone.  

---

## Project Overview 🎯  

This project is for group study with friends and others. The application handles the user interface, interactions, and API requests for our platform.  

---

## Key Features 🚀  

- **User-Friendly Interface**: Intuitive design for a seamless user experience.  
- **Authentication System**: User login and registration using JWT and Firebase Auth.  
- **Assignment Management**: Create, update, delete, complete, and view assignments easily.  
- **Grading System**: Grade and provide feedback on anyone's assignments.  
- **Responsive Design**: Fully optimized for all screen sizes with Tailwind CSS.  

---

### 🔧 Technologies Used 

#### **Frontend**
- **react**: Core React library for building the UI.  
- **react-router-dom**: Navigation and routing between pages.  
- **react-dateoicker**: For using date pick easily.  
- **react-toastify**: Stylish notifications for user actions.  
- **react-awesome-reveal**: used to add smooth, customizable animations and reveal effects.  
- **react-icons**: used to easily integrate a wide variety of scalable vector icons from popular icon libraries into React applications, enhancing UI design and user experience..  
- **tailwindcss**: Utility-first CSS framework for styling.  
- **axios**: For making HTTP requests to the server.  
- **framer-motion**:  used to create advanced, flexible animations and interactive motion effects.  
- **sweetalert-2**: Stylish alerts for user actions.

#### **Backend**  
- **MongoDB Atlas**: Flexible database for storing campaigns and user data.  
- **Vercel**: Reliable backend hosting.

## 📦 Dependencies  
- **axios**: `^1.7.9`  
- **date-fns**: `^4.1.0`  
- **firebase**: `^11.1.0`  
- **framer-motion**: `^11.15.0`  
- **localforage**: `^1.10.0`  
- **match-sorter**: `^8.0.0`  
- **react**: `^18.3.1`  
- **react-awesome-reveal**: `^4.2.14`
- **react-datepicker**: `^7.5.0` 
- **react-dom**: `^18.3.1`  
- **react-helmet-async**: `^2.0.5`  
- **react-icons**: `^5.4.0`
- **react-modal**: `^3.16.3`
- **react-router-dom**: `^7.1.0` 
- **react-toastify**: `^11.0.2`    
- **sort-by**: `^1.2.0`  
- **sweetalert2**: `^11.15.3`  

### 🛠️ DevDependencies  
- **@eslint/js**: `^9.17.0`  
- **@types/react**: `^18.3.17`  
- **@types/react-dom**: `^18.3.5`  
- **@vitejs/plugin-react**: `^4.3.4`  
- **autoprefixer**: `^10.4.20`  
- **daisyui**: `^4.12.22`  
- **eslint**: `^9.17.0`  
- **eslint-plugin-react**: `^7.37.2`  
- **eslint-plugin-react-hooks**: `^5.0.0`  
- **eslint-plugin-react-refresh**: `^0.4.16`  
- **globals**: `^15.13.0`  
- **postcss**: `^8.4.49`  
- **tailwindcss**: `^3.4.17`  
- **vite**: `^6.0.3`

---

### 🖼️ Project Screenshot  

![StudyHive Screenshot 1](https://i.ibb.co.com/DWP74TD/s-h-1.png) 
![StudyHive Screenshot 2](https://i.ibb.co.com/YLpcXKc/s-h-2.png) 

---

### ⚙️ How to Run the Project Locally  

1. **Clone the Repository**:  
   ```bash
   git clone https://github.com/MehediBytes/study-hive-client.git
   cd study-hive-client
   ```

2. **Install Dependencies**:  
   ```bash
   npm install
   ```

3. **Setup Firebase**:  
   - Go to [Firebase Console](https://console.firebase.google.com/).  
   - Create a new project and add your Firebase config to `src/firebaseConfig.js`.  

4. **Run the Development Server**:  
   ```bash
   npm run dev
   ```

5. **Access the App**:  
   Open your browser and navigate to `http://localhost:5173`.

---

### 🚀 Live Links  

- **Live Website**: [Study-Hive](https://study-hive-a11.web.app)  
- **Backend APIs**:  
  - [Assignments API](https://study-hive-server-omega.vercel.app/assignments)

 ### 🖋️ Additional Notes

- Ensure your MongoDB Atlas database is properly configured.  
- Set environment variables for backend APIs.  
- For production deployment, use Firebase Hosting or Vercel for optimal performance.

### 🖋️ Future Implementations

1. **Real-Time Collaboration**:  
   - Implement real-time collaboration for users to work together on assignments, make changes simultaneously, and communicate via integrated chat or discussion forums.

2. **Task Scheduling and Reminders**:  
   - Add a task scheduling system with reminders to notify users about upcoming deadlines for assignments, keeping them on track.

3. **Group Study Sessions**:  
   - Enable users to create or join group study sessions where they can collaborate, share resources, and provide live feedback on assignments.

4. **Assignment Notifications**:  
   - Introduce notifications to keep users informed when assignments are completed, graded, or commented on, ensuring they never miss an update.

5. **Peer Review System**:  
   - Build a peer review system to allow users to review and provide feedback on each other's assignments, promoting collaborative learning.

6. **Advanced Search and Filtering**:  
   - Enhance the search functionality to allow users to filter assignments by subject, difficulty level, or completion status, making it easier to manage tasks.

7. **Assignment Progress Tracker**:  
   - Implement a visual progress tracker for assignments, helping users monitor their progress and motivating them to complete their tasks.

8. **Improved Grading System**:  
   - Expand the grading system to allow for more detailed feedback on assignments, enabling users to learn from their mistakes and improve their work.

9. **Mobile Application**:  
   - Develop a mobile version of the app for iOS and Android, allowing users to participate in group study, submit assignments, and track progress on the go.

10. **User Customization**:  
   - Introduce features like dark mode, customizable color themes, and layout preferences for a more personalized user experience.
