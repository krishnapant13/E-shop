const express = require("express");
const path = require("path");
const Shop = require("../model/shop");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utills/ErrorHandler");
const jwt = require("jsonwebtoken");
const sendMail = require("../utills/sendMail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const sendShopToken = require("../utills/shopToken");
const { isSeller } = require("../middleware/auth");

//creating activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};
// create user
router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;
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
      return next(new ErrorHandler("Seller already exists", 400));
    }
    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const seller = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      address: req.body.address,
      zipCode: req.body.zipCode,
      phoneNumber: req.body.phoneNumber,
      avatar: fileUrl,
    };
    const activation_token = createActivationToken(seller);

    const activationUrl = `http://localhost:3000/seller/activation/${activation_token}`;

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
// activate seller
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      // Verify the activation token and catch any errors
      let newSeller;
      try {
        newSeller = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
      } catch (err) {
        console.log("Token verification error:", err);
        return next(new ErrorHandler("Invalid token", 400));
      }
      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar, phoneNumber, zipCode, address } =
        newSeller;

      let seller = await Shop.findOne({ email });

      if (seller) {
        return next(new ErrorHandler("Seller already exists", 400));
      }
      seller = await Shop.create({
        name,
        email,
        avatar,
        password,
        phoneNumber,
        zipCode,
        address,
      });

      sendShopToken(seller, 201, res);
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//login seller
router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }
      const seller = await Shop.findOne({ email }).select("+password");
      if (!seller) {
        return next(new ErrorHandler("User dosen't exists", 400));
      }
      const isPasswordValid = await seller.comparePassword(password);
      if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid Data entered", 400));
      }
      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//load shop
router.get(
  "/getSeller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);
      if (!seller) {
        return next(new ErrorHandler("User dosen't exists", 400));
      }
      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//logout Shop
router.get(
  "seller/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(201).json({
        success: true,
        message: "Logout Successful",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
