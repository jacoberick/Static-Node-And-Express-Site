// required dependencies
const express = require("express");
const data = require("./data");
const { projects } = data.data;
const app = express();

// sets view engine to pug ▼・ᴥ・▼
app.set("view engine", "pug");

// serves static files in the public folder
app.use("/static", express.static("public"));

// renders the home page
app.get("/", (req, res) => {
  res.render("index", { projects });
});

//renders about page
app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/project/:id", (req, res) => {
  let project = projects.filter(p => +p.id === +req.params.id)[0];
  res.render("project", { project });
});

// listens to port 3000 and logs a success message
app.listen(3000, () => {
  console.log("The app is running on port 3000! sick.");
});
