export default function PreviewTextFromHtml(htmlString) {
    // Регулярное выражение для поиска первого абзаца.
    // <p>       : ищет открывающий тег <p>
    // (.*?)     : захватывает любой символ (.) ноль или более раз (*)
    //             лениво (?), чтобы остановиться на первом же </p>
    // </p>      : ищет закрывающий тег </p>
    const paragraphRegex = /<p>(.*?)<\/p>/s; // Флаг 's' позволяет '.' соответствовать переводам строки

    const match = htmlString.match(paragraphRegex);

    if (match && match[1]) {
        // match[0] - это весь найденный HTML (<p>...</p>)
        // match[1] - это содержимое внутри скобок (.*?), то есть текст абзаца

        // Дополнительно: убрать лишние пробелы в начале и конце текста
        let previewText = match[1].trim();


         const maxLength = 180; // Например, 150 символов
         if (previewText.length > maxLength) {
             previewText = previewText.substring(0, maxLength) + "...";
         }

        return previewText;
    } else {
        // Если абзац не найден, возвращаем что-то по умолчанию или пустую строку
        return "Нет текста для превью.";
    }
}