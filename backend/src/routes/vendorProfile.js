const express = require("express");
const { vendorAuth } = require("../middlewares/auth");
const vendorProfileRouter = express.Router();
const pool = require("../config/database");


vendorProfileRouter.get("/vendor/profile", vendorAuth, (req, res) => {
  try {
    const allowedData = ["name", "about", "address"];
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

vendorProfileRouter.patch("/vendor/profile/edit", vendorAuth, async (req, res) => {
   try {
    const user = req.user;
    const updateData = req.body;
    const allowedUpdateData = ["name", "about", "address"];
    const isAllowedUpdates = Object.keys(updateData).every((k) => {
        return allowedUpdateData.includes(k);
    });
    if(!isAllowedUpdates){
        throw new Error("Update not allowed");
    }
    const updatedData = {
        name:updateData.name || user.name,
        about:updateData.about || user.about,
        address:updateData.address || user.address,
    }
    const result = await pool.query(
        `UPDATE vendors SET name = $1, about = $2, address = $3, updated_at = NOW() WHERE id = $4 RETURNING *`,
        [updatedData.name,updatedData.about, updatedData.address, user.id]
    );
    res.status(200).json({message:"User updated successfully !", user:result.rows[0]});
   } catch (error) {
    res.status(400).json({message:"Something went wrong : "+error.message});
   }
});



module.exports = vendorProfileRouter;
