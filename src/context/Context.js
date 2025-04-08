import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const NewsContext = createContext();

export const useNewsContext = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const BASE_URL = "https://newsapi.org/v2/top-headlines";

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [category, setCategory] = useState("");

  const changeCategory = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1);
  };

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          apiKey: API_KEY,
          country: "us",
          category: category || undefined,
          pageSize: 13,
          page: currentPage,
        },
      });

      console.log("✅ Noticias recibidas:", response.data);
      const data = response.data.articles || [];
      setArticles(data);
      setTotalResults(response.data.totalResults);
    } catch (err) {
      console.error("❌ Error al traer noticias:", err.response?.data || err);
      setError("No se pudo obtener la información");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [currentPage, category]);

  return (
    <NewsContext.Provider
      value={{
        articles,
        loading,
        error,
        fetchNews,
        currentPage,
        setCurrentPage,
        totalResults,
        category,
        changeCategory,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
