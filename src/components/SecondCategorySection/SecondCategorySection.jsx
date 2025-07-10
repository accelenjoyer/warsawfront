"use client"
import React, {useState} from 'react';
import "./SecondCategorySection.scss"
import Image from "next/image"
import Link from "next/link";
import ShowMoreButton from "@/components/ShowMoreButton/ShowMoreButton";
import formatDate from "@/lib/formatDate";


const SecondCategorySection = ({articles}) => {
    const [visibleCount, setVisibleCount] = useState(8);
    const truncateContent = (content, maxLength = 100) => {
        if (content.length <= maxLength) {
            return content;
        }
        return content.substring(0, maxLength) + "...";
    };

    return (
        <div className="second-container">
            <h2 style={{color: "black"}}>Категория</h2>
            <div className="grid-container">
                {articles.slice(0,visibleCount).map((article) => (
                    <div key={article.id} className="grid-item">
                        <div className="item-header">
                            <div className="categories">
                                {article.categories.map(cat => (
                                    <Link href={`/categories/${cat.slug}`}>
                                    <span key={cat._id} className="category-item">{cat.name},</span>
                                    </Link>
                                ))}
                            </div>
                            <Link href={`/news/${article._id}`}>
                            <Image
                                src={article.images}
                                alt={article.title}
                                width={90}
                                height={90}
                                style={{objectFit: 'cover'}}
                            />
                            </Link>
                        </div>
                        <div className="text-containerer">
                            <Link href={`/news/${article._id}`}>
                            <h3>{article.title}</h3>
                            </Link>
                            <p className="content-text">{truncateContent(article.content)}</p>
                            <div className="article-date">{formatDate(article.date)}</div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default SecondCategorySection;



