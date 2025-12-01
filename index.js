
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

let todos=[];

app.get("/", (req, res) => {
    res.render('home.ejs',{todos})
});

app.post('/todos',(req,res)=>{
    todos.push(req.body);
    res.redirect('/');
});

app.delete('/todos/:id',(req,res)=>{
    let id=Number(req.params.id);
    todos.splice(id,1);
    res.redirect('/');
});

app.put('/todos/:id/completed',(req,res)=>{
    let id=Number(req.params.id);
    todos.splice(id,1);
    res.redirect('/');
});

app.get('/todos/:id/edit',(req,res)=>{
    let id = Number(req.params.id);
    let todo = todos[id];
    res.render("edit.ejs", { todo, id });
});

app.put("/todos/:id",(req,res)=>{
    let id=Number(req.params.id);
    todos[id].content=req.body.newContent;
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

