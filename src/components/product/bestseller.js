import React, { useState, useEffect } from "react";
import { apiGetProducts } from "apis/product";
import { Customslider } from '..';
import { getNewProducts } from 'store/products/asyncAction';
import { useDispatch } from "react-redux";

const tabs = [
    { id: 1, name: 'Đặc Biệt' },
    { id: 2, name: 'Mới Nhất' },
];

const BestSellers = () => {
    const [bestSellers, setBestSellers] = useState(null);
    const [activedTab, setActivedTab] = useState(1);
    const [products, setProducts] = useState(null);
    const dispatch = useDispatch();

    const fetchProducts = async (sort) => {
        const response = await apiGetProducts({ sort });
        if (response) {
            setBestSellers(response);
            const specialProducts = response.filter((product) => product.special === true);
            setProducts(specialProducts);
        }
    }

    useEffect(() => {
        fetchProducts('-sold'); // Sản phẩm đặc biệt được sắp xếp theo số lượng bán
        dispatch(getNewProducts());
    }, [dispatch]);

    useEffect(() => {
        if (activedTab === 1) {
            setProducts(bestSellers);
        } else if (activedTab === 2) {
            fetchProducts('-createdAt'); // Sản phẩm mới nhất được sắp xếp theo thời gian tạo
        }
    }, [activedTab, bestSellers]);

    return (
        <div>
            <div className="flex text-[20px] ml-[-32px]">
                {tabs.map(el => (
                    <span
                        onClick={() => setActivedTab(el.id)}
                        key={el.id}
                        className={`px-8 cursor-pointer font-bold capitalize border-r text-gray-400 ${
                            activedTab === el.id ? 'text-gray-900' : ''
                        }`}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className="mt-4 mx-[-10px] pt-4 border-t-2 border-main">
                <Customslider products={products} />
            </div>
        </div>
    );
}

export default BestSellers;
