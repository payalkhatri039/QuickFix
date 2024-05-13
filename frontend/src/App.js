import './styles/index.scss';
import React from 'react';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Bookings from './pages/Bookings';
import ProfilePage from './pages/Profile';
import Assignment from './pages/Assignment';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Sidebar from './Components/Sidebar';
import CreatePassword from './pages/CreatePassword';
import TeachingAssistant from './pages/TeachingAssistant';
import './styles/AccessDenied.css';
import CreateSlotPage from './pages/CreateSlotPage';
import BookSlot from './pages/BookSlot';
import Logout from './pages/Logout';

/**
 *
 * @returns React.Component
 *
 * @description
 * This is the entry point for main application
 * App uses react-router-dom for navigation purposes
 */

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/forgotPassword/:token" element={<CreatePassword />} />

          <Route
            path="*"
            element={
              <div>
                <Navbar />
                <div className="row_flex">
                  <Sidebar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/bookings" element={<Bookings />} />
                    <Route
                      path="/assignments/:courseID"
                      element={<Assignment />}
                    />
                    <Route
                      path="/courses/:courseId/createSlot"
                      element={<CreateSlotPage />}
                    />
                    <Route
                      path="/courses/:courseId/bookSlot"
                      element={<BookSlot />}
                    />
                    <Route
                      element={<TeachingAssistant />}
                      path="/teachingAssistant"
                    />
                    <Route path="/logout" element={<Logout />}></Route>
                  </Routes>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
