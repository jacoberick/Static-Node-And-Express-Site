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

//renders project pages
app.get("/project/:id", (req, res, next) => {
  let project = projects.filter(p => +p.id === +req.params.id)[0];
  if (project) {
    res.render("project", { project });
  } else {
    let error = new Error("Project not found");
    error.status = 500;
    next(error);
  }
});

//error Handling
app.use((req, res, next) => {
  let error = new Error("Path is not found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.log(`${err.status} — ${err.message}`);
  res.locals.error = err;
  res.status(err.status);
  res.render("error");
});

// listens to port 3000 and logs a success message
app.listen(3000, () => {
  console.log("The app is running on port 3000! sick.");
});
