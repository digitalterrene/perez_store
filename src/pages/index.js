import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/native/Header";
import Hero from "@/components/other/Hero";
import Categories from "@/components/other/Categories";
import Footer from "@/components/native/Footer";
import ProductCard from "@/components/other/ProductCard";
import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import Link from "next/link";

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
    <div className=" ">
      <div className=" ">
        <div className="  ">
          <div className=" ">
            <div className="relative">
              <img
                src="https://i.ibb.co/q5k5j57/bench-accounting-nvzv-OPQW0gc-unsplash-1-1.png"
                alt="A work table with house plants"
                className="w-full h-full hidden lg:block"
              />
              <img
                src="https://i.ibb.co/94jQFsV/bench-accounting-nvzv-OPQW0gc-unsplash-1-1.png"
                alt="A work table with house plants"
                className="hidden sm:block lg:hidden w-full h-full"
              />
              <img
                src="https://i.ibb.co/cJz8LZ2/bench-accounting-nvzv-OPQW0gc-unsplash-1-1.png"
                alt="A work table with house plants"
                className="sm:hidden w-full h-full"
              />

              <div className="absolute z-10 top-0 left-0 mx-4 sm:mx-0 mt-36 sm:mt-0 sm:py-20 md:py-28 lg:py-20 xl:py-28 sm:pl-14 flex flex-col sm:justify-start items-start">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-800 sm:w-8/12">
                  Shop with us
                </h1>
                <p className="text-base leading-normal text-gray-800 mt-4 sm:mt-5 sm:w-5/12">
                  Experience seamless shopping with us. Explore a curated
                  selection of products, enjoy hassle-free navigation, and shop
                  with confidence knowing that your satisfaction is our
                  priority. Discover convenience, quality, and a personalized
                  shopping journey like no other.
                </p>
                <button className="hidden sm:flex bg-gray-800 py-4 px-8 text-base font-medium text-white mt-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-700">
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          {/* Categories section */}
          <div className="pb-16">
            <div className="flex justify-center items-center">
              <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
                <div className="flex flex-col jusitfy-center items-center space-y-10">
                  <div className="flex flex-col justify-center items-center space-y-2">
                    <p className="text-xl leading-5 text-gray-600">
                      Clothing Accessories
                    </p>
                    <h1 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-gray-800">
                      Shop By Category
                    </h1>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-4 md:gap-x-8 w-full">
                    <div className="relative group flex justify-center items-center h-full w-full">
                      <img
                        className="object-center object-cover h-full w-full"
                        src="https://i.ibb.co/ThPFmzv/omid-armin-m-VSb6-PFk-VXw-unsplash-1-1.png"
                        alt="girl-image"
                      />
                      <Link
                        className="focus:outline-none text-center focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white"
                        href={"/categories/clothing"}
                      >
                        Clothing
                      </Link>
                      <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                    </div>
                    <div className="flex flex-col space-y-4 md:space-y-8 mt-4 md:mt-0">
                      <div className="relative group flex justify-center items-center h-full w-full">
                        <img
                          className="object-center object-cover h-full w-full"
                          src="https://i.ibb.co/SXZvYHs/irene-kredenets-DDqx-X0-7v-KE-unsplash-1.png"
                          alt="shoe-image"
                        />
                        <Link
                          className="focus:outline-none text-center focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white"
                          href={"/categories/shoes"}
                        >
                          Shoes
                        </Link>

                        <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                      </div>
                      <div className="relative group flex justify-center items-center h-full w-full">
                        <img
                          className="object-center object-cover h-full w-full"
                          src="https://i.ibb.co/Hd1pVxW/louis-mornaud-Ju-6-TPKXd-Bs-unsplash-1-2.png"
                          alt="watch-image"
                        />
                        <Link
                          className="focus:outline-none text-center focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white"
                          href={"/categories/skincare"}
                        >
                          Skincare
                        </Link>

                        <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                      </div>
                    </div>
                    <div className="relative group justify-center items-center h-full w-full hidden lg:flex">
                      <img
                        className="object-center object-cover h-full w-full"
                        src="https://i.ibb.co/PTtRBLL/olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-1.png"
                        alt="girl-image"
                      />
                      <Link
                        className="focus:outline-none text-center focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white"
                        href={"/categories/formal"}
                      >
                        Formal
                      </Link>

                      <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="items-center -mt-4 flex justify-center flex-col mx-4 text-black">
            <p className="text-2xl uppercase">Recommended</p>
            <p>Top view in this week</p>
          </div>
          <div className="grid lg:grid-cols-4  w-full gap-8">
            {products && products.map((d, i) => <ProductCard data={d} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
