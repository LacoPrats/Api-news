import React from "react";
import "./NewsCard.css";
import defaultImage from "../../assets/defaultImage.jpg"; // o poné un link fijo si querés

function NewsCard({ article }) {
  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  return (
    <div className="news-card">
    <img
  src={article.urlToImage || defaultImage}
  alt={article.title}
  className="news-image"
  onError={(e) => (e.target.src = defaultImage)}
/>
      <div className="news-content">
        <h3>{article.title}</h3>
        <p>{article.description || "Sin descripción disponible."}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          Leer más
        </a>
      </div>
    </div>
  );
}

export default NewsCard;
