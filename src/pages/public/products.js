import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Product, Searchildren, InputSelect } from '../../components';
import { apiGetProduct } from '../../apis/product';
import Masonry from 'react-masonry-css';
import { sorts } from '../../ultils/contants';

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [activeClick, setActiveClick] = useState(null);
  const [sort, setSort] = useState(null);
  const [id, setId] = useState(null);

  const fetchProductsByCategory = async (categoryId) => {
    const response = await apiGetProduct(categoryId);
    if (response) {
      setProducts(response);
    }
  };

  const { category } = useParams();

  const fetchData = async (category) => {
    try {
      const response = await fetch(`http://localhost:5000/category/id?name=${category}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      const id = result._id
      setId(id); // Set the id when it's available
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  useEffect(() => {
    fetchData(category);
  }, [category]);

  useEffect(() => {
    // Call fetchProductsByCategory when id is available
    if (id) {
      fetchProductsByCategory(id);
    }
  }, [id]);

  const fetchProductsWithSort = async () => {
    try {
      const queryParams = new URLSearchParams({ sort }); // Create a URLSearchParams object
      const url = `http://localhost:5000/category/${id}?${queryParams.toString()}`; // Sửa ở đây
  
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (error) {
      console.error('Error fetching products with sort:', error);
    }
  };
  
  
  

  useEffect(() => {
    if (sort) {
      fetchProductsWithSort();
    } else {
      // Call fetchProductsByCategory when sort is not present
      if (id) {
        fetchProductsByCategory(id);
      }
    }
  }, [sort, id]);

  const changeActiveFitler = useCallback((name) => {
    if (activeClick === name) setActiveClick(null);
    else setActiveClick(name);
  }, [activeClick]);

  const changeValue = useCallback((value) => {
    setSort(value);
  }, []);

  return (
    <div>
      <div className='h-[81px] flex justify-center items-center bg-gray-100'>
        <div className='w-main'>
          <h3 className='font-semibold text-[25px]'>{category}</h3>
        </div>
      </div>
      <div className='w-main border p-4 flex justify-between mt-8 m-auto'>
        <div className='w-4/5 flex-auto flex flex-col'>
          <span className='font-semibold'>Filter by</span>
          <div className='flex items-center gap-3'>
            <Searchildren name='Price' activeClick={activeClick} changeActiveFitler={changeActiveFitler} />
          </div>
        </div>
        <div className='w-1/5 flex-auto flex flex-col'>
          <span className='font-semibold'>Sord by</span>
          <div className='w-full'>
            <InputSelect changeValue={changeValue} value={sort} options={sorts} />
          </div>
        </div>
      </div>
      <div className='mt-8 w-main m-auto'>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid flex mx-[-10px] mb-4"
          columnClassName="my-masonry-grid_column">
          {products?.map((el) => (
            <Product key={el.id} pid={el.id} productData={el} />
          ))}
        </Masonry>
      </div>
      <div className='h-[400px]'></div>
    </div>
  );
}

export default Products;
