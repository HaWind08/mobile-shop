const Product = require("../../models/product.model");

const systemConfig = require("../../config/system");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Danh sách sản phẩm",
        current: "product"
    });
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create.pug", {
        pageTitle: "Tạo sản phẩm",
        current: "product"
    });
}

// [POST] /admin/products/createPost
module.exports.createPost = async (req, res) => {
    console.log(req.body);
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if(req.body.position == "") {
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    };

    const product = new Product(req.body);
    await product.save();

    res.redirect(`${systemConfig.prefixAdmin}/products`);
}