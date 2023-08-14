require("dotenv").config();
const BookingRouter = require("./Routes/booking.Routes");
const FlightRouter = require("./Routes/flight.Routes");
const UserRouter = require("./Routes/user.Routes");
const connection = require("./db");
const express = require('express')
const app = express()

app.use(express.json());
app.get('/', (req, res) => res.send('Hello World!'));
app.use("/api",UserRouter);
app.use("/api",FlightRouter);
app.use("/api",BookingRouter);
app.listen(process.env.PORT, async() => {
    try{
        await connection;
        console.log(`Connected to DB ad server running at port ${process.env.PORT}`);
    }
    catch(err){
        console.log(err.message);
    }
})