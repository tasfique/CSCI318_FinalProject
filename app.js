const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const xlsxFile = require("read-excel-file/node");
const StaticData = require("./models/staticData");
const fs = require("fs");

// create express app
const app = express();

// connect to mongodb & listen for requests
const dbURI =
  "mongodb+srv://project318:project318@318project.uu8vs.gcp.mongodb.net/project?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

var valus = [];
var testing = [];

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// default options
app.use(fileUpload());

// routes
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// dynamic routes
app.get("/map", (req, res) => {
  if (testing.length == 0) {
    res.render("dataVisual", { title: "Data" });
  } else {
    res.render("dataVisual", { title: "Hospital Location" });
  }
});

app.get("/chart", (req, res) => {
  if (testing.length == 0) {
    res.render("chart", { staticdatas: testing, title: "Data" });
  } else {
    res.render("chart", { staticdatas: testing, title: "Data Visualization" });
  }
});

// // dynamic routes
// app.get('/dynamic', (req, res) => {
//   DynamicData.find()
//     .then(result => {
//       console.log(result);
//       res.render('dynamic', { dynamicdatas: result, title: 'Show Data' });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// index
app.get("/", (req, res) => {
  if (testing.length == 0) {
    res.render("index", { staticdatas: testing, title: "Home" });
  } else {
    res.render("index", { staticdatas: testing, title: "Show Data" });
  }
  // StaticData.find()
  //   .then(result => {
  //     console.log("testinghenadf");
  //     res.render('index', { staticdatas: result, title: 'Home' });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
});

// select the file, save the file in public folder and proceed
app.post("/", (req, res) => {
  // if (req.body.search != null) {
  //   StaticData.find()
  //     .then(result => {
  //       valus.push(result[0]);
  //     });

  //   const search = req.body.search;
  //   StaticData.findOne({ year: search })
  //     .then(result => {
  //       valus.push(result);
  //       res.render('index', { staticdatas: valus, title: 'Show Data' })
  //     })
  // }
  // else {
  // if (!req.files || Object.keys(req.files).length === 0) {
  //   return res.status(400).send('No files were uploaded.');
  // }

  // var data_set = req.files.data_set;
  var direc = "./public/" + req.files.data_set.name;

  // if (!fs.existsSync(direc)) {
  //   // Use the mv() method to save the file in public folder
  // data_set.mv(direc, function (err) {
  //   if (err)
  //     return res.status(500).send(err);
  // });

  xlsxFile(direc).then((rows) => {
    console.log("aloalo");

    // skip header
    // rows.shift();
    for (i in rows) {
      testing[i] = [];
      for (j in rows[i]) {
        testing[i][j] = rows[i][j];
      }
    }
    console.log("asdfasf");

    // rows.forEach((row) => {
    //   var staticD = {
    //     hospital: row[0],
    //     state: row[1],
    //     category: row[2],
    //     officialBed: row[3],
    //     operatingBed: row[4],
    //     patientAdmission: row[5],
    //     dailyAdmission: row[6],
    //     bedUsageRate: row[7],
    //     averageStay: row[8],
    //     bedDurationCleared: row[9]
    //   };
    //   const staticData = new StaticData(staticD);
    //   staticData.save()
    // });
  });
  console.log("testing12321");
  console.log(testing);
  function running() {
    res.render("index", { staticdatas: testing, title: "Show Data" });
  }
  setTimeout(running, 1000);
  // res.render('index', { staticdatas: testing, title: 'Show Data' });
  // function running() {
  //   StaticData.find()
  //     .then(result => {
  //       res.render('index', { staticdatas: result, title: 'Show Data' });
  //     });
  // }
  // setTimeout(running, 10000);
  // } else {

  // StaticData.find()
  //   .then(result => {
  //     res.render('index', { staticdatas: result, title: 'Show Data' });
  //   });
  // }
  // }
});

// app.post('/search', (req, res) => {
//   const search = req.body.search;
//   console.log(search);
//   StaticData.findOne({ year: 1994 })
//     .then(result => {
//       console.log(result);
//       res.render('index', { staticdatas: result, title: 'Show Data' })
//     })
// });

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
