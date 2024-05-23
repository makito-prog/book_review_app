import React, { useState } from 'react';
import { Header } from '../components/Header';
import Cookies from 'js-cookie';
import './newreview.css';
import { useNavigate } from 'react-router-dom';

export const NewReview = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [detail, setDetail] = useState('');
  const [review, setReview] = useState('');
  const token = Cookies.get('token');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://railway.bookreview.techtrain.dev/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, url, detail, review }),
      });
      if (!response.ok) {
        throw new Error('Failed to submit review');
      }
      // ホーム画面に遷移
      navigate('/home');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="new-review__container">
        <h1>書籍レビューを登録する</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">タイトル</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="url">URL</label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="detail">レビュアー</label>
            <input
              type="text"
              id="detail"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="review">レビュー</label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">登録する</button>
        </form>
      </div>
    </>
  );
};
