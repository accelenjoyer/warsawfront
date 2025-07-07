  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('ru-RU');
};
export default formatDate;