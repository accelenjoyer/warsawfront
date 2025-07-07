const splitTitleIntoLines = (title, maxLength = 30) => {
    const words = title.split(' ');
    const lines = [];
    let current = '';

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const testLine = current ? current + ' ' + word : word;

        // если следующая строка переполнится — добавляем текущую в результат
        if (testLine.length > maxLength) {
            if (current) {
                lines.push(current);
                current = word; // начинаем новую строку
            } else {
                // если слово само по себе больше maxLength — режем его
                lines.push(word);
                current = '';
            }
        } else {
            current = testLine;
        }
    }

    if (current) {
        lines.push(current);
    }

    // Алгоритм выравнивания: если последняя строка слишком короткая, перетаскиваем часть из предыдущей
    if (lines.length >= 2) {
        const last = lines[lines.length - 1];
        const secondLast = lines[lines.length - 2];

        // если последняя слишком короткая и вторая позволяет – попробуем сбалансировать
        if (last.length < maxLength * 0.5 && secondLast.split(' ').length > 1) {
            const secondLastWords = secondLast.split(' ');
            const movedWord = secondLastWords.pop();
            lines[lines.length - 2] = secondLastWords.join(' ');
            lines[lines.length - 1] = movedWord + ' ' + last;
        }
    }

    return lines;
};
export default splitTitleIntoLines;