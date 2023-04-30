import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { ArrowLongRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Button, Typography } from "@material-tailwind/react";
import { MdOutlineClear } from "react-icons/md";
import {
  BsChevronCompactLeft,
  BsChevronCompactRight,
  BsFilterLeft,
} from "react-icons/bs";
import { FaList } from "react-icons/fa";
import ProductCard from "@/components/other/ProductCard";
import { RxDotFilled } from "react-icons/rx";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Value: Low to High", href: "#", current: false },
  { name: "Value: High to Low", href: "#", current: false },
];
const subCategories = [
  { name: "Totes", href: "#" },
  { name: "Backpacks", href: "#" },
  { name: "Travel Bags", href: "#" },
  { name: "Hip Bags", href: "#" },
  { name: "Laptop Sleeves", href: "#" },
];
const filters = [
  {
    id: "brands",
    name: "Brands",
    options: [
      { value: "nike", label: "Nike", checked: false },
      { value: "adidas", label: "Adidas", checked: false },
      { value: "reebok", label: "Reebok", checked: true },
      { value: "other", label: "Other", checked: false },
    ],
  },
  {
    id: "price",
    name: "Prices",
    options: [
      { value: "10 -", label: "10", checked: false },
      { value: "50 +", label: "50", checked: false },
      { value: "100 +", label: "100", checked: true },
      { value: "1000 +", label: "1000", checked: false },
      { value: "10 000 +", label: "10 000", checked: false },
    ],
  },
  {
    id: "participants",
    name: "Participants",
    options: [
      { value: "10 -", label: "10", checked: false },
      { value: "50 +", label: "50", checked: false },
      { value: "100 +", label: "100", checked: true },
      { value: "1000 +", label: "1000", checked: false },
      { value: "10 000 +", label: "10 000", checked: false },
    ],
  },
  {
    id: "participations",
    name: "Participations",
    options: [
      { value: "10 -", label: "10", checked: false },
      { value: "50 +", label: "50", checked: false },
      { value: "100 +", label: "100", checked: true },
      { value: "1000 +", label: "1000", checked: false },
      { value: "10 000 +", label: "10 000", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

//nature
import n1 from "../../assets/carousels/nature/1.jpg";
import n2 from "../../assets/carousels/nature/2.jpg";
import n3 from "../../assets/carousels/nature/3.jpg";

//clothing
import c1 from "../../assets/carousels/clothing/1.jpg";
import c2 from "../../assets/carousels/clothing/2.jpg";
import c3 from "../../assets/carousels/clothing/3.jpg";

//shoes
import s1 from "../../assets/carousels/shoes/1.jpg";
import s2 from "../../assets/carousels/shoes/2.jpg";
import s3 from "../../assets/carousels/shoes/3.jpg";

//skincare
import sk1 from "../../assets/carousels/skincare/1.jpg";
import sk2 from "../../assets/carousels/skincare/2.jpg";
import sk3 from "../../assets/carousels/skincare/3.jpg";
import CardSkeleton from "@/components/skeleton/CardSkeleton";

export default function EntityProfileView({ products_data, category }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [toggleFilterVisibility, setToggleFilterVisibility] = useState(true);
  const [fieldToSearch, setFieldToSearch] = useState("all_fields");
  const [keyValue, setKeyValue] = useState("");
  const [products, setProducts] = useState(products_data);
  const [loading, setLoading] = useState(false);
  const [toggleGrids, setToggleGrids] = useState(true);

  const bg =
    "https://img.freepik.com/free-vector/background-realistic-abstract-technology-particle_23-2148431735.jpg?size=626&ext=jpg&uid=R86751016&ga=GA1.2.628197184.1681078697&semt=ais";

  let slides = [];

  if (category === "clothing") {
    slides = [c1, c2, c3];
  } else if (category === "nature") {
    slides = [n1, n2, n3];
  } else if (category === "shoes") {
    slides = [s1, s2, s3];
  } else {
    slides = [sk1, sk2, sk3];
  }
  const loadMore = async () => {
    const response = await fetch("/api/products/category", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key_value: category,
        skip: products.length,
        limit: 45,
      }),
    });
    const data = await response.json();
    console.log(data);

    if (response.ok && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        setProducts((prevValue) => [...prevValue, data[i]]);
      }
    }
  };
  useEffect(() => {
    setProducts(products_data);
  }, [category]);

  //
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    let skip;
    if (products.length < 25) {
      skip = "";
    } else {
      skip = products.length;
    }
    const response = await fetch(`/api/products/all_fields`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key_value: keyValue,
        skip: skip,
        limit: 15,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
    if (response.ok) {
      setProducts(json);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const SlideShow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
      const isLastSlide = currentIndex === slides.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
      setCurrentIndex(slideIndex);
    };
    return (
      <div className="group border h-[780px] z-60 w-full m-auto relative">
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].src})` }}
          className="w-full h-full bg-center duration-500 bg-cover"
        >
          {/* left arrow */}
        </div>
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevSlide} />
        </div>
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} />
        </div>
        <div className="flex top-4 justify-center py-2">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="text-2xl cursor-pointer"
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div>
      <SlideShow />
      <div className="">
        <div className="">
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t bg-black border-gray-200">
                      {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-t border-gray-200 px-4 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <div className="mx-auto w-full px-12 ">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl capitalize font-bold tracking-tight text-gray-900">
                {category}
              </h1>

              <div className="flex items-center">
                <form
                  onSubmit={handleSearch}
                  className="relative text-gray-600"
                >
                  <input
                    type="text"
                    name="search"
                    placeholder="Search"
                    onChange={(e) => setKeyValue(e.target.value)}
                    className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 mt-3 mr-4"
                  >
                    <svg
                      className="h-4 w-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      id="Capa_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 56.966 56.966"
                      width="512px"
                      height="512px"
                    >
                      <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                  </button>
                </form>
                <Menu as="div" className="relative ml-8 inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <a
                                href={option.href}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {option.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            {toggleGrids ? (
              <div aria-labelledby="products-heading" className="pb-24  pt-6">
                <div className="">
                  <div className="mb-6 w-64  items-center flex justify-between">
                    {toggleFilterVisibility && (
                      <Typography variant="h6">Filters</Typography>
                    )}
                    {!toggleFilterVisibility ? (
                      <BsFilterLeft
                        className="text-lg"
                        onClick={() =>
                          setToggleFilterVisibility(!toggleFilterVisibility)
                        }
                      />
                    ) : (
                      <MdOutlineClear
                        className="text-lg"
                        onClick={() =>
                          setToggleFilterVisibility(!toggleFilterVisibility)
                        }
                      />
                    )}
                  </div>
                  <div className="  w-full flex grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    {/* Filters */}
                    {toggleFilterVisibility && (
                      <form className=" hidden lg:block">
                        {filters.map((section) => (
                          <Disclosure
                            as="div"
                            key={section.id}
                            className="border-b border-gray-200 py-6"
                          >
                            {({ open }) => (
                              <>
                                <h3 className="-my-3 flow-root">
                                  <Disclosure.Button className="flex w-64 items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                    <span className="font-medium text-gray-900">
                                      {section.name}
                                    </span>
                                    <span className="ml-6 flex items-center">
                                      {open ? (
                                        <MinusIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <PlusIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                  <div className="space-y-4">
                                    {section.options.map(
                                      (option, optionIdx) => (
                                        <div
                                          key={option.value}
                                          className="flex items-center"
                                        >
                                          <input
                                            id={`filter-${section.id}-${optionIdx}`}
                                            name={`${section.id}[]`}
                                            defaultValue={option.value}
                                            type="checkbox"
                                            defaultChecked={option.checked}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                          />
                                          <label
                                            htmlFor={`filter-${section.id}-${optionIdx}`}
                                            className="ml-3 text-sm text-gray-600"
                                          >
                                            {option.label}
                                          </label>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      </form>
                    )}

                    {products && products.length === 0 ? (
                      <div>No products found</div>
                    ) : (
                      <>
                        <div
                          className={
                            toggleFilterVisibility
                              ? " col-span-4 flex flex-wrap mb-4  w-full"
                              : "col-span-4 flex flex-wrap mb-4  w-full"
                          }
                        >
                          {loading ? (
                            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((r, i) => (
                              <CardSkeleton key={i} />
                            ))
                          ) : (
                            <div className="flex flex-wrap gap-y-16">
                              {products &&
                                products.map((data, i) => (
                                  <ProductCard key={i} data={data} />
                                ))}
                              <div className="flex mb-16  w-full mx-auto mt-24 justify-center">
                                <button
                                  onClick={loadMore}
                                  className=" relative inline-flex items-center  hover:border-collapse justify-start overflow-hidden transition-all rounded-3xl  group/btn"
                                >
                                  {/* purple box */}
                                  <span className="w-0 h-full  rounded-3xl bg-cyan-400 absolute top-0 left-0 ease-out duration-500 transition-all group-hover/btn:w-full -z-1  py-2 "></span>
                                  <span className="w-full  px-4 group-hover/btn:border-cyan-400 border-2 border-black text-slate-900 group-hover/btn:text-white delay-400   transition-colors rounded-3xl duration-300 ease-in-out z-50 py-2 ">
                                    Load more
                                  </span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {loading ? (
                  <p>iluyrheilu</p>
                ) : (
                  <>
                    <ProductCard products={products} />
                    <Button
                      onClick={loadMore}
                      variant="text"
                      className="flex my-8 items-center gap-2"
                    >
                      Load More{" "}
                      <ArrowLongRightIcon strokeWidth={2} className="h-5 w-5" />
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { category } = params;

  const response = await fetch(`http://localhost:3000/api/products/category`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key_value: category, limit: 45, skip: 0 }),
  });
  const data = await response.json();
  console.log(data);
  return {
    props: {
      products_data: data,
      category,
    },
  };
}
