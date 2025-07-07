"use client"
import React, { useState } from 'react';
import "./ThemeToggler.scss";
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggler = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);

        if (isDarkMode) {
            document.documentElement.classList.remove('dark-mode');
        } else {
            document.documentElement.classList.add('dark-mode');
        }
    };

    return (
        <div className="theme-toggle">
            <FaSun className="theme-toggle__icon" />
            <label className="theme-toggle__switch">
                <input
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={toggleTheme}
                />
                <span className="theme-toggle__slider" />
            </label>
            <FaMoon className="theme-toggle__icon" />
        </div>
    );
};

export default ThemeToggler;