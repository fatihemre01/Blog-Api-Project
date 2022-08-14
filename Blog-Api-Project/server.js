const express = require("express")
const app = express()
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const blogRoute = require("./routes/blog")

mongoose.connect("mongodb://localhost/BlogDb")
    .then(res => console.log("Connected"))
    .catch(err => console.log("Not connected"))

app.set("view-engine", "ejs")
app.use(express.urlencoded({extended: false}))

app.use(authRoute)
app.use(blogRoute)

const port = 3000
app.listen(port, () => console.log("Running on port", port) )