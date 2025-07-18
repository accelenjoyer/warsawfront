// src/components/ThemeToggler.jsx
"use client"; // Обязательно для использования хуков React

import React from 'react';
// Импортируем стили для самого переключателя
import './ThemeToggler.scss';
// Импортируем иконки (нужно установить react-icons: npm install react-icons)
import { FaSun, FaMoon } from 'react-icons/fa';
// Импортируем наш хук для работы с темой
import { useTheme } from '@/contexts/ThemeContext'; // Убедитесь, что путь правильный

const ThemeToggler = () => {
    // Получаем текущую тему и функцию для ее переключения из нашего контекста
    const { theme, toggleTheme } = useTheme();

    console.log('ThemeToggler rendered. Current theme:', theme); // Логирование для отладки

    // Функция, которая будет вызываться при изменении состояния чекбокса
    // Она будет принимать объект события (event)
    const handleToggle = (event) => {
        console.log('Checkbox onChange triggered. Event:', event); // Логирование для отладки
        // Вызываем функцию toggleTheme из контекста
        toggleTheme();
    };

    return (
        <div className="theme-toggle">
            <FaSun className="theme-toggle__icon theme-toggle__icon--sun" /> {/* Добавляем классы для стилизации */}
            <label className="theme-toggle__switch">
                {/*
                    input элемент должен быть внутри label, чтобы клик по label срабатывал.
                    type="checkbox" - Это обычный чекбокс.
                    checked={theme === 'dark'} - Состояние чекбокса зависит от текущей темы.
                                              Если тема 'dark', чекбокс будет отмечен.
                    onChange={handleToggle} - Обработчик события изменения состояния чекбокса.
                                             Мы передаем наш handleToggle, который вызывает toggleTheme.
                */}
                <input
                    type="checkbox"
                    checked={theme === 'dark'} // Значение checked зависит от текущей темы
                    onChange={handleToggle}      // Обработчик, который вызывает toggleTheme
                />
                {/* Слайдер - это псевдоэлемент ::before/::after, который стилизуется через CSS */}
                <span className="theme-toggle__slider"></span>
            </label>
            <FaMoon className="theme-toggle__icon theme-toggle__icon--moon" /> {/* Добавляем классы для стилизации */}
        </div>
    );
};

export default ThemeToggler;