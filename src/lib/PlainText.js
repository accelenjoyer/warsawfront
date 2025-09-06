import "./Text.scss"
function PlainText({ html }) {
    // Добавляем проверку на наличие html
    const sanitizedHtml = html || '';

    return (
        <div
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}  // Правильный формат
            className="clean-html-content"
        />
    );
}
export default PlainText