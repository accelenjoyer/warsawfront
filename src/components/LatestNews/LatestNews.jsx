import React, {useState} from 'react';
import "./LatestNews.scss"
import Image from "next/image";
import formatDate from "@/lib/formatDate";
import Link from "next/link";
import ShowMoreButton from "@/components/ShowMoreButton/ShowMoreButton";
import PreviewTextFromHtml from "@/lib/PreviewTextFromHtml";
const LatestNews = ({ articles }) => {

    const [visibleCount, setVisibleCount] = useState(4);

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 4);
    };

    const sortedArticles = articles
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const visibleArticles = sortedArticles.slice(0, visibleCount);

    const truncateContent = (content, maxLength = 100) => {
        if (content.length <= maxLength) {
            return content;
        }
        return content.substring(0, maxLength) + "...";
    };

    return (
        <div style={{display: "flex",flexDirection : "column",alignItems: "center"}}>
            <h2 style={{color: "black"}}>Последние новости</h2>
            <div className="latest-container">
                {visibleArticles.map((article, i) => (
                    <div key={article._id || i} className="latest-box">
                        <div className="image-box">
                            <Link href={`/news/${article._id}`}>
                            <Image
                                src={article.images}
                                alt=""
                                width={270}
                                height={170}
                                className="news-image"
                            />
                            </Link>
                        </div>
                        <div className="latest-content">
                            <div className="latest-overlay">
                                <Link href={`/news/${article._id}`}>
                               {article.title}
                                </Link>
                            </div>
                            <div className="latest-text">
                                <div dangerouslySetInnerHTML={{ __html: PreviewTextFromHtml(article.content) }} />
                                <span className="info">{formatDate(article.date)}</span>
                            </div>
                        </div>

                    </div>

                ))}

            </div>
            <ShowMoreButton visibleCount={visibleCount} setVisibleCount={setVisibleCount}/>

        </div>
    );
};
export default LatestNews;