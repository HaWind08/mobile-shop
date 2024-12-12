const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer();

const controller = require("../../controllers/admin/product.controller");
const uploadCloud = require("../../middlewares/admin/upload.middleware");
const validate = require("../../validates/admin/product.validate");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", upload.single('thumbnail'), uploadCloud.upload, validate.creatPost, controller.createPost);

router.get("/detail/:id", controller.detail);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id", upload.single('thumbnail'), uploadCloud.upload, validate.creatPost, controller.editPatch);

router.delete("/delete/:id", controller.delete);

module.exports = router;