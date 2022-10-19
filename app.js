require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;
const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })  
app.use(express.static('public'));  
app.get('/index.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "index.html" );  
})  


app.use(cors());
app.use(bodyParser.json());

const middleware = function (req, res, next) {
  console.log("Yeni bir istek geldi.");
  next();
};

const middlewareToPost = function (req, res, next) {
  console.log("Post iseği için istek gönderildi.");
  next();
};

app.use(middleware);
app.use(middlewareToPost);

app.get("/hello", middleware, function (req, res) {
  let data = require("./data.json");
  res.json(data);

  //res.json("Merhaba, GET isteği attınız");
});

app.post("/hello", urlencodedParser, middleware, middlewareToPost, function (req, res) {
  response = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  };
  console.log(response);
  res.json(response);
  // res.json("Merhaba, POST isteği attınız");
});

app.put("/hello", middleware,  function (req, res) {
    res.json("Merhaba, PUT isteği attınız");
});

app.delete("/hello", middleware,  function (req, res) {
  res.json("Merhaba, DELETE  isteği attınız");
});

app.listen(PORT, () => {
  console.log("Ready on http://localhost:" + PORT);
});
