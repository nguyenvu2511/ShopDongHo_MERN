import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';

function DetailNews() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [news] = state.newsAPI.news;
  const [nnew, setNews] = useState('');

  useEffect(() => {
    if (params.id) {
      news.forEach((item) => {
        if (item._id === params.id) setNews(item);
      });
    }
  }, [params.id, news]);

  return (
    <>
      <div className="container">
        <h3>{nnew.title}</h3>
        {nnew && nnew.content && nnew.content.html && (
          <div dangerouslySetInnerHTML={{ __html: nnew.content.html }}></div>
        )}
      </div>
    </>
  );
}

export default DetailNews;
