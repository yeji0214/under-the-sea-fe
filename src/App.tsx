import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignInPage from './pages/SignInPage.tsx';
// import "../public/css/index.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignInPage />} />
        <Route path='/sign-in' element={<SignInPage />} />
        {/* <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/list-of-posts' element={<ListOfPosts />} />
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/update-post/:id' element={<UpdatePost />} />
        <Route path='/post-details' element={<PostDetails />} />
        <Route path='/update-profile' element={<UpdateProfile />} />
        <Route path='/update-password' element={<UpdatePassword />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
