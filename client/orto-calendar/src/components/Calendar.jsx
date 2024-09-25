import React, { useEffect, useReducer, useRef, useState } from "react";
import NavBar from "./smallComponents/NavBar";
import TableHome from "./smallComponents/TableHome";
import CardPacientHome from "../components/smallComponents/CardPacientHome";
import { FaArchive, FaTimes } from "react-icons/fa";
import axios from "axios";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { FaTableCells } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Stampa from "./buttons/PrintBtn";

function Calendar() {
  const [pacientsForProgram, setPacientsForProgram] = useState([]);
  const [showPacients, setShowPacients] = useState(false);
  const [tables, setTables] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [monday, setMonday] = useState(null);
  const [pacientsForToday, setPacientsForToday] = useState([]);

  const navigate = useNavigate();

  const showPacientsRef = useRef(null);

  const handleShowPacients = () => {
    setShowPacients(!showPacients);
    if (!showPacients) {
      showPacientsRef.current.style.display = "flex";
    }
  };

  const handleHidePacients = () => {
    setShowPacients(!showPacients);
    if (!showPacients) {
      showPacientsRef.current.style.display = "none";
    }
  };

  useEffect(() => {
    const fetchPacients = async () => {
      try {
        const result = await axios
          .get("/get-sent-pacients")
          .then((result) => {
            setPacientsForProgram(result.data);
          })
          .catch((error) => {
            console.error("error fetching pacients then block: ", error);
          });
      } catch (error) {
        console.error("error fetching pacients: ", error);
      }
    };
    fetchPacients();
  }, [tables, pacientsForProgram]);

  const handleDragStart = (e, pac) => {
    e.dataTransfer.setData("application/json", JSON.stringify(pac));
  };

  const handleDragStartTable = (e, cell, rowIndex, colIndex, tbl, index) => {
    e.dataTransfer.setData("application/json", JSON.stringify(cell));
    const newTableData = [...tables]; // Create a copy of the entire tables array

    if (newTableData[index] && newTableData[index].table[rowIndex]) {
      newTableData[index].table[rowIndex][colIndex] = "prazno"; // Set the cell to "prazno"
      setTables(newTableData); // Set the updated tables array
    } else {
      console.error("Invalid table or rowIndex");
    }
  };

  const handleDrop = async (e, rowIndex, colIndex, index) => {
    e.preventDefault();
    const pac = JSON.parse(e.dataTransfer.getData("application/json"));

    const newTableData = [...tables[index].table];

    if (
      !newTableData[rowIndex][colIndex] ||
      newTableData[rowIndex][colIndex] === "prazno"
    ) {
      newTableData[rowIndex][colIndex] = pac;
    } else {
      const returningPac = newTableData[rowIndex][colIndex];
      const dokId = returningPac.id;
      const pacientName = returningPac.pacientName;
      const diagnosis = returningPac.diagnosis;
      const mobile = returningPac.mobile;
      const inputDate = returningPac.inputDate;
      const doktor = returningPac.doktor;
      try {
        await axios.post(`/return-pacient-from-table`, {
          dokId,
          pacientName,
          diagnosis,
          mobile,
          inputDate,
          doktor,
        });
        newTableData[rowIndex][colIndex] = pac;
        console.log("Patient successfully replaced");
      } catch (error) {
        console.error("Error getting back the patient: ", error);
      }
    }

    const updatedTables = [...tables];
    updatedTables[index].table = newTableData;
    setTables(updatedTables);
    const tableId = tables[index]._id;

    try {
      const response = await axios.post(
        `/update-table-data/${tableId}`,
        newTableData
      );
      await axios.delete(`/delete-pacient-for-program/${pac._id}`);
      console.log("Patient removed successfully");
    } catch (error) {
      console.error("Error removing patient: ", error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleNewTable = async () => {
    const table = [
      ["prazno", "prazno", "prazno", "prazno", "prazno"],
      ["prazno", "prazno", "prazno", "prazno", "prazno"],
      ["prazno", "prazno", "prazno", "prazno", "prazno"],
      ["prazno", "prazno", "prazno", "prazno", "prazno"],
      ["prazno", "prazno", "prazno", "prazno", "prazno"],
      ["prazno", "prazno", "prazno", "prazno", "prazno"],
      ["prazno", "prazno", "prazno", "prazno", "prazno"],
      ["prazno", "prazno", "prazno", "prazno", "prazno"],
      ["prazno", "prazno", "prazno", "prazno", "prazno"],
    ];
    try {
      const result = await axios.post("/new-table", table);
      console.log(result);
      setShowPacients(!showPacients)
    } catch (error) {
      console.error("error creating table: ", error);
    }
  };

  const handleLeftTable = () => {
    setCurrentIndex((prev) => (prev - 1 + tables.length) % tables.length);
  };

  const handleRightTable = () => {
    setCurrentIndex((prev) => (prev + 1) % tables.length);
  };

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const result = await axios.get("/get-tables");
        setTables(result.data);
        setCurrentIndex(0);
      } catch (error) {
        console.error("error fetching tables", error);
      }
    };
    fetchTables();
  }, [showPacients]);

  useEffect(() => {
    const checkAndArchiveTable = () => {
      const today = new Date();
      if (today.getDay() === 0) {
        handleArchiveTable();
      }
    };

    const intervalId = setInterval(checkAndArchiveTable, 86400000);

    return () => clearInterval(intervalId);
  }, [tables]);

  useEffect(() => {
    const getMondayOfCurrentWeek = () => {
      const date = new Date();
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1);
      const monday = new Date(date.setDate(diff));
      setMonday(monday);
    };
    getMondayOfCurrentWeek();
  }, [tables]);

  const handleArchiveTable = async () => {
    const table = tables[0];
    const { tableId } = table._id;
    const tableForArchive = table.table;
    try {
      const result = await axios.post(
        `/archive-table/${tableId}`,
        tableForArchive
      );
      console.log(result.data);
      const resultDelete = await axios.delete(`/delete-table/${tableId}`);
      console.log(resultDelete);
    } catch (error) {
      console.error("error archiving table: ", error);
    }
  };

  const handleRedirectArchive = () => {
    navigate("/archive");
  };

  useEffect(() => {
    if (tables.length === 0) {
      console.log("No tables available");
      return;
    }

    const tableObject = tables[0];
    const table = tableObject.table;
    const date = new Date();
    const day = date.getDay();

    if (!table || !Array.isArray(table)) {
      console.log("Table is not defined or is not an array");
      return;
    }

    const pacientsArray = [];

    table.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (colIndex === day - 1 && day !== 0 && day !== 6) {
          console.log("pacient: ", col);
          pacientsArray.push(col);
        }
      });
    });
    setPacientsForToday(pacientsArray);
    console.log("pacients for today: ", pacientsForToday);
  }, [tables]);

  useEffect(() => {
    const sendPacientsForToday = async () => {
      const pacients = pacientsForToday;
      try {
        const result = axios.post("/send-pacients-for-today", pacients);
      } catch (error) {
        console.error("error sending pacients: ", error);
      }
    };
    sendPacientsForToday();
  }, [pacientsForToday]);

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center bg-blue-200 pb-20 w-full">
        <div className="flex justify-center items-center w-full">
          <div
            onClick={handleLeftTable}
            className="no-print text-7xl font-semibold text-blue-950 cursor-pointer"
          >
            <FaAngleLeft />
          </div>

          <div className="w-[80%] flex flex-col justify-center items-center py-7 text-blue-950">
            <div className="no-print font-semibold text-4xl p-3">
              <p>Sedmični program</p>
            </div>
            <div className="relative w-full overflow-hidden">
              <div
                className="flex transition-transform duration-300"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }} // Current index control
              >
                {tables.map((tbl, index) => {
                  return (
                    <div className="flex-shrink-0 w-full" key={tbl._id}>
                      <TableHome
                        key={tbl._id}
                        index={index}
                        tbl={tbl}
                        handleDragStartTable={handleDragStartTable}
                        handleDragOver={handleDragOver}
                        handleDrop={handleDrop}
                        handleArchiveTable={handleArchiveTable}
                        monday={monday}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div
            onClick={handleRightTable}
            className="no-print text-7xl font-semibold text-blue-950 cursor-pointer z-10"
          >
            <FaAngleRight />
          </div>
        </div>
        <div className="flex justify-center items-center gap-5 no-print">
          <Stampa handlePrint={handlePrint} />
          <div
            onClick={handleShowPacients}
            className="flex justify-center items-center bg-blue-600 text-blue-950 border-b-2 border-b-blue-950 rounded-xl p-3 font-semibold cursor-pointer"
          >
            <button className="flex justify-center items-center gap-2">
              <p>Prikazi pacijente za program</p>
              <FaClipboardList />
            </button>
          </div>
          <div
            onClick={handleNewTable}
            className="flex justify-center items-center bg-blue-600 text-blue-950 border-b-2 border-b-blue-950 rounded-xl p-3 font-semibold cursor-pointer"
          >
            <button className="flex justify-center items-center gap-2">
              <p>Dodaj novu tabelu</p>
              <FaTableCells />
            </button>
          </div>
        </div>
        <div
          onClick={handleRedirectArchive}
          className="no-print flex justify-center items-center mt-3 cursor-pointer bg-orange-400 text-blue-800 border-b-2 border-blue-950 rounded-xl p-3 font-semibold"
        >
          <button className="flex justify-center items-center gap-2">
            <p>Arhiva</p>
            <FaArchive />
          </button>
        </div>
        <div
          ref={showPacientsRef}
          className="w-full hidden flex-col justify-center items-center gap-10 py-10 text-4xl no-print"
        >
          <div
            onClick={handleHidePacients}
            className="flex justify-center items-center w-full cursor-pointer"
          >
            <FaTimes />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-5">
            {pacientsForProgram.map((pac) => {
              return (
                <CardPacientHome
                  pac={pac}
                  key={pac._id}
                  handleDragStart={handleDragStart}
                  handleDragOver={handleDragOver}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Calendar;
