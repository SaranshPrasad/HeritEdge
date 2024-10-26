const jwt = require("jsonwebtoken");
const pool = require("../config/database");

const userAuth = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token){
            throw new Error("Login Again !");
        }
        const decodedMessage = jwt.verify(token, "HERITEDGE@009");
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [decodedMessage.id]);
        if(user.rows.length < 0){
            throw new Error("User not logged in !");
        }
        req.user = user.rows[0];
        next();

    } catch (error) {
        res.status(400).json({message:"Something went wrong : "+error.message});
    }
}

const vendorAuth = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token){
            throw new Error("Login Again !");
        }
        const decodedMessage = jwt.verify(token, "HERITEDGE@009");
        const user = await pool.query("SELECT * FROM vendors WHERE id = $1", [decodedMessage.id]);
        if(user.rows.length < 0){
            throw new Error("User not logged in !");
        }
        req.user = user.rows[0];
        next();

    } catch (error) {
        res.status(400).json({message:"Something went wrong : "+error.message});
    }
}

module.exports = {userAuth, vendorAuth};