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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [query, setQuery] = useState("argentina");

    // Esta función reemplaza category, porque GNews no tiene ese campo
    const changeCategory = (newCategory) => {
        setQuery(newCategory);
        setCurrentPage(1); // Reinicia la paginación cuando cambia la categoría
    };

    const fetchNews = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${BASE_URL}/search`, {
                params: {
                    q: query,
                    lang: "es",
                    max: 10,
                    page: currentPage,
                    token: API_KEY,
                },
            });

            setArticles(response.data.articles);
            setTotalResults(response.data.totalArticles);
        } catch (err) {
            console.error("Error fetching news:", err.response?.data || err);
            setError("No se pudo obtener la información");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [currentPage, query]);

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
                query,
                setQuery,
                changeCategory, // <- Asegurate de exportarla
            }}
        >
            {children}
        </NewsContext.Provider>
    );
};
