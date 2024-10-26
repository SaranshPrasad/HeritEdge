const express = require("express");
const { userAuth } = require("../middlewares/auth");
const profileRouter = express.Router();
const pool = require("../config/database");


profileRouter.get("/user/profile", userAuth, (req, res) => {
  try {
    const allowedData = ["name", "age", "gender", "location", "address"];
    const user = req.user;
    const userData = Object.keys(user)
      .filter((key) => allowedData.includes(key))
      .reduce((acc, key) => {
        acc[key] = user[key];
        return acc;
      }, {});

    res
      .status(200)
      .json({ message: "User fetched Successfully ", user: userData });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong :  " + error.message });
  }
});

profileRouter.patch("/user/profile/edit", userAuth, async (req, res) => {
   try {
    const user = req.user;
    const updateData = req.body;
    const allowedUpdateData = ["name", "age", "location", "address", "gender"];
    const isAllowedUpdates = Object.keys(updateData).every((k) => {
        return allowedUpdateData.includes(k);
    });
    if(!isAllowedUpdates){
        throw new Error("Update not allowed");
    }
    const updatedData = {
        name:updateData.name || user.name,
        age:updateData.age || user.age,
        location:updateData.location || user.location,
        address:updateData.address || user.address,
        gender:updateData.gender || user.gender,
    }
    const result = await pool.query(
        `UPDATE users SET name = $1, age = $2, location = $3, address = $4, gender = $5, updated_at = NOW() WHERE id = $6 RETURNING *`,
        [updatedData.name, updatedData.age, updatedData.location, updatedData.address, updatedData.gender, user.id]
    );
    res.status(200).json({message:"User updated successfully !", user:result.rows[0]});
   } catch (error) {
    res.status(400).json({message:"Something went wrong : "+error.message});
   }
});



module.exports = profileRouter;
