import { useAuthContext } from "@/hooks/useAuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useAuthContext();
  const router = useRouter();
  const Header = () => {
    return (
      <div className="w-full bg-[#EEEEEE] items-center py-3 justify-center flex text-lg text-slate-600 font-medium">
        <p className="my-auto mr-2">Login</p>
      </div>
    );
  };
  const sendRequest = async () => {
    const toastId = toast.loading("Loading...");
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      toast.error(`${json.error}`, {
        id: toastId,
      });
    }
    if (response.ok) {
      toast.success("User logged in successfully", {
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
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    sendRequest();
  };
  return (
    <div className="bg-white h-full w-full">
      <Header />
      <div className="my-10 flex justify-center w-full">
        <form onSubmit={handleSubmit} className="lg:w-1/4 px-6 lg:px-0">
          <input
            className="border w-full p-2 mb-10"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border w-full p-2 mb-10"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="w-1/2 lg:w-full p-2 font-medium rounded-3xl bg-banner hover:bg-black text-slate-900 hover:text-white"
            >
              Login
            </button>
            <Toaster />
          </div>

          <div className="my-6 flex">
            <Link
              href={"/user/register"}
              className="underline hover:text-cyan-400 text-slate-500"
            >
              New here? Create your account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
