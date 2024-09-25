const { Router } = require("express");
const router = Router();
const cors = require("cors");
const {
  logIn,
  getDoktori,
  inputPacient,
  getDoksPacients,
  deletePacient,
  updatePacient,
  sendPacientToProgram,
  getSentPacients,
  deletePacientForProgram,
  returnPacientFromTable,
  newTable,
  getTables,
  updateTableData,
  archiveTable,
  deleteTable,
  getArchivedTables,
  sendPacientsForToday,
  getPacientsForToday,
  deleteExesPacients
} = require("../controlers/authControler");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/login", logIn);
router.get("/doktori", getDoktori);
router.post("/pacient-input", inputPacient);
router.get("/getDoksPacients/:id", getDoksPacients);
router.delete("/delete-pacient/:id", deletePacient);
router.post("/update-pacient/:id", updatePacient);
router.post("/sending-pacient-to-program/:id/:name", sendPacientToProgram);
router.get("/get-sent-pacients", getSentPacients);
router.delete("/delete-pacient-for-program/:id", deletePacientForProgram);
router.post("/return-pacient-from-table", returnPacientFromTable);
router.post("/new-table", newTable);
router.get("/get-tables", getTables);
router.post("/update-table-data/:id", updateTableData);
router.post("/archive-table/:tableId", archiveTable);
router.delete("/delete-table/:tableId", deleteTable);
router.get("/get-archived-tables", getArchivedTables);
router.get("/get-pacients-for-today", getPacientsForToday);
router.post("/send-pacients-for-today", sendPacientsForToday);
router.delete('/delete-exces-pacients', deleteExesPacients)

module.exports = router;
