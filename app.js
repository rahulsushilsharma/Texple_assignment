const Owlbot = require('owlbot-js');
const express = require('express');

const app = express();

app.listen(8800);

app.get('/', (req,res)=>{
   res.sendFile("./index.html", {root: __dirname})
});
