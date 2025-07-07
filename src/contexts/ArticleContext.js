import { createContext, useContext } from 'react';

const ArticleContext = createContext({
    articles: [],

});

export function useArticleContext() {
    return useContext(ArticleContext);
}

export default ArticleContext;