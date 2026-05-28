import "./src/config/env.js"
import app from "./src/app.js"
import connectDB from "./src/config/db.js"

app.listen(process.env.port,()=>{
    console.log("server is running successfuly")
})

connectDB();