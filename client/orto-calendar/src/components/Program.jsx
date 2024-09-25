import React, { useEffect, useState } from "react";
import NavBar from "./smallComponents/NavBar";
import TableProgram from "./smallComponents/TableProgram";
import Stampa from "./buttons/PrintBtn";
import axios from "axios";

function Program() {
  const [pacients, setPacients] = useState([]);
  const [pacientsForProgram, setPacientsForProgram] = useState([]);

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const fetchPacients = async () => {
      try {
        const result = await axios.get("/get-pacients-for-today");
        console.log(result.data);
        setPacients(result.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPacients();
  }, []);

  useEffect(() => {
    if (pacients.length > 0) {
      const lastPacients = pacients.length - 1;
      const pacientsToSet = pacients[lastPacients];
      console.log("pacients to set :  ", pacientsToSet);
      const newAray = pacientsToSet.pacients || [];
      setPacientsForProgram(newAray);
    }
  }, [pacients]);

  useEffect(() => {
    const deleteExcesPacients = async () => {
      if (pacients.length > 20) {
        const pacientsToDelete = pacients
          .slice(0, pacients.length - 2)
          .map((p) => p._id);

        try {
          await axios.delete("/delete-exces-pacients", {
            data: { idsToDelete: pacientsToDelete },
          });
          const filteredPacients = pacients.slice(-2);
          setPacients(filteredPacients);
        } catch (error) {
          console.error("Error deleting patients:", error);
        }
      }
    };

    deleteExcesPacients();
  }, [pacients]);

  return (
    <>
      <NavBar />
      <div className="w-full flex flex-col justify-center items-center bg-gray-200 text-blue-800">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-[80%] flex flex-col justify-center items-center border-2 border-black mt-10 mb-2">
            <TableProgram pacientsForProgram={pacientsForProgram} />
          </div>
          <Stampa handlePrint={handlePrint} />
        </div>
        <div className="no-print text-3xl font-semibold p-5">
          <p>Uredi program</p>
        </div>
      </div>
    </>
  );
}

export default Program;
