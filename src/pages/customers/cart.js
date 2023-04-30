import React, { useState } from "react";
import { useCart } from "react-use-cart";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Button, Option, Select, Typography } from "@material-tailwind/react";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import Link from "next/link";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Toaster, toast } from "react-hot-toast";

export default function Cart() {
  const [inputs, setInputs] = useState({});
  const [city, setCity] = useState("");
  const { user } = useAuthContext();
  const {
    isEmpty,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
    totalItems,
    emptyCart,
  } = useCart();

  const handleChange = (event) => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = async () => {
    const toastId = toast.loading("Loading...");
    if (!isEmpty && Object.keys(inputs).length > 0) {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: items,
          amount: cartTotal,
          shipping: { ...inputs, city: city },
          user_id: user.user._id,
        }),
      });
      const json = await response.json();
      if (json && response.ok) {
        toast.success(`${json.message}`, { id: toastId });
      } else {
        toast.error(`${json.error}`, { id: toastId });
      }
    } else {
      toast.error("Cart can not be empty", { id: toastId });
    }
  };
  return (
    <div className="bg-gray-100">
      <div className="container border-none flex mx-auto mt-10">
        <div className=" my-10 w-full pb-4 ">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">3 Items</h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                Quantity
              </h3>
              <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">
                Price
              </h3>
              <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">
                Total
              </h3>
            </div>
            {isEmpty ? (
              <Typography className="text-gray-00" variant="h6">
                Cart is empty. Please add items to view
              </Typography>
            ) : (
              <>
                {items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                  >
                    <div className="flex w-2/5">
                      <div className="w-20">
                        <img className="h-24" src={item.image} alt="" />
                      </div>
                      <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm">{item.name}</span>
                        <span className="text-red-500 text-xs">
                          {item.category}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          href="#"
                          className="font-semibold w-24 text-start hover:text-red-500 text-gray-500 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-center w-1/5">
                      <AiOutlineMinus
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                        className="cursor-pointer "
                      />
                      <p className="mx-2 my-0 border text-center w-8">
                        {item.quantity}
                      </p>
                      <AiOutlinePlus
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                        className="cursor-pointer "
                      />
                    </div>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      ${item.price}
                    </span>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      ${item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
          {!isEmpty && (
            <div className="flex items-center flex-start pt-4">
              <Link
                href="/"
                className="flex hover:text-green-400 text-cyan-400 items-center my-auto font-semibold ml-4  text-sm "
              >
                <HiOutlineArrowLongLeft className="text-xl mr-4" />
                Continue Shopping
              </Link>
              <div>
                <Button
                  onClick={() => emptyCart()}
                  className="mx-8 rounded-none text-white bg-cyan-400 hover:bg-red-800"
                  variant="text"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          )}
          <div className=" pt-12">
            <p className="text-xl font-semibold leading-5 text-gray-800">
              Shipping Details
            </p>
          </div>
          <div className="mt-8 w-3/4 flex flex-wrap justify-between  items-start ">
            <input
              className="px-2 w-64  focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-3 "
              type="text"
              name="firstname"
              value={inputs.firstname}
              onChange={handleChange}
              placeholder="First Name"
            />
            <input
              className="px-2  focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-3 w-3/6"
              type="text"
              name="lastname"
              value={inputs.lastname}
              onChange={handleChange}
              placeholder="Last Name"
            />
            <textarea
              className="px-2 w-3/6 mr-3 my-6 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-3 ]"
              type="text"
              name="address"
              value={inputs.address}
              onChange={handleChange}
              placeholder="Address"
            />
            <textarea
              className="px-2  w-80 my-6 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-3 ]"
              type="text"
              name="address_2"
              value={inputs.address_2}
              onChange={handleChange}
              placeholder="Address (line 02)"
            />
            <div className=" w-1/2">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className=" py-3 flex flex-col w-full"
              >
                <option
                  value={"johannesburg"}
                  style={{ height: 10 }}
                  className="w-1/2 py-2 h-6"
                >
                  Johannesburg
                </option>
                <option
                  value={"pretoria"}
                  style={{ height: 10 }}
                  className="w-1/2 py-2 h-6"
                >
                  Pretoria
                </option>
                <option
                  value={"capetown"}
                  style={{ height: 10 }}
                  className="w-1/2 py-2 h-6"
                >
                  Cape Town
                </option>
                <option
                  value={"eastlondon"}
                  style={{ height: 10 }}
                  className="w-1/2 py-2 h-6"
                >
                  East London
                </option>
                <option
                  value={"durban"}
                  style={{ height: 10 }}
                  className="w-1/2 py-2 h-6"
                >
                  Durban
                </option>
              </select>
            </div>
            <input
              className="focus:outline-none w-72 focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4   "
              type="text"
              name="phone_number"
              value={inputs.phone_number}
              onChange={handleChange}
              placeholder="Phone Number"
            />
          </div>
        </div>

        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold flex items-center text-sm uppercase">
              <p className="text-gray-500 my-0 mr-3">Items </p>
              {totalItems}
            </span>
            <span className="font-semibold text-sm">$ {cartTotal}</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">
              Shipping
            </label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - $10.00</option>
            </select>
          </div>
          <div className="py-10">
            <label
              for="promo"
              className="font-semibold inline-block mb-3 text-sm uppercase"
            >
              Promo Code
            </label>
            <input
              type="text"
              id="promo"
              placeholder="Enter your code"
              className="p-2 text-sm w-full"
            />
          </div>
          <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
            Apply
          </button>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>$ {cartTotal}</span>
            </div>
            <button
              onClick={() => handleSubmit()}
              className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
            >
              Checkout
            </button>
          </div>
        </div>
        <Toaster />
      </div>
    </div>
  );
}
