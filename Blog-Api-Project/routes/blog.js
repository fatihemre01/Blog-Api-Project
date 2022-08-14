const router = require("express").Router()
const Blog = require("../models/Blog")

router.get("/sharepost", (req, res) => {
    res.render("sharepost.ejs")
})

router.post("/sharepost", async(req, res) => {
    const newBlog = new Blog({
        title: req.body.title,
        content: req.body.content
    })
    await newBlog.save()
    res.redirect("/dashboard")
})


module.exports = router