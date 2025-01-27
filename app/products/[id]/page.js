'use client';

import { useEffect, useState } from 'react';
import ProductDetail from '../../../components/ProductDetail';
import { useParams } from 'next/navigation';

const ProductPage = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/products.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const foundProduct = data.find(p => p.id === id);
        setProduct(foundProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return <ProductDetail product={product} />;
};

export default ProductPage;