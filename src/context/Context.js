import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const NewsContext = createContext();

export const useNewsContext = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const BASE_URL = "https://gnews.io/api/v4";

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const[currentPage,setCurrentPage]=useState(1)
    const[totalResults,setTotalResults]=useState(0);
    const[category,setCategory]=useState("")
    const [query,setQuery]=useState("")

    const fetchNews = async () => {
        setLoading(true);
        setError(null);
      
        try {
          const params = {
            apikey: API_KEY,
            country: "us",
            page: currentPage,
            pageSize: 13,
            category: category || "general",
          };
      
          
          console.log("URL de solicitud:", `${BASE_URL}/top-headlines?${new URLSearchParams(params).toString()}`);
      
          const response = await axios.get(`${BASE_URL}/top-headlines`, { params });
      
          console.log("API Response:", response.data.articles);
          setArticles(response.data.articles);
          setTotalResults(response.data.totalResults);
        } catch (err) {
          console.error("Error fetching news:", err);
          setError("Could not fetch data");
        } finally {
          setLoading(false);
        }
      };
      
    useEffect(() => {
        console.log("Fetching news...");
        fetchNews();
    }, [currentPage,category,query]);

    const changeCategory=(newCategory)=>{
        setCategory(newCategory)
    }

    return (
        <NewsContext.Provider value={{ articles, loading, error, fetchNews, currentPage,setCurrentPage, totalResults,category,changeCategory,setQuery }}>
            {children}
        </NewsContext.Provider>
    );
};
