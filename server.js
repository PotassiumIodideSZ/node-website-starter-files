const express = require("express");
const path = require('path');

const app = express();
 
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, '/public')));
app.use("/", function(_, response){
     
    response.render("contact.hbs", {
    });
});
app.listen(7000);