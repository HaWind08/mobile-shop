const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer();

const controller = require("../../controllers/admin/account.controller");
const uploadCloud = require("../../middlewares/admin/upload.middleware");
const validate = require("../../validates/admin/account.validate");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", upload.single('avatar'), uploadCloud.upload, validate.creatPost, controller.createPost);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id", upload.single('avatar'), uploadCloud.upload, validate.editPatch, controller.editPatch);

router.get("/detail/:id", controller.detail);

router.delete("/delete/:id", controller.delete);

module.exports = router;