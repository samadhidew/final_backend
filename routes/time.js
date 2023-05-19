const router = require("express").Router();
const Time = require("../models/Time");

//REGISTER
router.post("/register", async (req, res) => {
  try {

    //create new device
    const newTime = new Time({
      sportCode:req.body.sportCode,
      date: req.body.date,
      timeslots: req.body.timeslots,
    });

    //save device and respond 
    const time = await newTime.save();
    res.status(200).json(time);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/gettime/:sportCode/:date", async (req, res) => {
  try {
    const time = await Time.find({ sportCode: req.params.sportCode , date: req.params.date});
    res.status(200).json(time);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:id/updatetime", async (req, res) => {
  try {
    const updatedTime = await Time.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          timeslots: req.body.timeslots
        },
      },
      { new: true }
    );

    res.status(200).send(updatedTime);
  } catch (err) {
    next(err);
  }
});

// router.get("/selections/:username", async (req, res) => {
//   try {
//     const selections = await Time.find({ timeslots: req.params.username });
//     res.status(200).json(selections);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


module.exports = router;
