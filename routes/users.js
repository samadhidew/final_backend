const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("You can update only your account!");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("You can delete only your account!");
  }
});

//get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Add a device
router.put("/:id/addDevice", async (req, res) => {
  //param id is device id
  if (req.params.id !== null) {
    try {
      const currentUser = await User.findById(req.params.id);

      const device = await User.findOne({ deviceCode: req.body.deviceCode });
      !device && res.status(500).json("device not found");

      const validPassword = await bcrypt.compare(
          req.body.password,
          device.password
      );
      !validPassword && res.status(500).json("wrong password");

      if (!currentUser.devices.includes(req.body.deviceCode )) {
        await currentUser.updateOne({ $push: { devices: req.body.deviceCode  } });
        res.status(200).json("device has been added");
      } else {
        res.status(500).json("you already have this device");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("no device id");
  }
});

//remove a device from user
router.put("/:id/removeDevice", async (req, res) => {
  if (req.params.id !== null) {
    try {
      const currentUser = await User.findById(req.body.userId);
      if (currentUser.devices.includes(req.params.id)) {
        await currentUser.updateOne({ $pull: { devices: req.params.id } });
        res.status(200).json("device has been removed");
      } else {
        res.status(500).json("you dont have this device");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("no device id");
  }
});

module.exports = router;

// get all users
