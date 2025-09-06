
import React from 'react';
import "./category.scss"
import Image from "next/image";
import Link from "next/link";
import getViewsWord from "@/lib/getViewsWord";
import formatDate from "@/lib/formatDate";
import PreviewTextFromHtml from "@/lib/PreviewTextFromHtml";


const Ogranichenie = (text, OgranichitelValue) => {
    const textLength = text.length;
    const ogranichennoeLength = textLength - OgranichitelValue;


    if (ogranichennoeLength < 0) {
        return "";
    }

    const resultText = text.slice(0, ogranichennoeLength);

    return resultText;
}
export default async function CategoryPage({ params }) {

    const { slug } = params;

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories/${slug}`,
            {
                cache: 'no-store' // Для динамических данных
            }
        );
        if (!res.ok) {
            throw new Error('Не удалось загрузить категорию');
        }

        const data = await res.json();
        console.log(data);
        const categoriesMap = data.categories.reduce((acc, category) => {
            acc[category._id] = category;
            return acc;
        }, {});

        return (
            <div className="category-page">
                <div className="category-name">
                    <span style={{fontSize: "14px"}}>Категория</span>
                    <h1 style={{fontSize : "50px"}}>{data.cat.name}</h1>
                    <span style={{color : "#818181"}}>{data.articles.length} {getViewsWord(data.articles.length,1)}</span>
                </div>
                <div className="main-box">
                    {data.articles.map((article) => (
                        <div className="article-part">
                          <div className="img-part">
                              <Link href={`/news/${article._id}`}>
                                  <Image src={article.images}
                                         alt=""
                                         fill={true}
                                         style={{ objectFit: 'cover' }} />
                              </Link>

                          </div>
                            <div className="text-part">
                                <div>
                                    {article.categories.map(categoryId => {
                                        const category = categoriesMap[categoryId];
                                        return (

                                            <Link key={categoryId} href={`/categories/${category.slug}`}>
                                                <span className="categoryy">{category.name},</span>
                                            </Link>




                                        );
                                    })}
                                </div>

                                <Link href={`/news/${article._id}`}>
                                    <span className="title-info">{article.title}</span>
                                </Link>
                                <p className="main-texter"><div dangerouslySetInnerHTML={{ __html: PreviewTextFromHtml(article.content) }} /></p>
                                <div className="date-box">
                                    <span> {formatDate(article.date)}</span>
                                    <span>
                                        {article.views} {getViewsWord(article.views,0)}
                                        <svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="60" width="10" height="40" fill="#808080"/>
  <rect x="30" y="40" width="10" height="60" fill="#808080"/>
  <rect x="50" y="80" width="10" height="20" fill="#808080"/>

</svg>
                                    </span>
                                </div>
                            </div>

                        </div>

                    ))}
                </div>

            </div>
        );
    } catch (error) {
        console.error("Ошибка при загрузке категории:", error);
        return <div>Ошибка: {error.message}</div>;
    }
}
