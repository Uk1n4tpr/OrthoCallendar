import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import FoundPacients from "./FoundPacients";

function SearchPacients(props) {
  const { pacients, setPacientsList, pacientsList, name } = props;
  const [searchData, setSearchData] = useState({
    name: "",
    diagnosis: "",
    mobile: "",
  });
  const [foundPacients, setFoundPacients] = useState([]);

  const handleSearchPacient = () => {
    const filteredPacs = pacients.filter((pac) => {
      const matchesName =
        !searchData.name || pac.pacientName?.includes(searchData.name);
      const matchesDiagnosis =
        !searchData.diagnosis || pac.diagnosis?.includes(searchData.diagnosis);
      const matchesMobile =
        !searchData.mobile || pac.mobile?.includes(searchData.mobile);

      return matchesName && matchesDiagnosis && matchesMobile;
    });

    setFoundPacients(filteredPacs);
  };

  return (
    <>
      <div className="flex justify-start items-center gap-10 border-2 w-[90%]">
        <div className="flex flex-col justify-center items-center text-sm">
          <label className="text-black">po imenu i prezimenu</label>
          <input
            value={searchData.name}
            onChange={(e) => {
              setSearchData({
                ...searchData,
                name: e.target.value.toUpperCase(),
              });
            }}
            className="border-2 p-1 border-gray-600 rounded-lg"
            type="text"
          />
        </div>
        <div className="flex flex-col justify-center items-center text-sm">
          <label className="text-black">po dijagnozi</label>
          <input
            value={searchData.diagnosis}
            onChange={(e) => {
              setSearchData({
                ...searchData,
                diagnosis: e.target.value.toUpperCase(),
              });
            }}
            className="border-2 p-1 border-gray-600 rounded-lg"
            type="text"
          />
        </div>
        <div className="flex flex-col justify-center items-center text-sm">
          <label className="text-black">po mobilnom</label>
          <input
            value={searchData.mobile}
            onChange={(e) => {
              setSearchData({
                ...searchData,
                mobile: e.target.value.toUpperCase(),
              });
            }}
            className="border-2 p-1 border-gray-600 rounded-lg"
            type="text"
          />
        </div>
        <div
          onClick={handleSearchPacient}
          className="cursor-pointer flex justify-center items-center gap-2 p-2  text-black bg-white rounded-lg border-2 border-gray-600"
        >
          <p>Pretrazite</p>
          <FaSearch />
        </div>
      </div>
      {foundPacients.map((pac) => {
        return (
          <>
            <div className="flex justify-between items-center w-[90%] bg-gray-100 border-2 border-black rounded-xl mt-10">
              <div className="flex flex-1 justify-between items-center h-full">
                <div className="h-full border-r-2 border-r-black p-2">
                  <p>Ime i prezime</p>
                </div>
                <div className="h-full border-r-2 border-l-2 border-l-black border-r-black p-2">
                  <p>dijagnoza</p>
                </div>
                <div className="h-full border-r-2 border-l-2 border-l-black border-r-black p-2">
                  <p>mobilni</p>
                </div>
                <div className="h-full border-r-2 border-l-2 border-l-black border-r-black p-2">
                  <p>datum upisa</p>
                </div>
              </div>
              <div className="px-3">
                <p>up. del. send</p>
              </div>
            </div>
            <FoundPacients
              key={pac._id}
              setFoundPacients={setFoundPacients}
              foundPacients={foundPacients}
              pacientsList={pacientsList}
              setPacientsList={setPacientsList}
              pac={pac}
              name={name}
            />
            ;
          </>
        );
      })}
    </>
  );
}

export default SearchPacients;
