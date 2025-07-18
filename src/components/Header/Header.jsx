"use client"
import React, {useEffect, useRef, useState} from 'react';
import "./Header.scss"
import Image from "next/image";
import title from "../../../public/title.png"
import { FaBars, FaSearch, FaEllipsisV, FaTimes } from 'react-icons/fa';
import ThemeToggler from "@/components/ThemeToggler/ThemeToggler";
import wordEndings from "@/lib/getViewsWord";
import getViewsWord from "@/lib/getViewsWord";
import Link from "next/link";

const Header = ({ articles, searchValue, onSearchChange,}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchbarOpen, setSearchbarOpen] = useState(false);
    const [additionalBarOpen,setAdditionalBarOpen] = useState(false)
    const deactivateTimerRef = useRef(null);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const toggleSearchBar = () => setSearchbarOpen(!searchbarOpen);
    const ActivateAdditionalBar = () => {

        if (deactivateTimerRef.current) {
            clearTimeout(deactivateTimerRef.current);
            deactivateTimerRef.current = null;
        }
        setAdditionalBarOpen(true);
    };

    const DeActivateAdditionalBar = () => {

        deactivateTimerRef.current = setTimeout(() => {
            setAdditionalBarOpen(false);
        }, 100);
    };
    const clearSearch = () => onSearchChange('');


    useEffect(() => {
        const body = document.body;
        const html = document.documentElement;

        if (sidebarOpen) {
            body.style.overflow = "hidden";
            html.style.overflow = "hidden";
        } else {
            body.style.overflow = "";
            html.style.overflow = "";
        }

        return () => {
            body.style.overflow = "";
            html.style.overflow = "";
        };
    }, [sidebarOpen]);
    useEffect(() => {
        return () => {
            if (deactivateTimerRef.current) {
                clearTimeout(deactivateTimerRef.current);
            }
        };
    }, []);


    const searchResults = searchbarOpen && Array.isArray(articles)
        ? articles.slice(0, 4)
        : [];

    return (
        <>
            <div className="header-container">
                <div className="header-menu">
                    <FaBars className="header-icon" onClick={toggleSidebar} />
                    <FaSearch className="header-icon" onClick={toggleSearchBar} />
                    <FaEllipsisV className="header-icon" onMouseEnter={ActivateAdditionalBar} onMouseLeave={DeActivateAdditionalBar}/>
                    <div className={`additional-wrapper ${additionalBarOpen ? 'open' : ''}`} onMouseEnter={ActivateAdditionalBar} onMouseLeave={DeActivateAdditionalBar}>
                        <div className="additional-block">
                            <ul>
                                <li>Город</li>
                                <li>Транспорт</li>
                                <li>Люди</li>
                                <li>Политика</li>
                                <li>Здоровье</li>
                                <li>Происшествия</li>
                                <li>Полезное</li>
                            </ul>
                        </div>
                        <div className="additional-block"></div>
                        <div className="additional-block"></div>
                    </div>
                </div>
                <Link href={`/news/`}>
                <Image src={title} alt="title" width={150} height={20} />
                </Link>
                <div className="theme-menu">
                    <ThemeToggler/>
                </div>
            </div>

            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="logo-part">

                    <Image src={title} alt="title" width={150} height={20} />
                    <span onClick={toggleSidebar}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="close-icon"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </span>
                </div>
                <h2 className="razdel">Разделы</h2>
                <ul>
                    <li>Город</li>
                    <li>Транспорт</li>
                    <li>Люди</li>
                    <li>Политика</li>
                    <li>Здоровье</li>
                    <li>Происшествия</li>
                    <li>Полезное</li>
                </ul>
            </div>

            <div className={`searchbar-wrapper ${searchbarOpen ? 'open' : ''}`}>
                <div className="searchbar">
                    <div className="input-container">
                        <FaSearch className="icon search-icon" />
                        <input
                            type="text"
                            placeholder="Поиск..."
                            value={searchValue}
                            onChange={e => onSearchChange(e.target.value)}
                            autoFocus={searchbarOpen}
                        />
                        {searchValue && (
                            <FaTimes
                                className="icon clear-icon"
                                onClick={clearSearch}
                                role="button"
                                aria-label="Очистить поиск"
                            />
                        )}
                    </div>

                    <div className="search-results">
                        {searchbarOpen && (
                            <>
                                {searchValue ? (
                                    searchResults.length > 0 ? (
                                        searchResults.map(article => (
                                            <div key={article._id} className="search-item">
                                                <Link href={`/news/${article._id}`}>
                                                <Image
                                                    src={article.images}
                                                    alt={article.title}
                                                    width={60}
                                                    height={60}
                                                    className="search-img"
                                                />
                                                </Link>
                                                <div className="article-info">
                                                    <Link href={`/news/${article._id}`}>
                                                    <p className="search-title">{article.title}</p>
                                                    </Link>
                                                    <span>{article.views} {getViewsWord(article.views,0)}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p style={{ color: "white" }}>Ничего не найдено</p>
                                    )
                                ) : (

                                    articles
                                        .sort(() => 0.5 - Math.random())
                                        .slice(0, 4)
                                        .map(article => (
                                            <div key={article._id} className="search-item">
                                                <Link href={`/news/${article._id}`} onClick={()=> setSearchbarOpen(false)}>
                                                <Image
                                                    src={article.images}
                                                    alt={article.title}
                                                    width={60}
                                                    height={60}
                                                    className="search-img"
                                                />
                                                </Link>
                                                <div className="article-info">
                                                    <Link href={`/news/${article._id}`} onClick={()=> setSearchbarOpen(false)}>
                                                    <p className="search-title">{article.title}</p>
                                                    </Link>
                                                    <span>{article.views} {getViewsWord(article.views,0)}</span>
                                                </div>
                                            </div>
                                        ))
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {sidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar} />}

        </>
    );
};

export default Header;
