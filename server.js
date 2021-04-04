const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 2000;
require("dotenv").config();

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = "todo";

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then((client) => {
    console.log(`Connected to ${dbName} database`);
    db = client.db(dbName);
  })
  .catch((err) =>
    console.error("Failure to connect: ", err.message, err.stack)
  );
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (request, response) => {
  const todoItems = db
    .collection("todos")
    .find()
    .toArray()
    .then((info) => {
      response.render("index.ejs", { info });
    })
    .catch((err) => console.error(err));
});

app.post("/addTodo", (req, res) => {
  db.collection("todos")
    .insertOne({ todo: req.body.todoInput })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.error(err));
});

app.delete("/deleteTask", (req, res) => {
  db.collection("todos")

    .deleteOne({ todo: req.body.todo })
    .then((result) => {
      res.json("taskDeleted");
    })
    .catch((err) => console.error(err));
});

app.put("/markAsDone", (req, res) => {
  db.collection("todos")

    .updateOne(
      { todo: req.body.todo },
      {
        $set: { completed: req.body.completed }
      }
    )
    .then((result) => {
      res.json("taskUpdated");
    })
    .catch((err) => console.error(err));
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
