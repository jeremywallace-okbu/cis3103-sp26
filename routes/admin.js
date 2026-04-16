const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/users", (req, res) => {
  if (!req.user.admin) {
    return res.status(403).json({ error: "Access denied" });
  }

  const users = db.prepare("SELECT id, username, admin, created_at FROM users").all();

  res.json({ users });
});

module.exports = router;
