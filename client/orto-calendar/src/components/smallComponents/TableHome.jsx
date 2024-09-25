import React, { useEffect, useState } from "react";

function TableHome(props) {
  const {
    handleDragStartTable,
    handleDragOver,
    handleDrop,
    tbl,
    index,
    monday,
  } = props;
  const tableData = tbl.table;

  if (!tbl || !Array.isArray(tableData)) {
    return <div>Error: Table data is unavailable.</div>; // Fallback UI
  }

  const generateDates = (startDate, index) => {
    const dates = [];
    const daysInWeek = 5;
    const start = new Date(startDate);

    const effectiveStartDate = new Date(start);
    effectiveStartDate.setDate(start.getDate() + index * (daysInWeek + 2));

    let currentDate = effectiveStartDate;
    let addedDays = 0;

    while (addedDays < daysInWeek) {
      const dayOfWeek = currentDate.getDay();

      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        dates.push(currentDate.toLocaleDateString());
        addedDays++;
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const startDate = new Date(monday);
  const weekdays = generateDates(startDate, index);

  return (
    <div className="flex flex-col justify-center items-center w-full text-blue-800">
      <table className="table-fixed w-full">
        <thead>
          <tr>
            {weekdays.map((date, dateIndex) => (
              <th
                key={dateIndex}
                className="text-xl p-3 border-2 border-gray-600"
              > 
                <div>{date}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => {
                  return (
                    <td
                      draggable
                      onDragStart={(e) => {
                        handleDragStartTable(
                          e,
                          cell,
                          rowIndex,
                          colIndex,
                          tableData,
                          index
                        );
                      }}
                      onDrop={(e) => handleDrop(e, rowIndex, colIndex, index)}
                      onDragOver={handleDragOver}
                      className="p-3 border-2 border-gray-600 text-center"
                      key={`${rowIndex}-${colIndex}`}
                    >
                      {cell === "prazno" ? (
                        <p>{cell}</p>
                      ) : typeof cell === "object" && cell !== null ? (
                        <div className="text-xs">
                          <p className="w-full flex justify-start items-center">{cell.pacientName}</p>
                          <p className="w-full flex justify-start items-center">{cell.diagnosis}</p>
                          <div className="flex justify-between items-center gap-2">
                            <p>{cell.doktor}</p>
                            <p>{cell.mobile}</p>
                          </div>
                        </div>
                      ) : (
                        <p>Invalid data</p>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableHome;
