const express = require("express");

const app = express();

app.use(express.json());

const booksRoutes = require('./routes/books');
app.use('/',booksRoutes);


app.listen(3002,()=>{
    console.log("Server started and listing to port 3002......")
})