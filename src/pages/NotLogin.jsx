import { useState, useEffect } from 'react';
import './home.css'
import { Pagination } from '../components/Pagenation';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../redux/pagenationAction';
import { Header } from "../components/Header";

export const NotLogin = () => {

  const [bookList, setBookList] = useState([]);
  const dispatch = useDispatch();
  
  const getBookList = async (offset) => {
    try {
      const response = await fetch(`https://railway.bookreview.techtrain.dev/public/books?offset=${offset}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch book list');
      }
      const data = await response.json();
      setBookList(data);
    } catch (error) {
      console.error('Error fetching book list:', error);
    }
  };

  useEffect(() => {
    getBookList(0);
  }, []);

  const goToPage = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
    const newOffset = (pageNumber - 1) * 10;
    getBookList(newOffset);
  };

  return(
    <>
      <Header />
      <div className='home__main'>
        <h1 className='home__title'>書籍レビュー一覧</h1>
        <ul className='home__book-list'>
          {bookList.map((book) => (
            <div className="home__book-review" key={book.id}>
              <h3 className="home__book-review__title">タイトル:  {book.title}</h3>
              <a href={book.url} className="home__book-review__url">url:  {book.url}</a>
              <p className="home__book-review__reviewer">reviewer:  {book.reviewer}</p>
              <li className="home__book-review__item">review:  {book.review}</li>
            </div>
          ))}
        </ul>
      </div>
      <Pagination goToPage={goToPage} />
    </>
  )
}
