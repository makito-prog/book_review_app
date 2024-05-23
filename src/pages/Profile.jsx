import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import { Header } from '../components/Header';

export const Profile = () => {
  const [userName, setUserName] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const tokenFromCookie = Cookies.get('token');
        if (tokenFromCookie) {
          const response = await fetch('https://railway.bookreview.techtrain.dev/users', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${tokenFromCookie}`,
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch user info');
          }
          const userData = await response.json();
          setUserName(userData.name);
          setNewUserName(userData.name);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    getUserInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tokenFromCookie = Cookies.get('token');
      const response = await fetch('https://railway.bookreview.techtrain.dev/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenFromCookie}`,
        },
        body: JSON.stringify({ name: newUserName }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user info');
      }

      const updatedUserData = await response.json();
      setUserName(updatedUserData.name);
      alert('ユーザー情報が更新されました');
      navigate('/home');
    } catch (error) {
      console.error('Error updating user info:', error);
      alert('ユーザー情報の更新に失敗しました');
    }
  };

  return (
    <>
      <Header />
      <div className='profile'>
        <h2>プロフィール編集</h2>
        <div>現在のユーザー名: {userName}</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>ユーザー名:</label>
            <input
              type='text'
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
          </div>
          <button type='submit'>更新</button>
        </form>
      </div>
    </>
  );
};
