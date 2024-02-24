const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/:id", authMiddleware, async (req, res) => {
  try {
    const newdoctor = new Doctor({ ...req.body, status: "pending" });
    await newdoctor.save();
    const adminUser = await User.findOne({ isAdmin: true });

    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "new-doctor-request",
      message: `${newdoctor.firstName} ${newdoctor.lastName} has applied for a doctor account`,
      data: {
        doctorId: newdoctor._id,
        name: newdoctor.firstName + " " + newdoctor.lastName,
      },
      onClickPath: "/admin/doctorslist",
    });
    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });

    res
      .status(200)
      .send({ message: "Applied for doctor account successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        message: "Error in applying for doctor account",
        success: false,
        error,
      });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(doctorId, {
      status,
    });

    console.log(doctor)
    // const user = await User.findOne({ _id: doctor.userId });

    // const unseenNotifications = user?.unseenNotifications;
    // unseenNotifications?.push({
    //   type: "doctor-status-change",
    //   message: `Your doctor account has been ${status}`,
    //   onClickPath: "/notifications",
    // });

    // user.isDoctor = status === "approved" ? true : false
    // await user.save();

    res.status(200).send({
      message: "Doctor status updated successfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .send({ message: "Something went wrong", success: false, error });
  }
});

router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find({});

    res.status(200).send({
      message: "Doctors fetched successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong", success: false, error });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctor = await Doctor.findById(doctorId);

    res.status(200).send({
      message: "Doctor fetched successfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong", success: false, error });
  }
});

router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong", success: false, error });
  }
});


router.delete("/:idToDelete", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.idToDelete;
    const user = await Doctor.findByIdAndDelete(userId);

    if(!user){
      return res.status(404).send({
        message: "Doctor not found",
        success: false,
      });
    }

    res.status(200).send({
      message: "Doctor deleted successfully",
      success: true,
    });
    
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong", success: false, error });
  }
});

module.exports = router;
