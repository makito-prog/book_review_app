/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { NotLogin } from './pages/NotLogin';
import { Profile } from './pages/Profile';
import { NewReview } from './pages/NewReview';
import { BookDetail } from './pages/BookDetail';
import { EditReview } from './pages/EditReview';

export const Router = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notlogin" element={<NotLogin />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new" element={<NewReview />} />
          <Route path="/detail/:id" element={<BookDetail />} />
          <Route path="/edit/:id" element={<EditReview />} />
        </Routes>
      </BrowserRouter>
  );
};

export default Router;
