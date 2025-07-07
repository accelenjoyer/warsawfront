import React from 'react';
import Header from "@/components/Header/Header";
import Image from 'next/image';
import "./article.scss"
import splitTitleIntoLines from "@/lib/splitTitleIntoLines";
import formatDate from "@/lib/formatDate";
import ViewTracker from "@/components/ViewTracker/ViewTracker";
import Link from "next/link";

export default async function NewsPage({ params }) {
    const { id } = params;


    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news/${id}`,
        {
            cache: 'no-store'
        }
    );

    if (!res.ok) {
        return <div>Новость не найдена</div>;
    }

    const article = await res.json();

    return (
        <div className="main-article-container">

            <ViewTracker articleId={id}/>
                <Image src={article.images} alt="" width={1160} height={773}/>
                <div className="title-part">
                    <div className="category-part">
                        {article.categories.map(category => (

                            <div key={category._id} className="cat">{category.name ? category.name : "бля"}</div>

                        ))}
                    </div>
                    <div className="title">
                        {splitTitleIntoLines(article.title).map((line, idx) => (
                            <span key={idx} className="title-blocker">{line}</span>
                        ))}
                    </div>

                    <div className="article-info">
                        <span>АВТОР:{article.author}</span> <span>{formatDate(article.date)}</span>
                    </div>
                </div>
            <div className="content-part">
                {article.content}
            </div>

        </div>
    );
}