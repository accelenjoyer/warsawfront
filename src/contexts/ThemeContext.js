// src/contexts/ThemeContext.jsx
"use client"; // Важно для использования хуков React и доступа к window/document

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
    useCallback,
} from "react";

// 1. Определяем тип темы (можно добавить больше, если нужно)
// export type Theme = 'light' | 'dark'; // Если используете TypeScript

// 2. Создаем контекст. Начальное значение может быть пустым или с типом по умолчанию.
const ThemeContext = createContext({
    theme: "light", // Начальная тема
    toggleTheme: () => {}, // Пустая функция-заглушка
});

// 3. Создаем провайдер для нашего контекста
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light"); // Состояние темы

    // Функция для обновления темы
    const toggleTheme = useCallback(() => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === "light" ? "dark" : "light";
            // Сохраняем выбор пользователя в localStorage
            if (typeof window !== "undefined") {
                localStorage.setItem("theme", newTheme);
            }
            console.log("Theme toggled to:", newTheme); // Логируем изменение темы
            return newTheme;
        });
    }, []); // Зависимостей нет, функция не меняется

    // useEffect для инициализации темы при монтировании компонента
    useEffect(() => {
        let initialTheme = "light";

        // Проверяем, есть ли сохраненная тема в localStorage
        if (typeof window !== "undefined") {
            const storedTheme = localStorage.getItem("theme");
            if (storedTheme) {
                initialTheme = storedTheme;
            } else {
                // Если нет сохраненной темы, проверяем системные настройки
                const prefersDarkMode = window.matchMedia(
                    "(prefers-color-scheme: dark)"
                ).matches;
                if (prefersDarkMode) {
                    initialTheme = "dark";
                }
            }
        }

        setTheme(initialTheme);
        console.log("Initial theme set:", initialTheme);

        // Применяем тему к корневому элементу (html)
        if (typeof document !== "undefined") {
            document.documentElement.setAttribute("data-theme", initialTheme);
        }

        // --- Слушаем изменения системной темы ---
        // Создаем медиа-запрос для отслеживания изменений prefer-color-scheme
        const mediaQuery =
            typeof window !== "undefined"
                ? window.matchMedia("(prefers-color-scheme: dark)")
                : null;

        const handleSystemThemeChange = (e) => {
            const newTheme = e.matches ? "dark" : "light";
            if (typeof window !== "undefined") {
                localStorage.setItem("theme", newTheme);
            }
            setTheme(newTheme);
            console.log("System theme changed to:", newTheme);
        };

        if (mediaQuery) {
            // Добавляем слушателя
            mediaQuery.addEventListener("change", handleSystemThemeChange);
        }

        // --- Очистка при размонтировании ---
        return () => {
            if (mediaQuery) {
                // Удаляем слушателя, чтобы избежать утечек памяти
                mediaQuery.removeEventListener("change", handleSystemThemeChange);
            }
        };
    }, []); // Пустой массив зависимостей означает, что этот эффект выполнится только один раз при монтировании

    // useEffect для применения data-theme при изменении состояния theme
    useEffect(() => {
        if (typeof document !== "undefined") {
            document.documentElement.setAttribute("data-theme", theme);
            console.log("Applied data-theme:", theme);
        }
    }, [theme]); // Этот эффект срабатывает каждый раз, когда theme меняется

    // Оборачиваем children в ThemeContext.Provider
    // Используем useMemo, чтобы значение контекста не пересоздавалось без необходимости
    const contextValue = useMemo(
        () => ({
            theme,
            toggleTheme,
        }),
        [theme, toggleTheme] // Зависимости для useMemo
    );

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
}

// 4. Создаем хук для удобного использования контекста
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        // Важно: Если хук используется вне провайдера, выдаем ошибку
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};