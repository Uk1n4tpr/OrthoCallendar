import React from "react";

function CardArchive(props) {
  const { pac } = props;

  return (
    <>
      <div className="flex justify-between items-center w-[90%] bg-gray-100 border-b-[5px] border-b-gray-500 rounded-xl p-3 my-2 ">
        <div>
          <p>{pac.pacientName}</p>
        </div>
        <div>
          <p>{pac.diagnosis}</p>
        </div>
        <div>
          <p>{pac.mobile}</p>
        </div>
        <div>
          <p>{pac.inputDate}</p>
        </div>
      </div>
    </>
  );
}

export default CardArchive;
