import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import {filterProducts, searchMethod} from '../redux//features/home'
import { useDispatch,useSelector } from "react-redux";


const Navbar = () => {
  const {carts} = useSelector((state)=>state.cart)
  const [nav, setNav] = useState(true);
  const [active, setActive] = useState("Home");
  const allNav = ["Home", "Login"];
  const dispatch = useDispatch()
  const handleSearch=(e)=>{
    dispatch(searchMethod(e.target.value))
    
  }
  useEffect(() => {
    const path = location.pathname.slice(1);
    const pathName = `${path.charAt(0).toUpperCase()}${path.slice(1)}`
    setActive( pathName|| "Home");
  }, );
  return (
    <>
      <div className="flex flex-col bg-blue-800 p-3 font-semibold shadow-md sticky top-0  z-30 ">
        <div className="flex justify-between">
          <div className="flex justify-center items-center text-white">
            <Link to='/' className=" text-lg" onClick={()=>{setActive("Home") ,dispatch(filterProducts('all products')) }}>Dream Shop</Link>
          </div>
          <div className=" hidden lg:flex ml-32" >
            <input
              type="text"
              name="search"
              placeholder="Search"
              className=" w-96 rounded-md outline-none p-1  "
              onChange={handleSearch}
            />
          </div>
          <div className=" hidden lg:flex gap-14 mr-40 text-white ">
            <div className=" flex justify-center gap-10 ">
              {allNav?.map((item, index) => {
                return (
                  <Link
                    className={
                      item === active
                        ? "text-lg border-b-4 border-b-slate-100"
                        : " text-lg  "
                    }
                    to={item === "Home" ? `/` : `/${item.toLowerCase()}`}
                    key={index}
                    onClick={() => {
                      setActive(item);
                    }}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>

            <div className="flex" onClick={()=>{setActive(null)}}>
              <Link to="/cart">
                <LuShoppingCart size={30} />
              </Link>
              <p className=" -mt-2">{carts.length}</p>
            </div>
          </div>
          <div
            className="lg:hidden flex justify-center items-center"
            onClick={() => {
              setNav(!nav);
            }}
          >
            {nav ? (
              <GiHamburgerMenu size={20} color="white" />
            ) : (
              <AiOutlineClose size={20} color="white" />
            )}
          </div>
        </div>
        <div
          className={
            nav
              ? "hidden"
              : " flex flex-col justify-center items-center gap-6  text-white mt-6 "
          }
        >
          <div className="  flex   gap-4  flex-col h-24  ">
            {allNav?.map((item, index) => {
              return (
                <Link
                  className={
                    item === active
                      ? "text-lg border-b-4 border-b-slate-100"
                      : " text-lg  "
                  }
                  to={item === "Home" ? `/` : `/${item.toLowerCase()}`}
                  key={index}
                  onClick={() => {
                    setActive(item);
                  }}
                >
                  {item}
                </Link>
              );
            })}
          </div>
          <div className=" flex ">
            <input
              type="text"
              name="search"
              placeholder="Search"
              className=" w-48 rounded-md outline-none p-1 text-black "
            />
          </div>
          <div className="flex">
            <Link to="/cart">
              <LuShoppingCart size={20} />
            </Link>
            <p className=" -mt-2">{carts.length}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
