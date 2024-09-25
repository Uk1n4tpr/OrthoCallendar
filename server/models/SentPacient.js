const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SentPacientSchema = new Schema({
  id: { type: String },
  pacientName: { type: String, required: true },
  diagnosis: { type: String, required: true },
  mobile: { type: String, required: true },
  inputDate: { type: String, required: true },
  doktor: {type: String, required: true}
});


const SentPacientModel = model('SentPacient', SentPacientSchema)

module.exports = SentPacientModel