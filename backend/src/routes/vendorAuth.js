const express = require('express');
const vendorAuthRouter = express.Router();
const pool = require("../config/database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userAuth, vendorAuth } = require('../middlewares/auth');

vendorAuthRouter.post("/auth/vendor/login", async(req, res) => {
    try {
        const {emailid , password } = req.body;
        const user = await pool.query("SELECT * FROM vendors WHERE email_id = $1", [emailid]);
        console.log(user.rows[0])
        if(user.rows.length === 0){
            throw new Error("Vendor not found");
        }
        const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
        if (!isPasswordValid) {
        throw new Error("Invalid credentials !");
        }
        const token = await jwt.sign({id: user.rows[0].id} , "HERITEDGE@009", {expiresIn:"1d"});
        res.cookie("token", token);
        res.status(200).json({message: "Vendor logged in successfully ", user:user.rows[0]});
        
    } catch (error) {
        res.status(400).json({message:"Something went wrong : "+error.message});
    }
});

vendorAuthRouter.post("/auth/vendor/signup", async (req, res) => {
    try {
        const {emailid, password, name} = req.body;
        if(!emailid){
            throw new Error("Emaild Id required!");
        }
        const existingUser = await pool.query("SELECT * FROM vendors WHERE email_id = $1", [emailid]);
        if(existingUser.rows.length > 0 ){
            throw new Error("Email is already in use !");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query("INSERT INTO vendors (email_id, password, name) VALUES ($1,$2,$3) RETURNING *", [emailid, hashedPassword, name]);
        res.status(200).json({message:"Vendor Created Successfully", user:newUser.rows[0]});

    } catch (error) {
        res.status(400).json({message:"Something went wrong : "+error.message});
    }
});

vendorAuthRouter.post("/auth/vendor/logout", vendorAuth, async (req, res) => {
    const {name} = req.user;
    res.cookie("token", null, {expires: new Date(Date.now())});
    res.status(200).json({message:name+" logged out successfully !"});
})
module.exports = vendorAuthRouter;

