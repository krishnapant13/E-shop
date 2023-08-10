const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utills/ErrorHandler");
const Shop = require("../model/shop");
const { upload } = require("../multer");
const { isSeller } = require("../middleware/auth");
const fs = require("fs");

// create product
router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop id is invalid", 400));
      } else {
        const files = req.files;
        const imageURLs = files.map((file) => `${file.filename}`);
        const productData = req.body;
        productData.images = imageURLs;
        productData.shop = shop;
        const product = await Product.create(productData);
        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products of a shop
router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//delete product of a shop
router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;
      const productData = await Product.findById(productId);
      productData.images.forEach((imageURL) => {
        const filename = imageURL;
        const filePath = `uploads/${filename}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log("File not found", err);
            res.status(500).json({ message: "Error deleting file" });
          }
        });
      });
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
        return next(new ErrorHandler("Product Not Found with this ID!", 500));
      }
      res.status(201).json({
        success: true,
        message: "Product Deleted Successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;
