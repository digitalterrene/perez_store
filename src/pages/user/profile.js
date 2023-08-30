import { useAuthContext } from "@/hooks/useAuthContext";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Tabs, { Tab } from "react-best-tabs";
import "react-best-tabs/dist/index.css";
import { Toaster, toast } from "react-hot-toast";

const Header = () => {
  return (
    <div className="w-full bg-[#EEEEEE] items-center px-20 py-3 justify-between flex text-lg text-slate-600 font-medium">
      <p className="my-auto mr-2">Profile</p>
      <div className="flex items-center">
        <Link
          href={"/user/dashboard"}
          className="capitalize text-sm -mb-1 font-normal ml-auto "
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default function Profile() {
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState("");

  const { user, dispatch } = useAuthContext();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("perez_shop_user");
    dispatch({ type: "LOGOUT" });
  };

  const deleteAccount = async () => {
    if (user) {
      const toastId = toast.loading("Deleting account..");
      const response = await fetch(`/api/users/${user.user._id}`, {
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
        toast.success("User deleted successfully", {
          id: toastId,
        });
        //remove the user from local storage
        localStorage.removeItem("perez_shop_user", JSON.stringify(json));

        dispatch({ type: "LOGOUT" });
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    } else {
      const toastId = toast.loading("Failied to delete..");
      toast.error("No account to delete. Login first", {
        id: toastId,
      });
    }
  };

  const postImage = (pics) => {
    const toastId = toast.loading("Loading..");
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
      data.append("upload_preset", `${process.env.NEXT_PUBLIC_CLOUDINARY_APP}`);
      data.append(
        "cloud_name",
        `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}`
      );
      fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY_CREDS}`, {
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
  const handleInputs = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const toastId = toast.loading("Loading...");
    let data = {};
    if (inputs.username && inputs.username.length != 0) {
      data = { ...data, username: inputs.username };
    }

    if (inputs.email && inputs.email.length != 0) {
      data = { ...data, email: inputs.email };
    }

    if (inputs.password && inputs.password.length != 0) {
      data = { ...data, password: inputs.password };
    }

    if (inputs.email && inputs.email.length != 0) {
      data = { ...data, email: inputs.email };
    }

    if (image) {
      data = { ...data, image: image };
    }
    if (Object.keys(data).length > 0) {
      const response = await fetch(`/api/users/${user.user._id}`, {
        method: "PUT",
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
        toast.success("User updated successfully", {
          id: toastId,
        });
        //save the user to local storage
        localStorage.setItem("perez_shop_user", JSON.stringify(json));
        //update the authcontext
        console.log(json);
        dispatch({ type: "LOGIN", payload: json });
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    } else {
      toast.error("Update at leat one field", {
        id: toastId,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      sendRequest();
    }
  };

  return (
    <div>
      <Header />
      <div class="relative  flex flex-col min-w-0 break-words bg-white w-full mb-6 border-b rounded-lg ">
        <div className="my-100 px-10 lg:flex justify-center w-full">
          <img
            src={
              user && user.user.image
                ? user.user.image
                : "https://img.freepik.com/free-vector/hand-drawn-flat-design-overwhelmed-people-illustration_23-2149319822.jpg?size=626&ext=jpg&uid=R86751016&ga=GA1.2.472706870.1686005450&semt=ais"
            }
            alt="user image"
            className="lg:w-1/3 mt-6 w-full items-center mx-auto  flex flex-col bg-contain bg-center justify-end h-[300px] lg:h-[400px] lg:mx-8 border"
          />
          <div className="lg:flex ">
            <div className="lg:w-1/2 mt-6 mx-auto">
              <input
                className="border w-full p-2 mb-10"
                placeholder={
                  user && user.user.email ? `${user.user.email}` : "Email"
                }
                value={inputs.email}
                name="email"
                onChange={handleInputs}
              />
              <input
                className="border w-full p-2 mb-10"
                placeholder="Password"
                value={inputs.password}
                name="password"
                onChange={handleInputs}
              />
              <input
                className="border w-full p-2 mb-10"
                placeholder={
                  user && user.user.username
                    ? `${user.user.username}`
                    : "Username"
                }
                value={inputs.username}
                name="username"
                onChange={handleInputs}
              />
              <input
                className="border w-full p-2 mb-10"
                type="file"
                onChange={(e) => postImage(e.target.files[0])}
              />
              <div className="w-full flex flex-col items-center">
                <button
                  onClick={handleSubmit}
                  className="w-1/2 lg:w-full my-2 p-3 font-medium   bg-banner hover:bg-black text-slate-900 hover:text-white"
                >
                  Save
                </button>

                <Toaster />

                <button
                  onClick={() => logout()}
                  className="w-1/2 lg:w-full my-2 p-3 font-medium  bg-banner hover:bg-black text-slate-900 hover:text-white"
                >
                  Logout
                </button>
              </div>

              <div className="my-6 flex">
                <Button
                  onClick={() => deleteAccount()}
                  className=" bg-white capitalize hover: text-black hover:bg-black hover:text-white rounded-none"
                >
                  Call it Quits? Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
