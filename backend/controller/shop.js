const express = require("express");
const path = require("path");
const Shop = require("../model/shop");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utills/ErrorHandler");
const jwt = require("jsonwebtoken");
const sendMail = require("../utills/sendMail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utills/jwtToken");
const fs = require("fs");

// create seller
router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber, address, zipCode } = req.body;
    const sellerEmail = await Shop.findOne({ email });

    if (sellerEmail) {
      const filename = req.file.filename;
      const filePath = `upload/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("File not found", err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("Shop already exists", 400));
    }
    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const seller = {
      name: name,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      address: address,
      zipCode: zipCode,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(seller);

    const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your shop",
        message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${seller.email} to activate your shop!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//creating activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.JWT_SECRET_KEY, {
    expiresIn: "5m",
  });
};

// activate seller
router.post(
  "/seller/activation",
  catchAsyncErrors(async (req, res, next) => {
    console.log("this is ", req.body);
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar, phoneNumber, address, zipCode } =
        newUser;
      alert(name, email, address, phoneNumber, zipCode);
      let seller = await Shop.findOne({ email });
      if (seller) {
        return next(new ErrorHandler("Seller already exists", 400));
      } else {
        seller = await Shop.create({
          name,
          email,
          avatar,
          password,
          phoneNumber,
          address,
          zipCode,
        });

        sendToken(seller, 201, res);
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//login seller
router.post(
  "/login-seller",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }
      const seller = await Shop.findOne({ email }).select("+password");
      if (!seller) {
        return next(new ErrorHandler("Seller dosen't exists", 400));
      }
      const isPasswordValid = await seller.comparePassword(password);
      if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid Data entered", 400));
      }
      sendToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
