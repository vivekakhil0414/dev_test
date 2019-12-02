const express = require("express");
const homeRoute = express.Router();
const os = require("os");
const mobileDetect = require("mobile-detect");
const ifaces = os.networkInterfaces();
const visitorModel = require("../models/traffic.model");
const moment = require("moment");

homeRoute.get("/", async (req, res) => {
  let localIp;
  const event = moment().format("DD-MM-YYYY, h:mm:ss");
  Object.keys(ifaces).forEach(function(ifname) {
    let alias = 0;

    ifaces[ifname].forEach(function(iface) {
      if ("IPv4" !== iface.family || iface.internal !== false) {
        return;
      }
      if (alias >= 1) {
        localIp = iface.address;
      } else {
        localIp = iface.address;
      }
      ++alias;
    });
  });

  let md = new mobileDetect(req.headers["user-agent"]);
  try {
    let user = new visitorModel({
      device: md.ua,
      ipv4: req.query.ip,
      dateTime: event,
      created_on: moment().format("DD-MM-YYYY")
    });
    await user.save();
    res.status(200).json({ success: true });
  } catch (e) {
    throw e;
  }
});

module.exports = homeRoute;
