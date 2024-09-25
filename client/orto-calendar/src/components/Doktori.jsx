import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./smallComponents/NavBar";
import axios from "axios";
import CardPacient from "./smallComponents/CardPacient";
import SearchPacients from "./smallComponents/SearchPacients";
import { FaSearch } from "react-icons/fa";

function Doktori() {
  const { name, _id } = useParams();
  const navigate = useNavigate();
  const [pacient, setPacient] = useState({
    id: _id,
    pacientName: "",
    diagnosis: "",
    mobile: "",
  });
  const [pacientsList, setPacientsList] = useState(false);
  const [pacients, setPacients] = useState([]);
  const [searchPacients, setSearchPacients] = useState(false);
  const [pacientsLenght, setPacientsLenght] = useState(0)

  const pacientNameRef = useRef(null);
  const diagnosisRef = useRef(null);
  const mobileRef = useRef(null);
  const PacientsListRef = useRef(null);
  const showButtonRef = useRef(null);


  const handlePacientInput = async (e) => {
    e.preventDefault();
    const { id, pacientName, diagnosis, mobile } = pacient;
    try {
      await axios.post("/pacient-input", {
        id,
        pacientName,
        diagnosis,
        mobile,
      });
      setPacient({ id, pacientName: "", diagnosis: "", mobile: "" });
    } catch (error) {
      console.error("problem sending pacient info: ", error);
    }
    setPacientsList(!pacientsList);
  };

  const handlePacientsList = () => {
    setPacientsList(!pacientsList);
    if (!pacientsList) {
      PacientsListRef.current.style.display = "flex";
      showButtonRef.current.style.display = "none";
    }
  };

  const handleHidePacientsList = () => {
    setPacientsList(!pacientsList);
    if (!pacientsList) {
      PacientsListRef.current.style.display = "none";
      showButtonRef.current.style.display = "flex";
    }
  };

  const handleSearchPacients = () => {
    setSearchPacients(!searchPacients);
  };

  useEffect(() => {
    const fetchPacients = async () => {
      try {
        const response = await axios
          .get(`/getDoksPacients/${pacient.id}`)
          .then((response) => {
            setPacients(response.data);
          })
          .catch((error) => {
            console.error("eroor fetching pacients: ", error);
          });
      } catch (error) {
        console.error("problem fetching pacients: ", error);
      }
    };

    fetchPacients();
    setPacientsLenght(pacients.length)
  }, [pacientsList]);

  const handlePreOp = () => { 
    navigate('/pre-op')
   }

  return (
    <>
      <section className="w-full flex flex-col justify-center items-center bg-blue-100 text-blue-800 font-semibold">
        <NavBar />
        <div className="text-3xl text-center p-5">
          <p>Pacijenti {name}</p>
          <p className="text-xl text-red-500">Lista čekanja: {pacientsLenght}</p>
          <div onClick={handlePreOp} className="flex justify-center items-center p-2 mt-2 text-lg bg-blue-500 text-blue-950 border-b-2 border-b-blue-950 rounded-xl">
            <button>
              <p>Preoperativna priprema</p>
            </button>
          </div>
        </div>
        <div className="w-[80%] flex flex-col justify-center items-center p-5">
          <div className="text-red-500 text-xl">
            <p>Obavezno unijeti svako polje!</p>
          </div>
          <form
            onSubmit={handlePacientInput}
            className="flex flex-col justify-center items-center w-[50%] text-center"
          >
            <div className="flex flex-col justify-center items-center p-3 w-full">
              <label className="p-2">Ime i Prezime</label>
              <input
                ref={pacientNameRef}
                value={pacient.pacientName}
                onChange={(e) => {
                  setPacient({
                    ...pacient,
                    pacientName: e.target.value.toUpperCase(),
                  });
                }}
                className="text-center border-b-2 border-b-gray-400 rounded-xl w-full bg-gray-100"
                type="text"
              />
            </div>
            <div className="flex flex-col justify-center items-center p-3 w-full">
              <label className="p-2">Dijagnoza</label>
              <input
                ref={diagnosisRef}
                value={pacient.diagnosis}
                onChange={(e) => {
                  setPacient({
                    ...pacient,
                    diagnosis: e.target.value.toUpperCase(),
                  });
                }}
                className="text-center border-b-2 border-b-gray-400 rounded-xl w-full bg-gray-100"
                type="text"
              />
            </div>
            <div className="flex flex-col justify-center items-center p-3 w-full">
              <label className="p-2">br. telefona</label>
              <input
                ref={mobileRef}
                value={pacient.mobile}
                onChange={(e) => {
                  setPacient({
                    ...pacient,
                    mobile: e.target.value.toUpperCase(),
                  });
                }}
                className="text-center border-b-2 border-b-gray-400 rounded-xl w-full bg-gray-100"
                type="text"
              />
            </div>
            <div className="flex flex-col justify-center items-center p-3 bg-blue-400 rounded-xl border-b-2 border-b-blue-950 cursor-pointer">
              <button type="submit">
                <p>DODAJTE PACIJENTA</p>
              </button>
            </div>
          </form>
        </div>
        <div
          ref={showButtonRef}
          onClick={handlePacientsList}
          className="flex justify-center items-center mb-20"
        >
          <div className="bg-blue-400 border-b-2 border-b-blue-950 rounded-xl p-3 mt-5 cursor-pointer">
            <button>
              <p>Prikažite sve pacijente</p>
            </button>
          </div>
        </div>
        <div
          ref={PacientsListRef}
          className="w-full hidden flex-col justify-center items-center"
        >
          <div className="text-center flex justify-center items-center">
            <div
              onClick={handleHidePacientsList}
              className="border-b-2 border-b-blue-950 bg-blue-400 rounded-xl p-3 cursor-pointer my-5"
            >
              <button>
                <p>Sakrij pacijente</p>
              </button>
            </div>
            <div
              onClick={handleSearchPacients}
              className="flex justify-center items-center gap-2 bg-blue-400 border-b-2 border-b-blue-950 rounded-xl p-3 m-5 cursor-pointer"
            >
              <button>
                <p>Pretražite pacijente</p>
              </button>
              <FaSearch />
            </div>
          </div>
          {searchPacients ? (
            <SearchPacients
              pacientsList={pacientsList}
              setPacientsList={setPacientsList}
              pacients={pacients}
              name={name}
            />
          ) : (
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
              {pacients.map((pac, index) => {
                return (
                  <CardPacient
                    key={pac._id}
                    setPacientsList={setPacientsList}
                    pacientsList={pacientsList}
                    pac={pac}
                    index={index}
                    name={name}
                  />
                );
              })}
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Doktori;
