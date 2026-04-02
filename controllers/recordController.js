const recordService = require("../services/recordService");

// 🔹 CREATE RECORD
const createRecord = async (req, res) => {
  try {
    const result = await recordService.addRecord(req.body, req.user);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 🔹 GET RECORDS
const getRecords = async (req, res) => {
  try {
    const result = await recordService.fetchRecords(req.query);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 DELETE RECORD (SOFT DELETE)
const deleteRecord = async (req, res) => {
  try {
    const result = await recordService.removeRecord(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createRecord,
  getRecords,
  deleteRecord,
};