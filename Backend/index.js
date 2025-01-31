const express = require("express");
const app = express();


app.get("/", (req, res) => {
    res.send("HOME");
})



app.listen(8080, () => {
    console.log("app is listening to port .");
})