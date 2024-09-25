const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ArchiveTableSchema = new Schema({
  table: { type: Array, required: true },
});

const ArchiveTableModel = model("ArchiveTable", ArchiveTableSchema);

module.exports = ArchiveTableModel;
