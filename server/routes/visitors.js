const express = require("express");
const visitorRoute = express.Router();
const visilant = require("../models/traffic.model");
const moment = require("moment");

// List of visitors
visitorRoute.get("/", async (req, res) => {
  try {
    let query;
    let filter =
      req.query.filter && req.query.filter != "undefined"
        ? req.query.filter
        : 0;
    let limit =
      req.query.limit && req.query.limit != "undefined"
        ? +req.query.limit
        : 5000;
    let skip =
      req.query.skip && req.query.skip != "undefined" ? +req.query.skip : 0;
    let search = makeQuery(filter);
    query = visilant.aggregate([
      { $match: search },
      { $sort: { created_on: -1 }},
      { $limit: skip + limit },
      { $skip: skip }
    ]);

    let visitors = await query;
    if (visitors && visitors.length) {
      res.status(200).json({ success: true, result: visitors });
    } else {
      res.status(200).json({ success: true, result: [] });
    }
  } catch (e) {
    throw e;
  }
});

// Single visitor
visitorRoute.get("/:id", async (req, res) => {
  try {
    let visitor = await visilant.findById(req.params.id);
    res.status(200).json({ success: true, result: visitor });
  } catch (e) {
    throw e;
  }
});

function makeQuery(filter) {
  if (filter == "today") {
    return { created_on: deductDays(0) };
  } else if (filter == "yesterday") {
    return { created_on: deductDays(1) };
  } else if (filter == "week") {
    return { created_on: { $gte: deductDays(7) }};
  } else if (filter == "month") {
    return { created_on: { $gte: deductDays(30) }};
  } else {
    return {};
  }
}

function deductDays(num) {
  return moment()
    .subtract(num, "days")
    .format("DD-MM-YYYY");
}

module.exports = visitorRoute;
