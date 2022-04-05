import { useState, useEffect } from 'react';
import axios from 'axios';

function BrandsAPI() {
  const [brands, setBrands] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get('/api/brand');
      setBrands(res.data);
    };

    getCategories();
  }, [callback]);
  return {
    brands: [brands, setBrands],
    callback: [callback, setCallback],
  };
}

export default BrandsAPI;
