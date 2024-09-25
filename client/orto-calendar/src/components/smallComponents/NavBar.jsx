import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo-1-1.png";
import { useNavigate } from "react-router-dom";
import axios from 'axios'


function NavBar() {
  const navigate = useNavigate();
  const [doktoriDropdown, setDoktoriDropdown] = useState(false);
  const [doktori, setDoktori] = useState([]);

  const doktoriRef = useRef(null);
  const navRef = useRef(null);

  const handleDropdown = () => {
    setDoktoriDropdown(!doktoriDropdown);
    if (!doktoriDropdown) {
      doktoriRef.current.style.display = "flex";
    }
    if (doktoriDropdown) {
      doktoriRef.current.style.display = "none";
    }
  };

  const handleLogOut = () => {
    navigate("/");
  };

  const handleProgramPage = () => {
    navigate("/program");
  };

  const handleHomePage = () => {
    navigate("/calendar");
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("/doktori");
        setDoktori(response.data);
        console.log(response)
      } catch (error) {
        console.error("error fetchin doktors: ", error);
      }
    };
    fetchDoctors();
  }, [doktoriDropdown]);

  const handleDoktor = (dok) => { 
    navigate(`/doktor/${dok._id}/${dok.name}`)
    window.location.reload()
  }

  return (
    <>
      <div
        ref={navRef}
        className="no-print w-full flex justify-between items-center bg-white px-10"
      >
        <div className="mx-2 flex-1 cursor-pointer">
          <img className="h-[50px]" src={logo} alt="logo" />
        </div>
        <div className="flex justify-between items-center flex-1 font-semibold p-3 text-blue-800  rounded-xl">
          <div
            onClick={handleHomePage}
            className=" cursor-pointer border-none rounded-x hover:bg-gray-200 p-2 rounded-xl"
          >
            <p className="hover:text-blue-950">POČETNA</p>
          </div>
          <div
            onClick={handleProgramPage}
            className=" cursor-pointer border-none rounded-x hover:bg-gray-200 p-2 rounded-xl"
          >
            <p className="hover:text-blue-950">PROGRAM</p>
          </div>
          <div
            onClick={handleDropdown}
            className="border-none hover:bg-gray-200 py-2 rounded-t-xl"
          >
            <p className="hover:text-blue-950 cursor-pointer px-4">DOKTORI</p>
            <div
              ref={doktoriRef}
              className={`hidden absolute justify-center items-center bg-gray-200 p-3 rounded-b-xl rounded-tr-xl text-left z-10`}
            >
              <ul className="">
                {doktori.map((dok, index) => {
                  return (
                    <li 
                      onClick={() => { handleDoktor(dok) }}
                      className="p-1 cursor-pointer hover:text-blue-600"
                      key={dok.id}
                    >
                      {dok.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div
            onClick={handleLogOut}
            className="cursor-pointer border-none hover:bg-gray-200 p-2 rounded-xl"
          >
            <p className="hover:text-blue-950">ODJAVA</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
