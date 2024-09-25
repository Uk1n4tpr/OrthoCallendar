import React, { useRef, useEffect } from "react";
import NavBar from "./NavBar";

function PreOp() {
  const printHipRef = useRef();
  const printHalluxRef = useRef();
  const printArthrRef = useRef();

  const printContent = (ref) => {
    if (!ref.current) {
      console.error("Ref is null");
      return;
    }

    const printWindow = window.open("", "_blank");
    const content = ref.current.innerHTML;

    console.log("Content to print:", content);

    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            body { font-family: Arial, sans-serif; }
            p { margin: 10px 0; }
          .pre-op{
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 100%;
              text-align: center;
              font-size: x-large;
              border: 2px solid black;
            }
            .pre-op-title{
              font-weight: 500;
              width: 100%;
              background-color: gray;
            }
          </style>
        </head>
        <body>
          <div>${content}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  useEffect(() => {
    console.log("printHipRef:", printHipRef.current);
    console.log("printHalluxRef:", printHalluxRef.current);
    console.log("printArthrRef:", printArthrRef.current);
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-start bg-blue-200 pt-20 gap-5 text-xl font-semibold">
        {/* Hip Content */}
        <div className="flex flex-col justify-center items-center">
          <button
            onClick={() => printContent(printHipRef)}
            className="flex justify-center items-center p-2 mb-5 bg-blue-500 text-blue-950 border-b-blue-950 border-b-2 rounded-xl cursor-pointer"
          >
            <p>Kuk, koljeno i rame proteza</p>
          </button>
          <div
            className="pre-op flex flex-col justify-center items-center w-full text-center text-xl border-2 border-black"
            ref={printHipRef}
          >
            <div className="pre-op-title font-semibold bg-gray-400 w-full">
              <p>ODJELJENJE ZA ORTOPEDSKU HIRURGIJU</p>
            </div>
            <div className="flex justify-between items-center w-full p-2 border-2 border-black">
              <div className="text-lg">
                <p>Telefon: </p>
              </div>
              <div className="border-l-2 border-l-black border-r-2 border-r-black h-full p-2 text-lg">
                <div>
                  <p>Glavna sestra odjeljenja</p>
                  <p className="text-xs">
                    'zakazivanje operacije, informacije'
                  </p>
                </div>
                <div>
                  <p>Ortopedska ambulanta</p>
                  <p className="text-xs">'zakazivanje pregleda i kontrola'</p>
                </div>
              </div>
              <div className="text-lg flex flex-col h-full justify-between">
                <div>
                  <p>051/348-443</p>
                  <p>051/348-444 lokal 1627</p>
                </div>
                <div>
                  <p>051/348-444 lokal 1620</p>
                </div>
              </div>
              <div></div>
            </div>
            <div className="text-xs w-full text-start bg-gray-400 p-1 border-b-2 border-b-black">
              <p>fax: 051/348-453</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 w-full">
              <p className="text-xl font-semibold">PREOPERATIVNA PRIPREMA</p>
              <ul className="flex flex-col justify-center items-start w-full gap-2">
                <li>
                  <p className="font-light text-start">
                    Kompletna laboratorija:{" "}
                  </p>
                  <p className="font-semibold text-start text-sm">
                    Za sve pacijente: KKS, DKS, urea, kreatinin, VK, VZ, ŠUK,
                    SE, CRP, AST, ALT, urin
                  </p>
                  <p className="font-semibold text-start text-sm">
                    Za sve pacijente na antikoagulantnoj terapiji dodatno: PV,
                    INR
                  </p>
                  <p className="font-semibold text-start text-sm">
                    Za sve pacijente koji koriste terapiju za štitnu žlijezdu:
                    T3, T4, TSH
                  </p>
                </li>
                <li>
                  <p className="font-light text-start">RTG srca i pluća</p>
                </li>
                <li>
                  <p className="font-light text-start">EKG</p>
                </li>
                <li>
                  <p className="font-light text-start">INTERNISTIČKI PREGLED</p>
                  <p className="font-semibold text-start text-sm">
                    ako imate pejsmejker, prije operacije javiti se nadležnom
                    kardiologu radi podešavanja
                  </p>
                  <p className="font-semibold text-start text-sm">
                    ako pijete acetilsalicilnu kiselinu/ aspirin, andol, midol i
                    sl. prestati uzimati 3 dana prije operacije.
                  </p>
                </li>
                <li>
                  <p className="font-light text-start">
                    Anesteziološki pregled
                  </p>
                </li>
                <li>
                  <p className="font-light text-start">
                    Kolor dopler krvnih sudova donjih ekstremiteta
                  </p>
                </li>
                <li>
                  <p className="font-light text-start">
                    Urinokultura - 3 uzastopna sterilna nalaza
                  </p>
                </li>
                <li>
                  <p className="font-light text-start">
                    Krvna grupa i RH faktor
                  </p>
                  <p className="font-semibold text-start text-sm">
                    Obavezno uraditi u državnoj ustanovi
                  </p>
                </li>
                <li>
                  <p className="font-light text-start">3 davaoca krvi</p>
                </li>
                <li>
                  <p className="font-light text-start">Bolnička uputnica</p>
                </li>
              </ul>
              <p className="pre-op-title">
                Molimo Vas da prije dolaska provjerite osiguranje!!!
              </p>
            </div>
          </div>
        </div>

        {/* Hallux Content */}
        <div className="flex flex-col justify-center items-center">
          <button
            onClick={() => printContent(printHalluxRef)}
            className="flex justify-center items-center p-2 mb-5 bg-blue-500 text-blue-950 border-b-blue-950 border-b-2 rounded-xl cursor-pointer"
          >
            <p>Hallux i rame artr.</p>
          </button>
          <div
            className="pre-op flex flex-col justify-center items-center w-full text-center text-xl border-2 border-black"
            ref={printHalluxRef}
          >
            <div className="pre-op-title font-semibold bg-gray-400 w-full">
              <p>ODJELJENJE ZA ORTOPEDSKU HIRURGIJU</p>
            </div>
            <div className="flex justify-between items-center w-full p-2 border-2 border-black">
              <div className="text-lg">
                <p>Telefon: </p>
              </div>
              <div className="border-l-2 border-l-black border-r-2 border-r-black h-full p-2 text-lg">
                <div>
                  <p>Glavna sestra odjeljenja</p>
                  <p className="text-xs">
                    'zakazivanje operacije, informacije'
                  </p>
                </div>
                <div>
                  <p>Ortopedska ambulanta</p>
                  <p className="text-xs">'zakazivanje pregleda i kontrola'</p>
                </div>
              </div>
              <div className="text-lg flex flex-col h-full justify-between">
                <div>
                  <p>051/348-443</p>
                  <p>051/348-444 lokal 1627</p>
                </div>
                <div>
                  <p>051/348-444 lokal 1620</p>
                </div>
              </div>
              <div></div>
            </div>
            <div className="text-xs w-full text-start bg-gray-400 p-1 border-b-2 border-b-black">
              <p>fax: 051/348-453</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 w-full">
              <p className="text-xl font-semibold">PREOPERATIVNA PRIPREMA</p>
              <ul className="flex flex-col justify-center items-start w-full gap-2">
                <li>
                  <p className="font-light text-start">
                    Kompletna laboratorija:{" "}
                  </p>
                  <p className="font-semibold text-start text-sm">
                    Za sve pacijente: KKS, DKS, urea, kreatinin, VK, VZ, ŠUK,
                    SE, CRP, AST, ALT, urin
                  </p>
                  <p className="font-semibold text-start text-sm">
                    Za sve pacijente na antikoagulantnoj terapiji dodatno: PV,
                    INR
                  </p>
                  <p className="font-semibold text-start text-sm">
                    Za sve pacijente koji koriste terapiju za štitnu žlijezdu:
                    T3, T4, TSH
                  </p>
                </li>
                <li>
                  <p className="font-light text-start">RTG srca i pluća</p>
                </li>
                <li>
                  <p className="font-light text-start">EKG</p>
                </li>
                <li>
                  <p className="font-light text-start">INTERNISTIČKI PREGLED</p>
                  <p className="font-semibold text-start text-sm">
                    ako imate pejsmejker, prije operacije javiti se nadležnom
                    kardiologu radi podešavanja
                  </p>
                  <p className="font-semibold text-start text-sm">
                    ako pijete acetilsalicilnu kiselinu/ aspirin, andol, midol i
                    sl. prestati uzimati 3 dana prije operacije.
                  </p>
                </li>
                <li>
                  <p className="font-light text-start">
                    Anesteziološki pregled
                  </p>
                </li>
                <li>
                  <p className="font-light text-start">
                    Krvna grupa i RH faktor
                  </p>
                  <p className="font-semibold text-start text-sm">
                    Obavezno uraditi u državnoj ustanovi
                  </p>
                </li>
                <li>
                  <p className="font-light text-start">3 davaoca krvi</p>
                </li>
                <li>
                  <p className="font-light text-start">Bolnička uputnica</p>
                </li>
              </ul>
              <p className="pre-op-title">
                Molimo Vas da prije dolaska provjerite osiguranje!!!
              </p>
            </div>
          </div>
        </div>

        {/* Arthroscopy Content */}
        <div className="flex flex-col justify-center items-center">
          <button
            onClick={() => printContent(printArthrRef)}
            className="flex justify-center items-center p-2 mb-5 bg-blue-500 text-blue-950 border-b-blue-950 border-b-2 rounded-xl cursor-pointer"
          >
            <p>Artroskopije</p>
          </button>
          <div
            className="pre-op flex flex-col justify-center items-center w-full text-center text-xl border-2 border-black"
            ref={printArthrRef}
          >
            <div className="pre-op-title font-semibold bg-gray-400 w-full">
              <p>ODJELJENJE ZA ORTOPEDSKU HIRURGIJU</p>
            </div>
            <div className="flex justify-between items-center w-full p-2 border-2 border-black">
              <div className="text-lg">
                <p>Telefon: </p>
              </div>
              <div className="border-l-2 border-l-black border-r-2 border-r-black h-full p-2 text-lg">
                <div>
                  <p>Glavna sestra odjeljenja</p>
                  <p className="text-xs">
                    'zakazivanje operacije, informacije'
                  </p>
                </div>
                <div>
                  <p>Ortopedska ambulanta</p>
                  <p className="text-xs">'zakazivanje pregleda i kontrola'</p>
                </div>
              </div>
              <div className="text-lg flex flex-col h-full justify-between">
                <div>
                  <p>051/348-443</p>
                  <p>051/348-444 lokal 1627</p>
                </div>
                <div>
                  <p>051/348-444 lokal 1620</p>
                </div>
              </div>
              <div></div>
            </div>
            <div className="text-xs w-full text-start bg-gray-400 p-1 border-b-2 border-b-black">
              <p>fax: 051/348-453</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 w-full">
              <p className="text-xl font-semibold">PREOPERATIVNA PRIPREMA</p>
              <ul className="flex flex-col justify-center items-start w-full gap-2">
                <li>
                  <p className="font-light text-start">
                    Kompletna laboratorija:{" "}
                  </p>
                  <p className="font-semibold text-start text-sm">
                    Za sve pacijente: KKS, DKS, urea, kreatinin, VK, VZ, ŠUK,
                    SE, CRP, AST, ALT, urin
                  </p>
                  <p className="font-semibold text-start text-sm">
                    Za sve pacijente na antikoagulantnoj terapiji dodatno: PV,
                    INR
                  </p>
                  <p className="font-semibold text-start text-sm">
                    Za sve pacijente koji koriste terapiju za štitnu žlijezdu:
                    T3, T4, TSH
                  </p>
                </li>
                <li>
                  <p className="font-light text-start">RTG srca i pluća</p>
                </li>
                <li>
                  <p className="font-light text-start">EKG</p>
                </li>
                <li>
                  <p className="font-light text-start">INTERNISTIČKI PREGLED</p>
                  <p className="font-semibold text-start text-sm">
                    ako imate pejsmejker, prije operacije javiti se nadležnom
                    kardiologu radi podešavanja
                  </p>
                  <p className="font-semibold text-start text-sm">
                    ako pijete acetilsalicilnu kiselinu/ aspirin, andol, midol i
                    sl. prestati uzimati 3 dana prije operacije.
                  </p>
                </li>
                <li>
                  <p className="font-light text-start">
                    Anesteziološki pregled
                  </p>
                </li>

                <li>
                  <p className="font-light text-start">
                    Krvna grupa i RH faktor
                  </p>
                  <p className="font-semibold text-start text-sm">
                    Obavezno uraditi u državnoj ustanovi
                  </p>
                </li>
                <li>
                  <p className="font-light text-start">Bolnička uputnica</p>
                </li>
              </ul>
              <p className="pre-op-title">
                Molimo Vas da prije dolaska provjerite osiguranje!!!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PreOp;
