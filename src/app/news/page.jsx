"use client"
import React, {useEffect, useState} from 'react';
import Header from "@/components/Header/Header";
import MostReadableNews from "@/components/MostReadableNews/MostReadableNews";
import LatestNews from "@/components/LatestNews/LatestNews";
import Footer from "@/components/Footer/Footer";
import SecondCategorySection from "@/components/SecondCategorySection/SecondCategorySection";
import {useArticleContext} from "@/contexts/ArticleContext";
import "./page.scss"

function Home() {
    const { articles} = useArticleContext();
    return (
        <div className="main-box" >
            <MostReadableNews articles={articles}/>
            <LatestNews articles={articles}/>
            <SecondCategorySection articles={articles}/>
        </div>
    );
}
export default Home

