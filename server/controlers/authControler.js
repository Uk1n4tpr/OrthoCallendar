const { MongoClient } = require("mongodb");
const InputPacient = require("../models/InputPacient");
const SentPacient = require("../models/SentPacient");
const TableHome = require("../models/TableHome");
const ArchiveTable = require("../models/ArchiveTable");
const PacientsForToday = require("../models/PacientsForToday");
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI;
const dbName = "users";
const dbNameDoktori = "Doktori";

const logIn = async (req, res) => {
  const { user, password } = req.body;

  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db(dbName);
    const usersCollection = db.collection("user");

    const userUsername = await usersCollection.findOne({ user });
    if (!userUsername) {
      return res.json({
        error: "korisnik sa tim imenom ne postoji!",
      });
    }

    if (password !== userUsername.password) {
      return res.json({
        error: "lozinka nije ispravna",
      });
    }

    res.json(userUsername);
  } catch (error) {
    console.error("failed to logIn: ", error);
  } finally {
    await client.close();
  }
};

const getDoktori = async (req, res) => {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db(dbNameDoktori);
    const usersCollection = db.collection("Doktori");

    const doktoriData = await usersCollection.find().toArray();
    res.json(doktoriData);
  } catch (error) {
    console.error("error fetching docs:", error);
  } finally {
    await client.close();
  }
};

const inputPacient = async (req, res) => {
  try {
    const { id, pacientName, diagnosis, mobile } = req.body;
    if (!pacientName) {
      return res.json({
        error: "Ime i prezime je neophodno",
      });
    }
    if (!diagnosis) {
      return res.json({
        error: "Dijagnoza je neophodna",
      });
    }
    if (!mobile) {
      return res.json({
        error: "mobilni je neophodan",
      });
    }
    const pacient = await InputPacient.create({
      id,
      pacientName,
      diagnosis,
      mobile,
    });

    return res.json(pacient);
  } catch (error) {
    console.error("error inputing pacient ", error);
  }
};

const getDoksPacients = async (req, res) => {
  try {
    const doksId = req.params.id;
    const pacients = await InputPacient.find({ id: doksId }).sort({
      inputDate: -1,
    });
    res.json(pacients);
  } catch (error) {
    console.error("Problem getting pacients: ", error);
  }
};

const deletePacient = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await InputPacient.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "patient not found" });
    }
    return res.status(200).json({ message: "patient deleted successfully" });
  } catch (error) {
    console.error("problem deleting pacient: ", error);
  }
};

const updatePacient = async (req, res) => {
  const { name, diagnosis, mobile } = req.body;
  const { id } = req.params;
  try {
    const pacient = await InputPacient.findByIdAndUpdate(id, {
      pacientName: name,
      diagnosis: diagnosis,
      mobile: mobile,
    });
    console.log(pacient);
    res.json(pacient);
  } catch (error) {
    console.error("error updating mongodb pacient: ", error);
  }
};

const sendPacientToProgram = async (req, res) => {
  const { id, name } = req.params;
  try {
    const pacient = await InputPacient.findById(id);

    const dokId = pacient.id;
    const pacientName = pacient.pacientName;
    const diagnosis = pacient.diagnosis;
    const mobile = pacient.mobile;
    const inputDate = pacient.inputDate;
    const doktor = name;

    const result = await SentPacient.create({
      dokId,
      pacientName,
      diagnosis,
      mobile,
      inputDate,
      doktor,
    });
    console.log(result);
    return res.json(result);
  } catch (error) {
    console.error("error sending pacient: ", error);
  }
};

const getSentPacients = async (req, res) => {
  try {
    const users = await SentPacient.find();
    return res.json(users);
  } catch (error) {
    console.error("error fetching pacients: ", error);
  }
};

const deletePacientForProgram = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await SentPacient.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "patient not found" });
    }
    return res.status(200).json({ message: "patient deleted successfully" });
  } catch (error) {
    console.error("problem deleting pacient: ", error);
  }
};

const returnPacientFromTable = async (req, res) => {
  try {
    const { dokId, pacientName, diagnosis, mobile, inputDate, doktor } =
      req.body;
    const result = await SentPacient.create({
      dokId,
      pacientName,
      diagnosis,
      mobile,
      inputDate,
      doktor,
    });
    return res.json(result);
  } catch (error) {
    console.error("error sending pacient: ", error);
  }
};

const newTable = async (req, res) => {
  const table = req.body;
  try {
    const result = await TableHome.create({
      table,
    });
    res.json(result);
  } catch (error) {
    console.error("error creating table: ", error);
  }
};

const getTables = async (req, res) => {
  try {
    const result = await TableHome.find();
    res.json(result);
  } catch (error) {
    console.error("error geting tables: ", error);
  }
};

const updateTableData = async (req, res) => {
  const { id } = req.params;
  const newTableData = req.body;

  try {
    const updatedTable = await TableHome.findByIdAndUpdate(
      id,
      { table: newTableData },
      { new: true, useFindAndModify: false }
    );
    if (!updatedTable) {
      return res.status(404).json({ message: "Table not found" });
    }
    res.json(updatedTable);
  } catch (error) {
    console.error("Error updating table data: ", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const archiveTable = async (req, res) => {
  const table = req.body;
  try {
    const result = await ArchiveTable.create({
      table,
    });
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error("problem archiving and deleting table: ", error);
  }
};

const deleteTable = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await TableHome.findOneAndDelete({ _id: id });
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error("problem deleting table: ", error);
  }
};

const getArchivedTables = async (req, res) => {
  try {
    const result = await ArchiveTable.find();
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error("error getting tables: ", error);
  }
};

const getPacientsForToday = async (req, res) => {
  try {
    const result = await PacientsForToday.find();
    res.json(result);
  } catch (error) {
    console.error("error getting pacients sent for today: ", error);
  }
};

const sendPacientsForToday = async (req, res) => {
  const pacients = req.body;
  try {
    const pacientsFound = await PacientsForToday.findOne({
      pacients: pacients,
    });
    if (pacientsFound) {
      return res.json("pacients are already sent");
    }
    const result = PacientsForToday.create({
      pacients,
    });
    res.json(result);
  } catch (error) {
    console.error("error sending pacients: ", error);
  }
};

const deleteExesPacients = async (req, res) => {
  const { idsToDelete } = req.body;

  if (!Array.isArray(idsToDelete)) {
    return res.status(400).json({ message: 'idsToDelete must be an array' });
  }

  const objectIdArray = idsToDelete.map(id => new mongoose.Types.ObjectId(id));

  try {
    const result = await PacientsForToday.deleteMany({
      _id: { $in: objectIdArray }
    });

    return res.status(200).json({ message: 'Deleted successfully', result });
  } catch (error) {
    console.error('Error deleting patients:', error);
    return res.status(500).json({ message: 'Error deleting patients', error });
  }
};

module.exports = {
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
  getPacientsForToday,
  sendPacientsForToday,
  deleteExesPacients,
};
