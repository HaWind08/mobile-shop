const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/events.controller");

router.get('/', controller.index);

router.get('/detail/page-1', controller.detailOne);


module.exports = router;