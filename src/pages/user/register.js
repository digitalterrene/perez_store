import { useAuthContext } from "@/hooks/useAuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const sendRequest = async () => {
    const toastId = toast.loading("Loading...");
    if (!name) {
      toast.error("Username is required", {
        id: toastId,
      });
      return;
    }
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });
    const json = await response.json();
    if (!response.ok) {
      toast.error(`${json.error}`, {
        id: toastId,
      });
    }
    if (response.ok) {
      toast.success("User created successfully", {
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
  const Header = () => {
    return (
      <div className="w-full bg-[#EEEEEE] items-center py-3 justify-center flex text-lg text-slate-600 font-medium">
        <p className="my-auto mr-2">Register</p>
      </div>
    );
  };
  return (
    <div className="bg-white w-full">
      <Header />
      <div className="my-10 flex justify-center w-full">
        <form onSubmit={handleSubmit} className="lg:w-1/4 px-6 lg:px-0">
          <input
            className="border w-full p-2 mb-10"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />{" "}
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
              Register
            </button>
            <Toaster />
          </div>
          <div className="my-6 flex">
            <Link
              href={"/user/login"}
              className="underline hover:text-cyan-400 text-slate-500"
            >
              Already have an account? Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
