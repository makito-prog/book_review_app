import React, { useState, useEffect } from 'react';
import './header.css';
import Cookies from 'js-cookie';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Header = () => {
  const [userName, setUserName] = useState('');
  const location = useLocation();
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
          setUserName(userData.name + "さん");
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    getUserInfo();
  }, []);

  useEffect(() => {
    const handlePageChange = () => {
      const tokenFromCookie = Cookies.get('token');
      if (tokenFromCookie) {
        if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/notlogin') {
          navigate('/'); // ホームコンポーネントにリダイレクト
        }
      }
    };

    handlePageChange();
  }, [location, navigate]);

  const logOut = () => {
    Cookies.remove('token'); // クッキーからトークンを削除
    navigate('/login'); 
  };

  const logIn = () => {
    navigate('/login'); // loginページにリダイレクト
  };

  return (
    <div className='header'>
      <h1 className='header-title'>書籍レビュー</h1>
      {Cookies.get('token') ? (
        <div>
          <p className='user-name'>{userName}</p>
          <Link to="/profile" className='header-link'>プロフィール編集</Link>
          <button onClick={logOut} className='header-button'>ログアウト</button>
        </div>
      ) : (
        location.pathname === '/notlogin' && (
          <button onClick={logIn} className='header-button'>ログイン</button>
        )
      )}
    </div>
  );
};
