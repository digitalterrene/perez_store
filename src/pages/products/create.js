import { useAuthContext } from "@/hooks/useAuthContext";
import { Option, Select } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AiOutlinePlusSquare } from "react-icons/ai";

const Header = () => {
  return (
    <div className="w-full bg-[#EEEEEE] items-center px-20 py-3 justify-center flex text-lg text-slate-600 font-medium">
      <p className="my-auto mr-2">Create Product</p>
    </div>
  );
};
export default function Create() {
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [specTitle, setSpecTitle] = useState("");
  const [specDetails, setSpecDetails] = useState("");
  const [specs, setSpecs] = useState([]);
  const { user, dispatch } = useAuthContext();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("perez_shop_user");
    dispatch({ type: "LOGOUT" });
  };

  const postImage = (pics) => {
    const toastId = toast.loading("Loading...");
    if (pics === undefined) {
      toast.error(`Product image is required. `, {
        id: toastId,
        className: "capitalize",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", `${process.env.CLOUDINARY_APP}`);
      data.append("cloud_name", `${process.env.CLOUDINARY_CLOUDNAME}`);
      fetch(`${process.env.CLOUDINARY_CREDS}dfg/image/upload`, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then(async (data) => {
          setImage(data.url.toString());
          console.log(data.url.toString());
          toast.success(`Successfully uploaded image.`, {
            id: toastId,
            className: "capitalize",
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error(`${err} `, {
            id: toastId,
            className: "capitalize",
          });
        });
    } else {
      toast.error("Please select image", {
        id: toastId,
        className: "capitalize",
      });
      return;
    }
  };
  const postImages = (pics) => {
    const toastId = toast.loading("Loading...");
    let results = [];
    pics.forEach((pic) => {
      if (pic === undefined) {
        toast.error(`Product image is required. `, {
          id: toastId,
          className: "capitalize",
        });
        return;
      }
      if (pic.type === "image/jpeg" || pic.type === "image/png") {
        const data = new FormData();
        data.append("file", pic);
        data.append("upload_preset", `${process.env.CLOUDINARY_APP}`);
        data.append("cloud_name", `${process.env.CLOUDINARY_CLOUDNAME}`);
        fetch(`${process.env.CLOUDINARY_CREDS}/image/upload`, {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then(async (data) => {
            results.push(data.url.toString());
            console.log(data.url.toString());
            toast.success(`Successfully uploaded image.`, {
              id: toastId,
              className: "capitalize",
            });
          })
          .catch((err) => {
            console.log(err);
            toast.error(`${err} `, {
              id: toastId,
              className: "capitalize",
            });
          });
      } else {
        toast.error("Please select image", {
          id: toastId,
          className: "capitalize",
        });
        return;
      }
    });
    setImages(results);
  };
  const handleInputs = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const toastId = toast.loading("Loading...");
    let data = { ...inputs };
    if (image) {
      data = { ...data, image: image };
    }
    if (images) {
      data = { ...data, images: images };
    }
    if (specs) {
      data = { ...data, specs: specs };
    }
    if (Object.keys(data).length > 0) {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (!response.ok) {
        toast.error(`${json.error}`, {
          id: toastId,
        });
      }
      if (response.ok) {
        toast.success("Product created successfully", {
          id: toastId,
        });
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    } else {
      toast.error("Fields required", {
        id: toastId,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    sendRequest();
  };

  return (
    <div className=" ">
      <Header />
      <div class="relative   flex flex-col min-w-0 break-words pb-10  items-center w-full mb-6 border-b rounded-lg ">
        <div className="my-100   lg:flex justify-between mx-auto px-4 lg:px-10  w-full">
          <div className="lg:w-1/2 mx-auto w-full lg:mr-8">
            <img
              src={
                "https://img.freepik.com/free-vector/illuminated-neon-lights-stage-realistic-vector_1441-3734.jpg?size=626&ext=jpg&uid=R86751016&ga=GA1.2.628197184.1681078697&semt=robertav1_2_sidr"
              }
              alt="user image"
              className=" mt-6 w-full mx-auto items-center flex flex-col bg-contain bg-center justify-center h-[300px] lg:h-[400px] border"
            />
            <div className="mx-auto mt-8">
              <p className="my-3 font-semibold text-gray-500">Specifications</p>
              <div className="flex w-full items-start mt-4">
                <input
                  className="border w-1/4 p-2 mb-10 mr-3"
                  placeholder={"Icon url"}
                  value={iconUrl}
                  onChange={(e) => setIconUrl(e.target.value)}
                />
                <input
                  className="border w-1/4 p-2 mr-3 mb-10"
                  placeholder={"Title"}
                  value={specTitle}
                  onChange={(e) => setSpecTitle(e.target.value)}
                />
                <textarea
                  className="border w-1/2 p-2 mr-3 mb-10"
                  placeholder={"details"}
                  value={specDetails}
                  onChange={(e) => setSpecDetails(e.target.value)}
                />
                <button
                  className="text-2xl"
                  onClick={() => {
                    setIconUrl("");
                    setSpecDetails("");
                    setSpecTitle("");
                    setSpecs((prevState) => [
                      ...prevState,
                      {
                        icon: iconUrl,
                        title: specTitle,
                        details: specDetails,
                      },
                    ]);
                    console.log(specs);
                  }}
                >
                  <AiOutlinePlusSquare />
                </button>
              </div>
              {specs &&
                specs.map((s, i) => (
                  <div key={i} className="flex border mb-4 w-full">
                    <img
                      className="h-10 w-10 mr-2"
                      src={s.icon}
                      alt={s.title}
                    />
                    <p className="mr-4">{s.title}</p>
                    <p className="w-4/6">{s.details}</p>
                  </div>
                ))}
            </div>
          </div>
          <div className="lg:flex   lg:w-1/2">
            <div className="w-full mt-6 lg:ml-10">
              <input
                className="border w-full p-2 mb-10"
                placeholder={"Product title"}
                value={inputs.title}
                name="title"
                onChange={handleInputs}
              />

              <textarea
                className="border w-full p-2 mb-10"
                placeholder="Short Description"
                value={inputs.short_desc}
                name="short_desc"
                onChange={handleInputs}
              />
              <textarea
                className="border w-full p-2 mb-10 h-40"
                placeholder={"Long description"}
                value={inputs.long_desc}
                name="long_desc"
                onChange={handleInputs}
              />
              <div className="w-full  mb-10">
                <Select
                  value={category}
                  onChange={(e) => setCategory(e)}
                  className=""
                  name="category"
                  variant="static"
                  label="Select Category"
                >
                  <Option value="clothing">Clothing</Option>
                  <Option value="skincare">Skincare</Option>
                  <Option value="shoes">Shoes</Option>
                  <Option value="formal">Formal</Option>
                </Select>
              </div>
              <input
                className="border w-full p-2 mb-10"
                placeholder={"Price"}
                value={inputs.price}
                type="number"
                name="price"
                onChange={handleInputs}
              />
              <input
                className="border w-full p-2 mb-10"
                placeholder={"In Stock"}
                value={inputs.in_stock}
                type="number"
                name="in_stock"
                onChange={handleInputs}
              />
              <div className="mb-4">
                <p className="mb-3 font-medium text-gray-500">Product Image</p>
                <input
                  className="border w-full p-2 mb-10"
                  type="file"
                  onChange={(e) => postImage(e.target.files[0])}
                />
              </div>
              <div className="mb-10">
                <p className="mb-3 font-medium text-gray-500">Product Images</p>
                <input
                  className="border w-full p-2 mb-10"
                  type="file"
                  multiple
                  onChange={(e) =>
                    postImages(Array.prototype.slice.call(e.target.files))
                  }
                />
              </div>
              {images && images.map((i, index) => <p>{i}</p>)}
              <div className="w-full flex flex-col items-center">
                <button
                  onClick={handleSubmit}
                  className="w-1/2 lg:w-full my-2 p-4 font-medium  bg-banner hover:bg-black text-slate-900 hover:text-white"
                >
                  Save
                </button>

                <Toaster />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
