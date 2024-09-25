import React from "react";

function CardPacientHome(props) {
  const { pac, handleDragStart, handleDragOver } =
    props;

  return (
    <>
      <div
        draggable
        onDragStart={(e) => {
          handleDragStart(e, pac);
        }}
        onDragOver={handleDragOver}
        className="
        returnflex flex-col justify-center items-center gap-2 font-semibold text-blue-950 border-b-2 border-r-2 border-blue-950 rounded-xl p-2 bg-blue-400 cursor-pointer"
      >
        <div className="w-full flex justify-start items-center text-lg">
          {pac.pacientName}
        </div>
        <div className="w-full flex justify-start items-center text-sm">
          {pac.diagnosis}
        </div>
        <div className="w-full flex justify-between items-center gap-2">
          <p className="text-sm">{pac.mobile}</p>
          <p className="text-lg">{pac.doktor}</p>
        </div>
      </div>
    </>
  );
}

export default CardPacientHome;
