import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './bookdetail.css';
import { Header } from '../components/Header';

export const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookResponse = await fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!bookResponse.ok) {
          throw new Error('Failed to fetch book');
        }
        const bookData = await bookResponse.json();
        setBook(bookData);

        const userResponse = await fetch('https://railway.bookreview.techtrain.dev/users', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await userResponse.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, token]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }


  // 編集ボタンを表示する条件：ログイン中かつログイン中のユーザーが書籍のレビューを作成した場合
  const isEditable = user && user.name === book.reviewer;

  return (
    <>
      <Header />
      <div className='page-transition'>
        {isEditable && <Link to={`/edit/${id}`} className="edit-button">編集する</Link>}
        <Link to="/home" className="back-button">Homeへ戻る</Link>
      </div>
      <div className="book-detail">
        <h1 className="book-detail-title">{book.title}</h1>
        <p className="book-detail-reviewer">{book.reviewer}</p>
        <p className="book-detail-review">{book.review}</p>
        <a className="book-detail-url" href={book.url} target="_blank" rel="noopener noreferrer">{book.url}</a>
      </div>
    </>
  );
};
