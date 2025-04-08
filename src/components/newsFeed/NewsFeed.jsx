import React from 'react';
import './NewsFeed.css';
import { useNewsContext } from '../../context/Context';
import NewsCard from '../newsCard/NewsCard';
import Loader from '../loader/Loader';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Pagination from '../pagination/Pagination';

function NewsFeed() {
  const {
    articles,
    loading,
    error,
    currentPage,
    setCurrentPage,
    totalResults,
  } = useNewsContext();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="news-feed">
      <div className="news-feed-container">
        {articles.length === 0 ? (
          <p className="no-news-message">No news found, please try again later</p>
        ) : (
          <>
            <div className="news-grid">
              {articles.map((article, index) => (
                <NewsCard key={index} article={article} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalResults={totalResults}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default NewsFeed;

