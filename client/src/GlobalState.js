import React, { createContext, useState, useEffect } from 'react';
import ProductsAPI from './api/ProductsAPI';
import UserAPI from './api/UserAPI';
import axios from 'axios';
import CategoriesAPI from './api/CategoriesAPI';
import BrandsAPI from './api/BrandsAPI';
import NewsAPI from './api/NewsAPI';
export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const refreshToken = async () => {
      const res = await axios.get('/user/refresh_token');
      setTimeout(() => {
        refreshToken();
      }, 15000);
      setToken(res.data.accesstoken);
    };
    refreshToken();
  }, []);
  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    userAPI: UserAPI(token),
    categoriesAPI: CategoriesAPI(),
    brandsAPI: BrandsAPI(),
    newsAPI: NewsAPI(),
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
