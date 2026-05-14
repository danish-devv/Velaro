import app from "./src/app.js"
import connectDB from "./src/database/db.js"
import dotenv from "dotenv"
dotenv.config()

app.listen(process.env.port,()=>{
    console.log("server is running successfuly")
})

connectDB();