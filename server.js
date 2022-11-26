require("dotenv").config()
const express = require("express")
const app = express()
const PORT = 3000
// const Log = require("./models/logs")
const reactViews = require('express-react-views')
const mongoose = require("mongoose")
const methodOverride = require('method-override');
// const bodyParser = require("body-parser")
const logController = require("./controllers/logController")

// Global Configuration
const mongoURI = process.env.MONGO_URI
const db = mongoose.connection

// ===== Connection to Database =====
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
mongoose.connection.once("open", () => {
  console.log("connected to mongo")
})


// Connection Error/Success
// Define callback functions for various events
db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("open", () => console.log("mongo connected: "));
db.on("close", () => console.log("mongo disconnected"));




// Setup Engine

app.set("view engine", "jsx")
app.engine("jsx", reactViews.createEngine())


// middleware: next is the only way to move on with your route

app.use((req, res, next) => {
  console.log("Im running for all routes")
  console.log("1. middleware")
  next()
})

// a new body object containing new parsed data after the middleware?
// app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))


// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })

//ROUTES
app.use("/logs", logController)


// INDEX
// app.get("/logs", (req, res) => {
//   Log.find({}, (error, allLogs) => {
//     if (!error) {
//       res.status(200).render("Index", {
//         logs: allLogs
//       })
//     } else {
//       res.status(400).send(error)
//     }
//   })

// })



// // // NEW

// app.get("/logs/new", (req, res) => {
//   res.render("New")
// })


// // DELETE

// app.delete("/logs/:id", (req, res) => {
//   Log.findByIdAndDelete(req.params.id, (err, data) => {
//     res.redirect("/logs")
//   })
// })

// // UPDATE

// app.put("/logs/:id", (req, res) => {
//   req.body.shipIsBroken = req.body.shipIsBroken === "on" ? true : false
//   Log.findByIdAndUpdate(req.params.id, req.body, (err, updatedLog) => {
//     if (!err) {
//       res.status(200).redirect("/logs")
//     } else {
//       res.status(400).send(err)
//     }
//   })
// })




// // CREATE

// app.post("/logs", (req, res) => {
//   req.body.shipIsBroken = req.body.shipIsBroken === "on" ? true : false;

//   Log.create(req.body, (error, createdLog) => {
//     if (!error) {
//       res.status(200).redirect("/logs")
//     } else {
//       res.status(400).send(error);
//     }
//   })
// });

// // Log.create(req.body, (error, createdLog) => {
// //   if (!error) {
// //     res.status(200).redirect("/logs")
// //   } else {
// //     res.status(400).send(error)
// //   }
// // })




// // EDIT

// app.get("/logs/:id/edit", (req, res) => {
//   Log.findById(req.params.id, (err, foundLog) => {
//     if (!err) {
//       res.status(200).render("Edit", { log: foundLog })
//     } else {
//       res.status(400).send({ msg: err.message })
//     }
//   })
// })





// // SHOW

// app.get("/logs/:id", (req, res) => {
//   Log.findById(req.params.id, (error, foundLog) => {
//     if (!error) {
//       res
//         .status(200)
//         .render("Show", {
//           log: foundLog
//         })
//     } else {
//       res
//         .status(400)
//         .send(error)
//     }
//   })
// })
// res.send(fruits[req.params.indexOfFruit])








app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
});