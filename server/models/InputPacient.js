const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const date = new Date()
const day = date.getDate()
const month = date.getMonth()
const year = date.getFullYear()

const InputPacientSchema = new Schema({
  id: { type: String },
  pacientName: { type: String, required: true },
  diagnosis: { type: String, required: true },
  mobile: { type: String, required: true },
  inputDate: { type: String, default: `${day}/${month + 1}/${year}` },
});


const InputPacientModel = model('InputPacient', InputPacientSchema)

module.exports = InputPacientModel