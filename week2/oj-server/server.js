var express = require("express");
var app = express();
var restRouter = require("./routes/rest");
var indexRouter = require("./routes/index");
var mongoose = require("mongoose");
var path = require("path");

mongoose.connect("mongodb://user:123user@ds123971.mlab.com:23971/coj531");
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', function(req, res) {
  res.send('haha node 3000')
})
// app.use("/", indexRouter);
app.use("/api/v1", restRouter);
//
// app.use(function(req, res) {
//   res.sendFile("index.html", {root: path.join(__dirname, '../public/')});
// })


app.listen(3000, function() {
  console.log('hello 3000')
})
