const Owlbot = require('owlbot-js');
const express = require('express');

const app = express();

app.listen(8800);

app.get('/', (req,res)=>{
   res.sendFile("./index.html", {root: __dirname})
});
// let TOKEN = "de6cee09a2f30c7223b7c616994c4fc20a7c2929";

// var client = Owlbot(TOKEN);
// //    client.define('owl').then(function(result){
// //       console.log(result);
// //       res.
// //    }); 