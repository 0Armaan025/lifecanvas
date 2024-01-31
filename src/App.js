import React from "react";
import HomePage from "./pages/home/HomePage";
import AuthPage from "./pages/auth/AuthPage";
import JournalPage from "./pages/journal/JournalPage";
import ProfilePage from "./pages/profile/ProfilePage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import { Routes, Route } from "react-router-dom";


function App() {

  return (
    <>
    <Routes>
      <Route exact path = "/" element={<HomePage/>}/>
      <Route path = "/auth" element={<AuthPage/>}/>
      <Route path = "/write-journal" element={<JournalPage/>}/>
      <Route path = "/dashboard" element={<DashboardPage/>}/>
      <Route path = "/profile" element={<ProfilePage/>}/>
    </Routes>
    
    </>
  );
}

export default App;
