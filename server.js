var express = require("express");
var cors = require("cors");

var axios = require("axios");

const fetch = (...args) => {
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
};

var bodyParser = require("body-parser");

const CLIENT_ID = "841897cac8f3c68e798";
const CLIENT_SECRET = "6424889165ab4ccf0ae7e4da08971e4ef472f9ce";

var app = express();

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// app.use(cors());

app.use(bodyParser.json());

app.get("/getAccessToken", async function (req, res) {
  req.query.code;

  const params =
    "?client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET +
    "&code=" +
    req.query.code;

  const response = await axios("https://github.com/login/oauth/access_token", {
    method: "POST",
    params: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: req.query.code,
    },
    headers: {
      Accept: "application/json",
    },
  });
  console.log(response);
  // .then((response) => {
  //   console.log(response);
  //   return response.json();
  // })
  // .then((data) => {
  //   console.log(data);
  //   res.json(data);
  // });
});

app.get("/getUserData", async function (req, res) {
  req.get("Authorization");

  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"), // Bearer Access token
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

app.listen(4000, function () {
  console.log("server running on port 4000");
});
