import React from "react";


function TableProgram(props) {
  const { pacientsForProgram } = props;

  const firstFivePacients = pacientsForProgram.slice(0, 5);
  const lastFourPacients = pacientsForProgram.slice(-4);

  return (
    <>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th colSpan={5} className="border-2 p-2 border-black">
              Dnevni operativni program
            </th>
            <th className="border-2 p-2 border-black">
              Datum: {new Date().toLocaleDateString()}
            </th>
          </tr>
          <tr>
            <th className="border-2 border-black">Br.</th>
            <th className="border-2 border-black">Ime pacijenta</th>
            <th className="border-2 border-black">Dijagnoza</th>
            <th className="border-2 border-black">Planirani imp. materijal</th>
            <th className="border-2 border-black">Instrumentarka</th>
            <th className="border-2 border-black">Operater</th>
          </tr>
          <tr>
            <th className="border-2 border-black" colSpan={6}>
              Velika sala
            </th>
          </tr>
        </thead>
        <tbody>
          {firstFivePacients.map((pacient, index) => (
            <tr key={index}>
              <td className="text-xs font-semibold border-2 border-black p-2">{index + 1}</td>
              <td className="text-xs font-semibold border-2 border-black p-2">{pacient.pacientName}</td>
              <td className="text-xs font-semibold border-2 border-black p-2">{pacient.diagnosis}</td>
              <td className="text-xs font-semibold border-2 border-black p-2">
                {pacient.material || ""}
              </td>
              <td className="text-xs font-semibold border-2 border-black p-2">
                {pacient.instrument || ""}
              </td>
              <td className="text-xs font-semibold border-2 border-black p-2">
                {pacient.doktor}
              </td>
            </tr>
          ))}
        </tbody>
        <thead>
          <tr>
            <th className="border-2 border-black" colSpan={6}>
              Mala sala
            </th>
          </tr>
        </thead>
        <tbody>
          {lastFourPacients.map((pacient, index) => (
            <tr key={index + 6}>
              <td className="text-xs font-semibold border-2 border-black p-2">{index + 6}</td>
              <td className="text-xs font-semibold border-2 border-black p-2">{pacient.pacientName}</td>
              <td className="text-xs font-semibold border-2 border-black p-2">{pacient.diagnosis}</td>
              <td className="text-xs font-semibold border-2 border-black p-2">
                {pacient.material || ""}
              </td>
              <td className="text-xs font-semibold border-2 border-black p-2">
                {pacient.instrument || ""}
              </td>
              <td className="text-xs font-semibold border-2 border-black p-2">
                {pacient.doktor}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TableProgram;
