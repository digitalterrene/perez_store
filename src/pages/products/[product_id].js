import ProductCard from "@/components/other/ProductCard";
import ProductDesc from "@/components/other/ProductDesc";
import ProductReview1 from "@/components/other/ProductReview1";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsChevronRight, BsHeart, BsShare } from "react-icons/bs";

export default function Products({ product_data, product_id }) {
  const [productUnits, setProductUnits] = useState(1);
  const [products, setProducts] = useState([]);
  const [descActive, setDescActive] = useState(true);
  const switchDesc = () => {
    setDescActive(true);
  };
  const switchReviews = () => {
    setDescActive(false);
  };
  const showMoreBestSeller = () => {
    setVisibleBestSeller((prevValue) => prevValue + 5);
  };

  const addToCart = async () => {
    const order = {
      name: product_data.name,
      sku: product_data._id,
      price: product_data.price,
      units: productUnits,
      image: product_data.image,
      buyerId: user.user._id,
      userId: product_data.userId,
    };
    const response = await fetch("https://vstore-server.vercel.app/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(order),
    });
    const json = await response.json();
    if (!response.ok) {
      // setIsLoading(false)
      // setError(json.error)
    }
    if (response.ok) {
    }
  };
  const Header = () => {
    return (
      <div className="w-full bg-[#EEEEEE]  justify-between items-center py-3 px-32 flex text-sm ">
        <div className="flex items-center">
          <p className="my-auto mr-2">Category</p>/
          {product_data.category ? (
            <p className="my-auto ml-2">{product_data.category}</p>
          ) : (
            <p className="my-auto ml-2">Not Set Yet</p>
          )}
        </div>
        <div className="flex my-0 items-center ">
          <Link
            style={{ textDecoration: "none" }}
            href={`/products/edit/${product_data._id}`}
            className="my-0 ml-6 text-black cursor-pointer p-1 px-3 hover:text-cyan-400"
          >
            Edit
          </Link>
        </div>
      </div>
    );
  };
  return (
    <div className="bg-white">
      <Header />
      <div className="w-full bg-white py-10">
        <div className="w-full flex justify-center ">
          <button
            onClick={switchDesc}
            className={`  border-black border-1 text-slate-900 hover:text-cyan-400  px-8 mx-4 py-2 ${
              descActive ? "bg-black text-white" : ""
            }`}
          >
            Description
          </button>
          <button
            onClick={switchReviews}
            className={`  border-black border-1 text-slate-900 hover:text-cyan-400 px-8 mx-4 py-2 ${
              !descActive ? "bg-black text-white" : ""
            }`}
          >
            Reviews
          </button>
        </div>
        <div className=" mt-8 text-slate-500 px-28">
          {descActive ? (
            <div>
              <ProductDesc data={product_data} />
            </div>
          ) : (
            <div>
              <ProductReview1 />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { product_id } = params;
  const response = await fetch(
    `${process.env.BASE_URL}/api/products/${product_id}`,
    {
      method: "GET",
      mode: "cors",
    }
  );
  const data = await response.json();
  // console.log(data);
  return {
    props: {
      product_data: data,
      product_id,
    },
  };
}
