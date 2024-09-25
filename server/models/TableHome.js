const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TableHomeSchema = new Schema({
  table: { type: Array, required: true },
});

const TableHomeModel = model("TableHome", TableHomeSchema);

module.exports = TableHomeModel;
