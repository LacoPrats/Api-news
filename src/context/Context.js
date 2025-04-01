import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const NewsContext = createContext();

export const useNewsContext = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
    const API_KEY = "768c27130cc540d79423ad9e557beb96";
    const BASE_URL = "https://newsapi.org/v2";

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const[currentPage,setCurrentPage]=useState(1)
    const[totalResults,setTotalResults]=useState(0);
    const[category,setCategory]=useState("")
    const [query,setQuery]=useState("")
    console.log(API_KEY);
    console.log(BASE_URL);
    

    const fetchNews = async () => {
        setLoading(true);
        setError(null);
    
        try {
            const response = await axios.get(`${BASE_URL}/top-headlines`, {
                params: {
                    apiKey: API_KEY, // ✅ Solo una vez
                    country: "us",
                    page: currentPage,
                    pageSize: 6,
                    category: category || undefined,
                    q: query || undefined,
                },
                headers: {
                    "User-Agent": "Mozilla/5.0",
                    "Accept": "application/json",
                }
            });
    
            console.log("API Response:", response.data.articles);
            setArticles(response.data.articles);
            setTotalResults(response.data.totalResults);
        } catch (err) {
            console.error("Error fetching news:", err.response?.data || err);
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
