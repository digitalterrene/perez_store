import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/native/Header";
import Hero from "@/components/other/Hero";
import Categories from "@/components/other/Categories";
import Footer from "@/components/native/Footer";
import ProductCard from "@/components/other/ProductCard";
import { data } from "autoprefixer";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);

  const fetchProducts = async () => {
    const response = await fetch(`/api/products/all_fields`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ key_value: "", skip: skip, limit: 45 }),
    });

    const json = await response.json();
    console.log(json);
    if (response.ok && json.length > 0) {
      setProducts(json);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="w-full h-full">
      <Hero />
      <Categories />
      <div className="flex justify-center my-16 lg:my-40">
        <div className=" items-center text-black">
          <hr className="w-40 " />
        </div>
        <div className="items-center -mt-4 flex justify-center flex-col mx-4 text-black">
          <p className="text-2xl uppercase">Recommended</p>
          <p>Top view in this week</p>
        </div>
        <div className=" items-center text-black">
          <hr className="w-40 " />
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-center gap-y-8">
        {products && products.map((d, i) => <ProductCard data={d} />)}
      </div>
    </div>
  );
}
