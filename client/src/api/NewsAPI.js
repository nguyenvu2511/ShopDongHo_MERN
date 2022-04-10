import { useState, useEffect } from 'react';
import axios from 'axios';

function NewsAPI() {
  const [news, setNews] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getNews = async () => {
      const res = await axios.get('/api/news');
      setNews(res.data);
    };

    getNews();
  }, [callback]);
  return {
    news: [news, setNews],
    callback: [callback, setCallback],
  };
}

export default NewsAPI;
