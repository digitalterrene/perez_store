import { useAuthContext } from "@/hooks/useAuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const { dispatch, user } = useAuthContext();
  const router = useRouter();
  const deleteProduct = async (id) => {
    if (user && user.email != "admin@gmail.com") {
      const toastId = toast.loading("Deleting product..");
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (!response.ok) {
        toast.error(`${json.error}`, {
          id: toastId,
        });
      }
      if (response.ok) {
        toast.success(`${json.message}`, {
          id: toastId,
        });

        setTimeout(() => {
          router.reload();
        }, 3000);
      }
    } else {
      const toastId = toast.loading("Failied to delete..");
      toast.error("You are not the admin. Request rejected", {
        id: toastId,
      });
    }
  };
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
    //console.log(json);
    if (response.ok && json.length > 0) {
      setProducts(json);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full  ">
      {" "}
      <div className="flex w-full   justify-between">
        <Tabs className={" w-full "}>
          <div className="flex justify-center text-sm bg-[#EEEEEE] gap-20 p-6 text-black  px-16 font-semibold   ">
            <p> My Dashboard</p>
            <Link href={"/products/create"}>Add product</Link>
          </div>
          <TabPanel>
            <div className="flex flex-col  lg:w-4/6 mx-auto m-6 lg:uytfr5px-10">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden border-b border-gray-200  shadow-md">
                    <table className="min-w-full overflow-x-scroll divide-y divide-gray-200">
                      <thead className="bg-[#EEEEEE]">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-black uppercase"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-black uppercase"
                          >
                            Quanity
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-black uppercase"
                          >
                            Price
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {products &&
                          products.map((p, i) => (
                            <tr
                              key={i}
                              className="transition-all hover:bg-gray-100 hover:shadow-lg"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 w-10 h-10">
                                    <img
                                      className="w-10 h-10 rounded-md"
                                      src={
                                        p && p.image
                                          ? `${p.image}`
                                          : "https://img.freepik.com/free-vector/illuminated-neon-lights-stage-realistic-vector_1441-3734.jpg?size=626&ext=jpg&uid=R86751016&ga=GA1.1.628197184.1681078697&semt=robertav1_2_sidr"
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {p && p.title ? `${p.title}` : "___"}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {p && p.category
                                        ? `${p.category}`
                                        : "___"}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                  {p && p.in_stock ? `${p.in_stock}` : "___"}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                {p && p.price ? `R${p.price}` : "___"}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                <Link
                                  href={`/products/${p._id}`}
                                  className="text-black hover:bg-black p-4 py-2 hover:text-white mr-10  "
                                >
                                  View
                                </Link>
                                <a
                                  href="#"
                                  onClick={() => deleteProduct(p._id)}
                                  className="text-black p-4 py-2 hover:bg-black hover:text-white"
                                >
                                  Delete
                                </a>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
      <Toaster />
    </div>
  );
}

export default Dashboard;
