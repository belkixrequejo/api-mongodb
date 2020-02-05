const router = require("express").Router();
// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser
} = require("../utils/Auth");

// Teacher Registeration Route
router.post("/register-teacher", async (req, res) => {
  await userRegister(req.body, "teacher", res);
});

//Student Registration Route
router.post("/register-student", async (req, res) => {
  await userRegister(req.body, "student", res);
});

// Super Admin Registration Route
router.post("/register-super-admin", async (req, res) => {
  await userRegister(req.body, "superadmin", res);
});

// Teacher Login Route
router.post("/login-teacher", async (req, res) => {
  await userLogin(req.body, "teacher", res);
});

// Student Login Route
router.post("/login-student", async (req, res) => {
  await userLogin(req.body, "student", res);
});

// Super Admin Login Route
router.post("/login-super-admin", async (req, res) => {
  await userLogin(req.body, "superadmin", res);
});

// Profile Route
router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});

// Users Protected Route
router.get(
  "/teacher-protectd",
  userAuth,
  checkRole(["teacher"]),
  async (req, res) => {
    return res.json("Hello teacher");
  }
);

// Admin Protected Route
router.get(
  "/student-protectd",
  userAuth,
  checkRole(["student"]),
  async (req, res) => {
    return res.json("Hello student");
  }
);

// Super Admin Protected Route
router.get(
  "/super-admin-protectd",
  userAuth,
  checkRole(["superadmin"]),
  async (req, res) => {
    return res.json("Hello Super Admin");
  }
);

// Super Admin Protected Route
router.get(
  "/super-admin-and-teacher-protectd",
  userAuth,
  checkRole(["superadmin", "teacher"]),
  async (req, res) => {
    return res.json("Super admin and teacher");
  }
);

module.exports = router;