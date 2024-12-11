const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/product.controller");

router.get('/', controller.index);

router.get('/detail/:slugProduct', controller.detail);

router.get('/category/Iphone', controller.categoryIphone);

router.get('/category/Samsung', controller.categorySamsung);

router.get('/category/Oppo', controller.categoryOppo);

router.get('/category/Xiaomi', controller.categoryXiaomi);

router.get('/category/Tecno', controller.categoryTecno);

router.get('/category/Realme', controller.categoryRealme);

module.exports = router;