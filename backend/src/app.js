const express = require("express");
const app = express();
const PORT = 7777;
const pool = require("./config/database");
const cookieParser = require("cookie-parser")

// database connection 
pool
  .connect()
  .then(client => {
    console.log('Connected to PostgreSQL');
    console.log(`Server is up on http://localhost:${PORT}`)
    client.release();
  })
  .catch(err => console.error('Connection error', err.stack));

const authRouter = require('./routes/auth');


// middlewares 
app.use(express.json());
app.use(cookieParser())
app.get("/", (req, res) => {
    res.send("Hellow from HeritEdge");
});




app.use("/", authRouter);




app.listen(PORT, (req, res) => {
})