import React from "react";
import { IoIosPrint } from "react-icons/io";

function Stampa(props) {
  const { handlePrint } = props;
  return (
    <div
      className="no-print flex justify-center items-center bg-blue-600 text-blue-950 border-b-2 border-b-blue-950 rounded-xl p-3 font-semibold cursor-pointer"
      onClick={handlePrint}
    >
      <button className="flex justify-center items-center gap-2">
        <p>Štampa</p>
        <IoIosPrint />
      </button>
    </div>
  );
}

export default Stampa;
