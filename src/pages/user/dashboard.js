import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const tabss = [
  {
    title: "balance",
    amount: 100,
    flac: 20,
    id: 1,
    icon: "https://img.icons8.com/3d-fluency/256/credit-card-front.png",
  },
  {
    title: "products",
    amount: 100,
    count: 20,
    id: 2,
    icon: "https://img.icons8.com/color/256/package.png",
  },
  {
    title: "orders",
    amount: 100,
    count: 20,
    id: 2,
    icon: "https://img.icons8.com/color/256/package.png",
  },
  {
    title: "sales",
    amount: 23100,
    count: 20,
    id: 3,
    icon: "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/256/external-sold-web-store-flaticons-lineal-color-flat-icons.png",
  },
];
function Dashboard() {
  const [tabs, setTabs] = useState(tabss);
  const [tab, setTab] = useState(tabs[0]);
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
    <div className="">
      {" "}
      <div className="flex w-full px-16 justify-between">
        <Tabs className={" w-full "}>
          <TabList className={"flex justify-evenly mb-2 pb-2"}>
            {tabs.map((t, i) => (
              <Tab frameBorder={90} key={i}>
                {" "}
                <div className={`flex  ${t.id === i ? "" : ""}`}>
                  <img
                    src={t && t.icon && `${t.icon}`}
                    alt="products"
                    className="w-10 h-10"
                  />
                  <div className="flex text-sm">
                    <div className="mr-4">
                      <small className="font-medium capitalize text-slate-600">
                        {t.title}
                      </small>
                      <h4 className="mb-0 text-green-600 font-semibold">
                        R {t && t.amount && `${t.amount}`}
                      </h4>
                    </div>
                    <div className="text-xs mt-1 font-semibold">
                      {t && t.count ? `${t.count}` : `+${t.flac}`}
                    </div>
                  </div>
                </div>
              </Tab>
            ))}
          </TabList>
          <div className="flex justify-end my-6 px-16 font-semibold text-slate-600 ">
            <Link href={"/products/create"}>Add product</Link>
          </div>
          <TabPanel>
            <div className="flex flex-col  w-4/6 mx-auto m-6 px-10">
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
                                  className="text-indigo-600 mr-10 hover:text-indigo-900"
                                >
                                  View
                                </Link>
                                <a
                                  href="#"
                                  className="text-indigo-600 hover:text-indigo-900"
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
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
        </Tabs>
        ;
      </div>
      ;
    </div>
  );
}

export default Dashboard;
