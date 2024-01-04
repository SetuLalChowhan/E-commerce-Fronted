import React, { useEffect, useState } from "react";
import { allProducts } from "../redux/features/home";
import { useDispatch, useSelector } from "react-redux";
import CustomPagination from "../components/CustomPagination";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import {filterProducts,priceListOrder}from '../redux/features/home'

const Home = () => {
  const { products, loading, currentPage, pagePerPost } = useSelector(
    (state) => state.allProducts
  );
  const category = [
    "All Products",
    "Electronics",
    "Jewelery",
    "Guy's Clothing",
    "Lady's Clothing",
  ];
  // const priceOrder = ["Default", "High to Low", "Low to High"];
  const [cat, setCat] = useState("All Products");
  
  const [ord, setOrd] = useState("Default");
  const indexofLastPost = currentPage * pagePerPost;
  const indexofFirstPost = indexofLastPost - pagePerPost;
  const PerPage = products.slice(indexofFirstPost, indexofLastPost);
  const totalPages = Math.ceil(products.length / pagePerPost);

  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(priceListOrder(value))
    setOrd(value)
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allProducts());
  }, []);

  console.log(PerPage)


  
  return (
    <div className=" ">
      <div className="flex justify-end lg:mr-56 md:mt-14 mt-10  gap-4 rounded-md p-6 outline-none">
        <h1>Price Order</h1>
        <select id="order" onChange={handleChange} value={ord}>
          <option value="Default">Default</option>
          <option value="High to Low">High to Low</option>
          <option value="Low to High">Low to High</option>
        </select>
      </div>
      <div className="">
        <h1 className="text-center md:text-5xl font-semibold text-4xl">
          Our{" "}
          <span className="md:text-5xl font-bold text-blue-600 text-4xl">Products</span>
        </h1>
        <div className="flex flex-row  justify-center items-center  ">
          <div className=" text-white lg:flex lg:flex-row  grid  grid-rows-2 grid-cols-3 lg:gap-3 gap-1  lg:justify-center lg:items-center mt-7   lg:mt-8 rounded-md   ">
            {category.map((item, index) => {
              return (
                <div
                  key={index}
                  className=""
                  onClick={() => {
                    setCat(item);
                    dispatch(filterProducts(item))
                    setOrd("Default")
                  }}
                >
                  <button
                    className=" lg:text-lg font-semibold bg-blue-600 pr-1 pl-1  duration-700 lg:h-9 rounded-sm"
                  >
                    {item}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div></div>
      </div>
      <div>
        <div className="">
          {loading ? (
            <div className="w=[100%] h-[100%] flex justify-center items-center mt-80">
              <Loading />
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-4 lg:ml-28 mt-8 md:grid-cols-2">
              {PerPage.map((item, index) => {
                return (
                  <div key={index}>
                    <ProductCard item={item}/>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex justify-center items-center mt-10">
          <CustomPagination totalPages={totalPages} />
        </div>
      </div>
      <Footer/>
    </div>
  );
};
export default Home;
