import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './editreview.css';
import { Header } from '../components/Header';

export const EditReview = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [editedBook, setEditedBook] = useState({
    title: '',
    url: '',
    reviewer: '',
    review: ''
  });
  const token = Cookies.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch book');
        }
        const data = await response.json();
        setEditedBook(data);
      } catch (error) {
        console.error('Error fetching book:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedBook({ ...editedBook, [name]: value });
  };

  const updateBook = async () => {
    try {
      const response = await fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedBook),
      });
      if (!response.ok) {
        throw new Error('Failed to update book');
      }
      // 更新成功時の処理
      navigate(`/detail/${id}`); // 書籍詳細ページに戻る
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const deleteBook = async () => {
    try {
      const response = await fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      // 削除成功時の処理
      navigate('/home'); // ホームページにリダイレクト
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="edit-book-container">
        <h1 className="edit-book-title">Edit Review</h1>
        <form>
          <label>Title:</label>
          <input type="text" name="title" value={editedBook.title} onChange={handleInputChange} />
          <label>URL:</label>
          <input type="text" name="url" value={editedBook.url} onChange={handleInputChange} />
          <label>Reviewer:</label>
          <input type="text" name="reviewer" value={editedBook.reviewer} disabled />
          <label>Review:</label>
          <textarea name="review" value={editedBook.review} onChange={handleInputChange} />
          <div className='select-button'>
            <button className="update-button" type="button" onClick={updateBook}>Update</button>
            <button className="delete-button" type="button" onClick={deleteBook}>Delete</button>
          </div>
        </form>
      </div>
    </>
  );
};
