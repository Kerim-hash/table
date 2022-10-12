const express = require("express");
const router = express.Router();
const Table = require("../models/table.models");

router.post("/table/", async (req, res) => {
  try {
    const table = new Table();
    table.name = req.body.name;
    table.date = req.body.date;
    table.distance = req.body.distance;
    table.quantity = req.body.quantity;

    await table.save();
    res.json({
      success: true,
      message: "Successfully added table",
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: e.message,
    });
  }
});

router.get("/table", async (req, res) => {
  try {
    const { page = 1, limit = 4 } = req.query;
    const obj = await Table.find();
    const posts = await Table.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    res.send({ data: posts, total: obj.length });
  } catch (e) {
    res.json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
