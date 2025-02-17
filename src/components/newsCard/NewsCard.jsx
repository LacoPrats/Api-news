import React from 'react'
import "./NewsCard.css"

function NewsCard({article}) {
  return (
    <div className='news-card'>
      <img src={article.urlToImage} alt="" className='news-image' />
      <div className='news-content'>
<h3>{article.title}</h3>
<p>{article.description}</p>
<a href={article.url}>Read More</a>
      </div>
    </div>
  )
}

export default NewsCard
