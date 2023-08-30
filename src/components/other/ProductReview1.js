import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";

const ProductReview1 = () => {
  const [menu, setMenu] = useState(true);
  const [menu1, setMenu1] = useState(false);
  return (
    <div className="py-12 px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center">
      <div className="flex flex-col justify-start items-start w-full space-y-8">
        <div className="flex justify-start items-start">
          <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
            Reviews
          </p>
        </div>
        <div className="w-full flex justify-start items-start flex-col bg-gray-50 p-8">
          <Typography variant="h4">No reviews yet</Typography>
        </div>
      </div>
    </div>
  );
};

export default ProductReview1;
