const express = require('express');
const Datastore = require('nedb');

const app = express();

app.listen(8800,()=>{console.log('server running at port : 8800');});

app.use(express.static('public'));
app.use(express.json({limit : '1mb'}));

const database = new Datastore('todo_database.db');
database.loadDatabase();
app.post('/api',(req,res)=>{
   console.log(req.body);
   database.insert(req.body);
   res.json(req.body);
});


app.get('/load',(req,res)=>{
   database.find({},(err,data)=>{
      if(err){
         res.end();
         return;
      }
      res.json(data);
   });
});

app.post('/new',(req,res)=>{
   let search = {
      tododata: req.body
   };
   database.find(search,(err,data)=>{
      if(err){
         res.end();
         return;
      }
      res.json(data);
   });
})

app.post('/update',(req,res)=>{
   let up = {
      tododata: req.body.n
   };
   let old = {
      tododata: req.body.o
   };
   database.update(old, up, {},(err,data)=>{
      if(err){
         res.end();
         return;
      }
      res.json(data);
   });
})

app.post('/delete',(req,res)=>{
   let del = {
      tododata: req.body
   };
   database.remove(del, {},(err,data)=>{
      if(err){
         res.end();
         return;
      }
      res.json(data);
   });
})