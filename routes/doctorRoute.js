const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/get-doctor-info-by-user-id", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.body.userId });

    return res
      .status(200)
      .send({
        message: "Doctor info fetched successfully",
        success: true,
        data: doctor,
      });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting doctor info", success: false, error });
  }
});

router.post("/update-doctor-profile", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate({ userId: req.body.userId }, req.body);

    return res
      .status(200)
      .send({
        message: "Doctor profile updated successfully",
        success: true,
        data: doctor,
      });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error in updating doctor info", success: false, error });
  }
});

module.exports = router;
