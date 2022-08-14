const router = require("express").Router()
const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const Blog = require("../models/Blog")

router.get("/register", (req, res) => {
    res.render("register.ejs")
})

router.get("/login", async (req, res) => {
    res.render("login.ejs")
})

router.get("/dashboard", async (req, res) => {
    const blogs = await Blog.find()
    res.render("dashboard.ejs", { blogs })
})

router.post("/register", async (req, res) => {
    try{
        const hashedPass = await bcryptjs.hash(req.body.password, 10)
        const newUser = new User({
            email: req.body.email,
            password: hashedPass
        })
        await newUser.save()
        res.redirect("/login")

    } catch(err) {
        res.json(err)
    }
})

router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email})
        if(!user) return res.json("Wrong email")
        const validated = await bcryptjs.compare(req.body.password, user.password)
        if(!validated) return res.json("Wrong password")

        res.redirect("/dashboard")
        
    } catch(err) {
        res.json(err)
    }
})

module.exports = router