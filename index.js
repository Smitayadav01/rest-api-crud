const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const{v4:uuidv4}=require("uuid");

app.use(express.urlencoded({extended :true}));
app.use(express.json());

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username:"apnacollege",
        content:"I love coding"
    },
    {
        id:uuidv4(),
        username:"smita",
        content:"Hard work is important to get the success"
    },
    {
        id:uuidv4(),
        username:"nikhilyadav",
        content:"I got selected for the mbms"
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
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.render("show.ejs",{post})
})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let Newcontent=req.body.content;
    let post=posts.find((p)=>p.id===id);
    post.content=Newcontent;
    console.log(post);
    res.send("patch  is working ");
})
app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`);
})