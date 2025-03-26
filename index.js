const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const{v4:uuidv4}=require("uuid");
const methodOverride=require("method-override");

app.use(express.urlencoded({extended :true}));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username:"S.Adam",
        content:"How I Landed My First Internship in Tech",
    },
    {
        id:uuidv4(),
        username:"Steve",
        content:"Is social media bringing us closer or pulling us apart?"
    },
    {
        id:uuidv4(),
        username:"Joe",
        content:"5 Habits That Will Change Your Life in 6 Months"
    }
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let  {id} =req.params;
    let post=posts.find((p)=> p.id === id);
    res.render("show.ejs",{post})
})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let Newcontent=req.body.content;
    let post=posts.find((p)=>p.id===id);
    post.content=Newcontent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>p.id===id);
    console.log(post);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
    let {id} =req.params;
    posts=posts.filter((p)=> p.id != id);
    res.redirect("/posts");
})
app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`);
})