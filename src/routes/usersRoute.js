const express = require('express');
const userController = require('../controllers/userController');
const userRoute = express.Router();
const multer = require("multer");
const path = require('path');
const loginValidate = require('../middleware/loginValidatorMiddleware');
const guestMiddleware = require("../middleware/guestMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const userValidator = require("../middleware/UserValidatorMiddleware");
const userEditValidator = require("../middleware/UserEditValidatorMiddleware");
const userLoggedMiddleware = require('../middleware/userLoggedMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/img/users");
    },
    filename: (req, file, cb) => {
      const nameFile = `image_${Date.now()}${path.extname(file.originalname)}`;
      cb(null, nameFile);
    },
});
  
const uploadFile = multer({ storage: storage });

userRoute.get("/register",guestMiddleware, userController.register);

userRoute.get("/login", guestMiddleware, userController.login);

userRoute.post("/loginProcess", loginValidate, userController.loginProcess);

userRoute.get("/profile", authMiddleware, userController.profile);

userRoute.get("/logout", userController.logout);

userRoute.post("/register",userValidator,userController.save);

userRoute.get("/edit/:id",userLoggedMiddleware,userController.edit);

userRoute.post("/update", uploadFile.single("image"),userEditValidator,userController.update);

userRoute.post("/delete/:id", userController.delete);

module.exports = userRoute;