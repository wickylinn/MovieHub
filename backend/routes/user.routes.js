const router = require("express").Router();
const auth = require("../middleware/auth.middleware.js");
const User = require("../models/user.js");

router.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

router.put("/profile", auth, async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    req.body,
    { new: true }
  ).select("-password");

  res.json(user);
});

module.exports = router;
