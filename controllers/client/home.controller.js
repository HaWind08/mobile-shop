const Product = require("../../models/product.model");

const productHelper = require("../../helpers/product");

// [GET] /
module.exports.index = async (req, res) => {
    // sản phẩm nổi bật
    const productFeatured = await Product.find({
        featured: "1",
        status: "active",
        deleted: false,
    }).limit(4);

    // sản phẩm mới
    const productNew = await Product.find({
        deleted: false,
        status: "active"
    }).sort({ position: "desc" }).limit(4);

    // sản phẩm hotsale
    const hotSale = await Product.find({
        deleted: false,
        status: "active"
    }).sort({ discountPercentage: "desc" }).limit(4);

    // iphone chính hãng
    const productIphone = await Product.find({
        deleted: false,
        status: "active",
        product_category_id: "Iphone"
    }).limit(4);

    // samsung chính hãng
    const productSamsung = await Product.find({
        deleted: false,
        status: "active",
        product_category_id: "Samsung"
    }).limit(4);

    const newProductFeatured = productHelper.priceNewProducts(productFeatured);
    const newProductNew = productHelper.priceNewProducts(productNew);
    const newHotSale = productHelper.priceNewProducts(hotSale);
    const newProductIphone = productHelper.priceNewProducts(productIphone);
    const newProductSamsung = productHelper.priceNewProducts(productSamsung);

    res.render("client/pages/home/index.pug", {
        pageTitle: "Team Nine Shop",
        productFeatured: newProductFeatured,
        productNew: newProductNew,
        hotSale: newHotSale,
        productIphone: newProductIphone,
        productSamsung: newProductSamsung
    });
}