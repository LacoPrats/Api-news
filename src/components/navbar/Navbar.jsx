import React from 'react'
import "./Navbar.css"
import { useNewsContext } from '../../context/Context';

function Navbar() {

const{category,changeCategory,setQuery}=useNewsContext()

    const categories=[
        "Entertainment",
        "General",
        "Health",
        "Science",
        "Sports",
        "Technology",
    ];

    const handleSeatch=(e)=>{
        e.preventDefault()
        const query=e.target.elements.search.value.trim()
        setQuery(query)
    }

  return (
   <nav className='header'>
    <div className='logo'>
<h4>API PROJECT</h4>
<small>NewsApp</small>
    </div>
<ul className='category-list'>
{categories.map((categoryName) => (
    <li key={categoryName} className={`category-item ${category === categoryName ? "active" : ""}`} 
        onClick={() => changeCategory(categoryName)}>
        {categoryName}
    </li>
))}

</ul>
<div className='search-bar'>
<form onSubmit={handleSeatch}>
    <input type="text" name="search" placeholder='search news...' />
    <button type='submit'>Search</button>
</form>
</div>
   </nav>
  )
}

export default Navbar;
