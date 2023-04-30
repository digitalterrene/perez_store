import React, { useEffect, useState } from "react";
import { BsCart, BsHeart } from "react-icons/bs";
import { AiFillEye, AiTwotoneEye } from "react-icons/ai";

import { useCart } from "react-use-cart";

const ProductCard = ({ data }) => {
  const PATH2 = "https://vstore-server.vercel.app/products";

  const { addItem } = useCart();

  const deleteProduct = async () => {
    // const response = await fetch(`${PATH2}/${data._id}`, {
    //   method: "DELETE",
    //   mode: "cors",
    // });
    // const json = await response.json();
    // if (!response.ok) {
    // }
    // if (response.ok) {
    // }
  };

  return (
    <div>
      {data && (
        <div className="h-full  w-auto  mx-2 lg:mx-8  border">
          <div
            style={{ backgroundImage: `url(${data.image})` }}
            className="group flex flex-col justify-between relative w-[200px] lg:w-[260px] h-[200px] lg:h-[260px] bg-center bg-cover"
          >
            <div className="p-3 flex justify-between">
              <div>
                <BsHeart className="hidden group-hover:block text-2xl text-white" />
              </div>
            </div>
            <div className=" hidden group-hover:block text-center flex-col items-center">
              <a
                href={`/products/${data._id}`}
                className="flex  no-underline text-gray-600 group/view hover:text-cyan-400 items-center py-auto  flex-col justify-center  w-full botton my-2 group"
              >
                <div className=" group-hover/view:hidden w-28 h-10  justify-center flex items-center  py-2 bg-white">
                  <div className="w-full h-full">Quick View</div>
                </div>
                <div className=" hidden group-hover/view:block w-28 h-10 text-center bg-black text-white items-center justify-center py-2 ">
                  <AiFillEye className="w-full h-full" />
                </div>
              </a>
              <button
                onClick={() =>
                  addItem({
                    name: data.name,
                    category: data.category,
                    image: data.image,
                    price: data.price,
                    id: data._id,
                  })
                }
                className="flex  no-underline text-gray-600 group/view hover:text-cyan-400 items-center py-auto  flex-col justify-center  w-full botton my-2 group"
              >
                <div className=" group-hover/view:hidden w-28 h-10 justify-center flex items-center  py-2 bg-white">
                  {" "}
                  <div className="w-full h-full">Quick Shop</div>
                </div>
                <div className=" hidden group-hover/view:block w-28 h-10 text-center bg-black text-white items-center justify-center  py-2 ">
                  <BsCart className="w-full h-full" />
                </div>
              </button>
            </div>
            <div className="mt-6">
              <p className="hidden group-hover:block text-center text-white">
                S,M,L
              </p>
            </div>
          </div>
          <div className="my-2 px-2  w-full">
            <p className="font-medium truncate ">{data.title}</p>

            <p className="text-lg text-slate-500 font-medium">${data.price}</p>
            <p className=" capitalize font-medium">{data.category}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
