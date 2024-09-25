import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import CardArchive from "./CardArchive";
import Stampa from "../buttons/PrintBtn";

function Archive() {
  const [archivedTables, setArchivedTables] = useState([]);
  const [pacients, setPacients] = useState([]);

  useEffect(() => {
    console.log(archivedTables)
    const fetchTables = async () => {
      try {
        const result = await axios.get("/get-archived-tables");
        setArchivedTables(result.data);
        console.log(result.data);
      } catch (error) {
        console.error("error fetchin tables: ", error);
      }
    };
    fetchTables();
    console.log("arcivedTables: ", archivedTables);
  }, []);

  useEffect(() => {
    const newPacients = [];

    archivedTables.forEach((tbl) => {
      const table = tbl.table;
      table.forEach((row) => {
        row.forEach((pac) => {
          console.log("pac: ", pac);
          if (pac !== "prazno" && !pacients.includes(pac)) {
            newPacients.push(pac);
          }
        });
      });
    });

    setPacients((prevPacients) => [...prevPacients, ...newPacients]);
    console.log("pacients: ", newPacients);
  }, [archivedTables]);

  const handlePrint = () => { 
    window.print()
   }

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center m-0 p-0 bg-blue-200 w-full">
        <div className="no-print flex justify-center items-center text-blue-800 text-5xl font-bold py-10">
          <p>Arhiva</p>
        </div>
        <Stampa handlePrint={handlePrint} />
        <div className="w-full flex flex-col justify-center items-center">
          {pacients.map((pac, index) => {
            return <CardArchive key={index} pac={pac} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Archive;
