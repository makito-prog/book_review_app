import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '../components/Header';
import Cookies from 'js-cookie';
import './home.css';
import { Pagination } from '../components/Pagenation';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../redux/pagenationAction';
import { Link, useNavigate } from 'react-router-dom';

export const Home = () => {
  const [bookList, setBookList] = useState([]);
  const [user, setUser] = useState();
  const token = Cookies.get('token');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserInfo = useCallback(async () => {
    try {
      const response = await fetch('https://railway.bookreview.techtrain.dev/users', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [token]);

  const getBookList = useCallback(async (offset = 0) => {
    try {
      const response = await fetch(`https://railway.bookreview.techtrain.dev/books?offset=${offset}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch book list');
      }
      const data = await response.json();
      setBookList(data);
    } catch (error) {
      console.error('Error fetching book list:', error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      getUserInfo();
      getBookList();
    }
  }, [token, getUserInfo, getBookList]);

  const goToPage = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
    const newOffset = (pageNumber - 1) * 10;
    getBookList(newOffset);
  };

  const handleBookClick = async (selectBookId) => {
    try {
      // 書籍レビューをログとして送信
      const logResponse = await fetch('https://railway.bookreview.techtrain.dev/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ selectBookId }),
      });
      if (!logResponse.ok) {
        const errorData = await logResponse.json();
        console.error('Error response from log API:', errorData);
        throw new Error(`Failed to send log: ${logResponse.statusText}`);
      }
    } catch (error) {
      console.error('Error sending log:', error);
    }
  
    // 編集画面に遷移
    navigate(`/detail/${selectBookId}`);
  };

  return (
    <>
      <Header />
      <div className='home__main'>
        <h1 className='home__title'>書籍レビュー一覧</h1>
        <Link className='home__new' to="/new">新しいレビューを追加</Link>
        <ul className='home__book-list'>
          {bookList.map((book) => (
            <div className="home__book-review" key={book.id} >
              <div onClick={() => handleBookClick(book.id)}>
                <h3 className="home__book-review--title">{book.title}</h3>
                <a href={book.url} className="home__book-review--url">{book.url}</a>
                <p className="home__book-review--reviewer">{book.reviewer}</p>
                <li className="home__book-review--item">{book.review}</li>
              </div>
              {user && user.name === book.reviewer && (
                <Link to={`/edit/${book.id}`} className="edit-button">編集する</Link>
              )}
            </div>
          ))}
        </ul>
      </div>
      <Pagination goToPage={goToPage} />
    </>
  );
};