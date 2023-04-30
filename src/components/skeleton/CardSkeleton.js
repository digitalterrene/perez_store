import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";
import React from "react";

const CardSkeleton = () => {
  return (
    <Card style={{ padding: "0px" }} className="animate-pulse w-[300px]  mx-4 ">
      <CardHeader
        className="animate-pulse h-auto mx-0 my-0 rounded-none rounded-tr-2xl rounded-tl-2xl"
        floated={false}
        color="blue-gray"
      >
        <div className="animate-pulse h-[200px] rounded-tr-2xl bg-gray-200 rounded-tl-2xl w-full"></div>
      </CardHeader>
      <CardBody>
        <div className="animate-pulse mb-3 flex items-center justify-between">
          <div className="animate-pulse text-blue-gray h-5 bg-gray-200 font-medium">
            <div
              variant="h5"
              color="blue-gray"
              className="animate-pulse bg-gray-200 font-medium h-5"
            ></div>
          </div>
          <div className="animate-pulse bg-gray-200 flex w-full items-center h-8 rounded-lg  gap-1.5 font-normal"></div>
        </div>
        <div className="animate-pulse bg-gray-200 line-clamp-3 h-20"></div>
        <div className="animate-pulse group mt-8 inline-flex flex-wrap items-center gap-2"></div>
      </CardBody>
      <CardFooter className="animate-pulse pt-3 flex items-center justify-between">
        <div className="animate-pulse h-8 w-full inline-block px-6 py-2.5 bg-gray-200 text-white font-medium text-xs leading-tight uppercase rounded-full  hover:bg-blue-700 hover: focus:bg-blue-700  transition duration-150 ease-in-out"></div>
        <div className="animate-pulse w-6 h-6"></div>
      </CardFooter>
    </Card>
  );
};

export default CardSkeleton;
