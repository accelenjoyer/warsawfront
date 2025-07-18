"use client"

    import "../styles/globals.scss"
import Header from "@/components/Header/Header";
import React, {Suspense, use, useEffect, useState} from "react";
import Footer from "@/components/Footer/Footer";
import ArticleContext from "@/contexts/ArticleContext";

import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import {ThemeProvider} from "@/contexts/ThemeContext";





export default function RootLayout({ children }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [searchValue, setSearchValue] = useState('');



    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/adminmenu`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data)
                setArticles(data);
                setError(null);
            } catch (e) {
                console.error("Failed to fetch articles:", e);
                setError("Failed to load articles.");
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);
    useEffect(() => {
        if (searchValue.trim() === '') {

            setFilteredArticles(articles);
            return;
        }

        const delayDebounceFn = setTimeout(async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news/search?query=${encodeURIComponent(searchValue)}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setFilteredArticles(data);
            } catch (error) {
                console.error('Ошибка при поиске:', error);
                setFilteredArticles([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchValue, articles]);
    return (
        <html lang="en">
        <body className="body-container">
            <ThemeProvider>


        <Header
            articles={filteredArticles}
            searchValue={searchValue}
            onSearchChange={setSearchValue}

        />
        {loading && <LoadingSpinner />}

        {/* 3️⃣ Контент (children) показывается ТОЛЬКО после загрузки */}
        {!loading && (
            <ArticleContext.Provider value={{ articles }}>
                {children}
                <Footer/>
            </ArticleContext.Provider>


        )}
            </ThemeProvider>
        </body>
        </html>
    );
}
