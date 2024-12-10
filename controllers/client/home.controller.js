const Product = require("../../models/product.model");

const productHelper = require("../../helpers/product");

// [GET] /
module.exports.index = async (req, res) => {
    const productFeatured = await Product.find({
        featured: "1",
        status: "active",
        deleted: false,
    }).limit(4);

    const productNew = await Product.find({
        deleted: false,
        status: "active"
    }).sort({ position: "desc" }).limit(4);

    const hotSale = await Product.find({
        deleted: false,
        status: "active"
    }).sort({ discountPercentage: "desc" }).limit(4);

    const newProductFeatured = productHelper.priceNewProducts(productFeatured);
    const newProductNew = productHelper.priceNewProducts(productNew);
    const newHotSale = productHelper.priceNewProducts(hotSale);

    res.render("client/pages/home/index.pug", {
        pageTitle: "Team Nine Shop",
        productFeatured: newProductFeatured,
        productNew: newProductNew,
        hotSale: newHotSale
    });
}