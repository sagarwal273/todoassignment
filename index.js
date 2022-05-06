const express = require("express");
const mongoose = require("mongoose");


const app = express();


const PORT = 5000;
const db = "mongodb://localhost:27017/todoApp"

mongoose.connect(db, ({ useNewUrlParser: true }))
    .then(console.log("Connected to MongoseDB"))
    .catch(err => console.log(err))

const todoSchema = new mongoose.Schema({
    title: String
})

const Todo = mongoose.model('todo', todoSchema)

app.get("/todos", (req, res) => {
    Todo.find().then(todo => res.json(todo))
})

app.post("/todos", (req, res) => {
    const newTodo = new Todo({
        title: req.body.text
    })
    newTodo.save().then(todo => res.json(todo))
})
app.delete("/todos/:id", (req, res) => {
    Todo.findByIdAndDelete(req.params.id)
        .then(() => res.json({ remove: true }))
})
// Middleware
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API Working" });
});

app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
});