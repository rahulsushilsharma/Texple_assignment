var Owlbot = require('owlbot-js');
  
var client = Owlbot("de6cee09a2f30c7223b7c616994c4fc20a7c2929");
 
client.define('owl').then(function(result){
   console.log(result);
});