import React, { createContext, useState, useEffect } from 'react';
import ProductsAPI from './api/ProductsAPI';
import UserAPI from './api/UserAPI';
import axios from 'axios';
import CategoriesAPI from './api/CategoriesAPI';
import BrandsAPI from './api/BrandsAPI';
export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const refreshToken = async () => {
    const res = await axios.get('/user/refresh_token');

    setToken(res.data.accesstoken);
  };

  useEffect(() => {
    const fisrtLogin = localStorage.getItem('fisrtLogin');

    if (fisrtLogin) refreshToken();
  }, []);
  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    userAPI: UserAPI(token),
    categoriesAPI: CategoriesAPI(),
    brandsAPI: BrandsAPI(),
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
