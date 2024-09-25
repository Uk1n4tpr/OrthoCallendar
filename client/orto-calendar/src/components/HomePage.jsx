import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-1-1.png";

function HomePage() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    user: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user, password } = data;
    try {
      const { data } = await axios.post("/login", { user, password });
      if (data.error) {
        setData({ user: "", password: "" });
        toast.error(data.error);
      } else {
        navigate("/calendar");
      }
    } catch (error) {
      console.error("Problem login user: ", error);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center w-screen h-screen bg-blue-300 text-blue-950">
      <div className="flex flex-col justify-evenly items-center bg-white rounded-3xl border-r-4 border-b-4 border-r-gray-400 border-b-gray-400 p-5">
        <div className="w-full h-10">
          <div className="mx-2">
            <img className="h-[50px]" src={logo} alt="logo" />
          </div>
        </div>
        <div className="font-semibold text-3xl p-5">
          <h1>ORTO KALENDAR</h1>
        </div>
        <div className="flex flex-col justify-center items-center border-2 rounded-xl bg-blue-200 border-gray-400 p-10">
          <div className="font-semibold text-2xl p-5">
            <p>PRIJAVA</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center font-semibold "
          >
            <div className="flex flex-col justify-center items-center p-3">
              <label className="p-2">korisnicko ime</label>
              <input
                value={data.user}
                onChange={(e) => {
                  setData({ ...data, user: e.target.value });
                }}
                className="border-b-black rounded-lg border-2"
                type="text"
              />
            </div>
            <div className="flex flex-col justify-center items-center p-3">
              <label className="p-2">lozinka</label>
              <input
                value={data.password}
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
                className="border-b-black rounded-lg border-2"
                type="password"
              />
            </div>
            <div className="p-2 border-black border-2 rounded-xl bg-gray-400 hover:bg-gray-600">
              <button type="submit">
                <p>Prijavi se</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
