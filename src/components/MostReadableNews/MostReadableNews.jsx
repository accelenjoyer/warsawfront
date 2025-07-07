"use client"
import React, { useState, useEffect } from 'react';
import "./MostReadableNews.scss";
import Image from 'next/image';
import moment from 'moment';
import 'moment/locale/ru';
import truncateText from "@/lib/truncateText";
import formatDate from "@/lib/formatDate";
import Link from "next/link";
import getViewsWord from "@/lib/getViewsWord";

const splitTitleIntoLines = (title, maxLength = 30) => {
    const words = title.split(' ');
    const lines = [];
    let current = '';

    words.forEach(word => {
        if ((current + ' ' + word).trim().length <= maxLength) {
            current += (current ? ' ' : '') + word;
        } else {
            lines.push(current);
            current = word;
        }
    });

    if (current) lines.push(current);
    return lines;
};

const MostReadableNews = ({articles}) => {
    if (!articles || articles.length === 0) {
        console.log("2222")
        return <p>Загрузка ...</p>;
    }
    return (
        <div className="most-readable-container">
            <h1>Самые читаемые новости недели</h1>
            <div className="news-2x2-grid">
                {articles.slice(0, 4).map((article, i) => (
                    <div key={article._id || i} className="news-box">
                        <div className="top-block">
                            <Link href={`/news/${article._id}`}>
                                <Image
                                    src={article.images}
                                    alt=""
                                    width={550}
                                    height={370}
                                    className="news-image"
                                />
                            </Link>
                            <div className="text-container">
                                <div className="news-overlay">
                                    <Link href={`/news/${article._id}`} className="link">
                                        {splitTitleIntoLines(article.title,30).map((line, idx) => (
                                            <div key={idx} className="title-block">
                                                {line}
                                            </div>
                                        ))}
                                    </Link>
                                </div>
                                <div className="main-text">
                                    <p>{article.content}</p>
                                   <p style={{marginTop:"12px",textTransform:"uppercase",fontSize: "10px"}}> Автор: {article.author} {formatDate(article.date)} {article.views} {getViewsWord(article.views.length,0)}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default MostReadableNews;