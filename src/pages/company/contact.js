import React, { useState } from "react";

export default function Contact() {
  return (
    <div className="h-screen   w-full">
      <div className="bg-gradient-to-b  bg-no-repeat bg-cover bg-center   w-full">
        <div className="w-full flex   p-4 items-center h-full justify-center my-12">
          <div className=" w-full  lg:w-fit  border border-black rounded py-12 lg:px-28 px-8">
            <p className="md:text-3xl text-xl font-bold leading-7 text-center text-gray-700">
              Need help and talk to us!
            </p>
            <div className="md:flex items-center mt-12">
              <div className="md:w-72 flex flex-col">
                <label className="text-base font-semibold leading-none text-gray-800">
                  Name
                </label>
                <input
                  tabIndex={0}
                  arial-label="Please input name"
                  type="name"
                  className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
                  placeholder="Please input  name"
                />
              </div>
              <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                <label className="text-base font-semibold leading-none text-gray-800">
                  Email Address
                </label>
                <input
                  tabIndex={0}
                  arial-label="Please input email address"
                  type="name"
                  className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
                  placeholder="Please input email address"
                />
              </div>
            </div>
            <div>
              <div className="w-full flex flex-col mt-8">
                <label className="text-base font-semibold leading-none text-gray-800">
                  Message
                </label>
                <textarea
                  tabIndex={0}
                  aria-label="leave a message"
                  role="textbox"
                  type="name"
                  className="h-36 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 resize-none"
                  defaultValue={""}
                />
              </div>
            </div>

            <div className="flex items-center justify-center w-full">
              <button className="mt-9 text-base font-semibold leading-none border hover:text-white py-4 px-10 rounded hover:bg-black      ">
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
