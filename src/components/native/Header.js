import React, { useEffect, useState } from "react";
import logo from "../../assets/native/logo.png";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useRouter } from "next/router";
import { FiUser } from "react-icons/fi";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useCart } from "react-use-cart";
export default function Header() {
  const [searchInput, setSearchInput] = useState(true);
  const [mdOptionsToggle, setMdOptionsToggle] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const { user, dispatch } = useAuthContext();
  const [totalItemss, setTotalItemss] = useState(0);
  const { isEmpty, totalItems } = useCart();

  useEffect(() => {
    setTotalItemss(totalItems);
  }, []);
  const router = useRouter();
  return (
    <div className="dark:bg-gray-900 w-screen  bg-red-900 lg:w-full">
      <div className="relative">
        {/* For md screen size */}
        <div
          id="md-searchbar"
          className={`${
            mdOptionsToggle ? "hidden" : "flex"
          }   dark:bg-gray-900 lg:hidden py-3 bg-red-600 px-6 items-center justify-between`}
        >
          <div className="flex items-center space-x-3 text-gray-800 ">
            <input
              type="text"
              placeholder="Search for products"
              className="text-sm leading-none dark:text-gray-300 dark:bg-gray-900 text-gray-600 focus:outline-none"
            />
          </div>
        </div>
        {/* For md screen size */}
        {/* For large screens */}
        <div className="   bg-gray-50 px-6 py-2 sticky top-0">
          <div className="container mx-auto flex items-center justify-between">
            <Link href={"/"}>
              <img src={logo.src} alt="perez store" className="w-20 h-16" />
            </Link>
            <ul className="hidden w-8/12 -mr-32 md:flex items-center justify-center space-x-8">
              <li>
                <a
                  href="/categories/clothing"
                  className=" capitalize text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                >
                  clothing
                </a>
              </li>
              <li>
                <a
                  href="/categories/skincare"
                  className=" capitalize text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                >
                  skincare
                </a>
              </li>
              <li>
                <a
                  href="/categories/shoes"
                  className=" capitalize text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                >
                  shoes
                </a>
              </li>
              <li>
                <a
                  href="/categories/formal"
                  className=" capitalize text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                >
                  formal
                </a>
              </li>
            </ul>
            <div className="md:w-2/12 justify-end flex items-center space-x-4 xl:space-x-8">
              <div className="hidden text-2xl lg:flex items-center space-x-4 xl:space-x-8">
                <button
                  onClick={() => router.push("/customers/wishlist")}
                  aria-label="view favourites"
                  className="text-gray-800 dark:hover:text-gray-300  focus:outline-none focus:ring-2 focus:ring-gray-800"
                >
                  <AiOutlineHeart />
                </button>
                <button
                  onClick={() =>
                    router.push(user ? "/user/profile" : "/user/login")
                  }
                  aria-label="go to cart"
                  className="text-gray-800 dark:hover:text-gray-300  focus:outline-none focus:ring-2 focus:ring-gray-800"
                >
                  <FiUser />
                </button>
                <div
                  onClick={() => router.push("/customers/cart")}
                  aria-label="go to cart"
                  className="text-gray-800 cursor-pointer flex dark:hover:text-gray-300  focus:outline-none focus:ring-2 focus:ring-gray-800"
                >
                  <HiOutlineShoppingBag />
                  {!isEmpty && (
                    <p className="bg-red-600 text-sm font-semibold -mt-2 -ml-2 w-6 h-6  flex items-center justify-center rounded-full text-white ">
                      {totalItemss}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex lg:hidden">
                <button
                  aria-label="show options"
                  onClick={() => setMdOptionsToggle(!mdOptionsToggle)}
                  className="text-black  dark:hover:text-gray-300 hidden md:flex focus:outline-none focus:ring-2 rounded focus:ring-gray-600"
                >
                  <svg
                    className="fill-stroke"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6H20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 12H20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 18H20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  aria-label="open menu"
                  onClick={() => setShowMenu(true)}
                  className="text-black  dark:hover:text-gray-300 md:hidden focus:outline-none focus:ring-2 rounded focus:ring-gray-600"
                >
                  <svg
                    className="fill-stroke"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6H20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 12H20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 18H20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* For small screen */}
        <div
          id="mobile-menu"
          className={`${
            showMenu ? "flex" : "hidden"
          } absolute dark:bg-gray-900 z-[999] inset-0 md:hidden flex-col h-fit   bg-white w-full`}
        >
          <div className="flex items-center w-full justify-between border-b border-gray-200 dark:border-gray-700 pb-4 p-4">
            <div className="flex items-center space-x-3">
              <div>
                <svg
                  className="fill-stroke text-gray-800 "
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.9984 18.9999L14.6484 14.6499"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search for products"
                className="text-sm dark:bg-gray-900 text-gray-600 placeholder-gray-600 dark:placeholder-gray-300 focus:outline-none"
              />
            </div>
            <button
              onClick={() => setShowMenu(false)}
              aria-label="close menu"
              className="focus:outline-none focus:ring-2 rounded focus:ring-gray-600"
            >
              <svg
                className="fill-stroke text-gray-800 "
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4L4 12"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 4L12 12"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 bg-white p-4">
            <ul className="flex flex-col  space-y-6">
              <li>
                <a
                  href="/categories/clothing"
                  className=" capitalize flex items-center justify-between hover:underline text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
                >
                  clothing
                  <div>
                    <svg
                      className="fill-stroke text-black "
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.5 3L7.5 6L4.5 9"
                        stroke="currentColor"
                        strokeWidth="0.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/categories/skincare"
                  className=" capitalize flex items-center justify-between hover:underline text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
                >
                  skincare
                  <div>
                    <svg
                      className="fill-stroke text-black "
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.5 3L7.5 6L4.5 9"
                        stroke="currentColor"
                        strokeWidth="0.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/catgeories/shoes"
                  className=" capitalize flex items-center justify-between hover:underline text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
                >
                  shoes
                  <div>
                    <svg
                      className="fill-stroke text-black "
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.5 3L7.5 6L4.5 9"
                        stroke="currentColor"
                        strokeWidth="0.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/categories/nature"
                  className=" capitalize flex items-center justify-between hover:underline text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
                >
                  nature
                  <div>
                    <svg
                      className="fill-stroke text-black "
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.5 3L7.5 6L4.5 9"
                        stroke="currentColor"
                        strokeWidth="0.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div className="  bg-red-900 flex items-end">
            <ul className="flex flex-col space-y-8 bg-gray-50 w-full py-10 p-4 dark:bg-gray-800">
              <li>
                <a
                  href="/customers/cart"
                  className=" text-gray-800 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                >
                  <div>
                    <svg
                      className="fill-stroke"
                      width={22}
                      height={22}
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.33333 1L1 5V19C1 19.5304 1.23413 20.0391 1.65087 20.4142C2.06762 20.7893 2.63285 21 3.22222 21H18.7778C19.3671 21 19.9324 20.7893 20.3491 20.4142C20.7659 20.0391 21 19.5304 21 19V5L17.6667 1H4.33333Z"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1 5H21"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.4436 9C15.4436 10.0609 14.9753 11.0783 14.1418 11.8284C13.3083 12.5786 12.1779 13 10.9991 13C9.82039 13 8.68993 12.5786 7.85643 11.8284C7.02294 11.0783 6.55469 10.0609 6.55469 9"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-base">Cart</p>
                </a>
              </li>
              <li>
                <a
                  href="/customers/wishlist"
                  className=" text-gray-800 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                >
                  <div>
                    <svg
                      className="fill-stroke"
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.3651 3.84172C16.9395 3.41589 16.4342 3.0781 15.8779 2.84763C15.3217 2.61716 14.7255 2.49854 14.1235 2.49854C13.5214 2.49854 12.9252 2.61716 12.369 2.84763C11.8128 3.0781 11.3074 3.41589 10.8818 3.84172L9.99847 4.72506L9.11514 3.84172C8.25539 2.98198 7.08933 2.49898 5.87347 2.49898C4.65761 2.49898 3.49155 2.98198 2.6318 3.84172C1.77206 4.70147 1.28906 5.86753 1.28906 7.08339C1.28906 8.29925 1.77206 9.46531 2.6318 10.3251L3.51514 11.2084L9.99847 17.6917L16.4818 11.2084L17.3651 10.3251C17.791 9.89943 18.1288 9.39407 18.3592 8.83785C18.5897 8.28164 18.7083 7.68546 18.7083 7.08339C18.7083 6.48132 18.5897 5.88514 18.3592 5.32893C18.1288 4.77271 17.791 4.26735 17.3651 3.84172V3.84172Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-base">Wishlist</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
