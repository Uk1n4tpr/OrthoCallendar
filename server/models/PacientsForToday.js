const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const date = new Date()

const PacientsForTodaySchema = new Schema({
  pacients: { type: Array, required: true },
});

const PacientsForTodayModel = model("PacientsForToday", PacientsForTodaySchema);

module.exports = PacientsForTodayModel;
