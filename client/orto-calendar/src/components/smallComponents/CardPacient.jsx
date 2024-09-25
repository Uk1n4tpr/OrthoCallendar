import React, { useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever, MdSignalCellularNull } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import axios from "axios";

function CardPacient(props) {
  const { pac, setPacientsList, pacientsList, name } = props;

  const [isUpdatable, setIsUpdatable] = useState(false);
  const [updateData, setUpdatedData] = useState({
    name: "",
    diagnosis: "",
    mobile: "",
  });

  const updateRef = useRef(null);
  const saveRef = useRef(null);
  const nameRef = useRef(null);
  const diagnosisRef = useRef(null);
  const mobileRef = useRef(null);

  const handleDeletePacient = async (id) => {
    try {
      await axios.delete(`/delete-pacient/${id}`);
      console.log("pacient deleted successfully");
      setPacientsList(!pacientsList);
    } catch (error) {
      console.error("problem deleting pacient: ", error);
    }
  };

  const handleUpdateIcon = () => {
    setIsUpdatable(true);
    updateRef.current.style.display = "none";
    saveRef.current.style.display = "flex";
  };

  console.log(isUpdatable);

  const handleSaveIcon = () => {
    setIsUpdatable(false);
    updateRef.current.style.display = "flex";
    saveRef.current.style.display = "none";
    if (updateData.name === "") {
      updateData.name = nameRef.current.placeholder;
    }
    if (updateData.diagnosis === "") {
      updateData.diagnosis = diagnosisRef.current.placeholder;
    }
    if (updateData.mobile === "") {
      updateData.mobile = mobileRef.current.placeholder;
    }
  };

  const handleUpdatePacient = async (id) => {
    const { name, diagnosis, mobile } = updateData;
    try {
      await axios.post(`/update-pacient/${id}`, {
        name,
        diagnosis,
        mobile,
      });
      console.log("update pacient sucessfull");
      setIsUpdatable(false);
      setPacientsList(!pacientsList);
    } catch (error) {
      console.error("error updating pacient: ", error);
    }
  };

  const handleSendPacient = async (id) => { 
    try {
      const result = await axios.post(`/sending-pacient-to-program/${id}/${name}`)
      handleDeletePacient(id)
      console.log(result)
    } catch (error) {
      console.error('error sending pacient: ', error)
    }
   }

  return (
    <>
      <div className="flex justify-between items-center w-[90%] bg-gray-100 border-b-[5px] border-b-gray-500 rounded-xl p-3 my-2 ">
        <div className="flex flex-1 justify-between items-center">
          {isUpdatable ? (
            <>
              <div>
                <input
                  ref={nameRef}
                  onChange={(e) => {
                    setUpdatedData({
                      ...updateData,
                      name: e.target.value.toUpperCase(),
                    });
                  }}
                  type="text"
                  placeholder={pac.pacientName}
                  value={updateData.name}
                />
              </div>
              <div>
                <input
                  ref={diagnosisRef}
                  onChange={(e) => {
                    setUpdatedData({
                      ...updateData,
                      diagnosis: e.target.value.toUpperCase(),
                    });
                  }}
                  type="text"
                  placeholder={pac.diagnosis}
                  value={updateData.diagnosis}
                />
              </div>
              <div>
                <input
                  ref={mobileRef}
                  onChange={(e) => {
                    setUpdatedData({
                      ...updateData,
                      mobile: e.target.value.toUpperCase(),
                    });
                  }}
                  type="text"
                  placeholder={pac.mobile}
                  value={updateData.mobile}
                />
              </div>
              <div>
                <p>{pac.inputDate}</p>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
        <div className="flex justify-between items-center text-xl">
          <div
            ref={saveRef}
            onClick={() => {
              handleSaveIcon();
              handleUpdatePacient(pac._id);
            }}
            className="hidden px-3 text-green-500 cursor-pointer hover:text-2xl"
          >
            <FaSave />
          </div>
          <div
            ref={updateRef}
            onClick={() => {
              handleUpdateIcon();
            }}
            className="flex px-2 text-green-500 cursor-pointer hover:text-2xl"
          >
            <FaEdit />
          </div>
          <div
            onClick={() => {
              handleDeletePacient(pac._id);
            }}
            className="px-2 text-red-600 cursor-pointer hover:text-2xl"
          >
            <MdDeleteForever />
          </div>
          <div
            onClick={() => {
              handleSendPacient(pac._id);
            }}
            className="px-2 text-blue-600 cursor-pointer hover:text-2xl"
          >
            <IoMdSend />
          </div>
        </div>
      </div>
    </>
  );
}

export default CardPacient;
