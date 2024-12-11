const Product = require("../../models/product.model");

const productHelper = require("../../helpers/product");

// [GET] /products
module.exports.index = async (req, res) => {
    let sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort.position = "asc";
    };

    const product = await Product.find({
        deleted: false,
        status: "active"
    }).sort(sort);

    const productFeatured = productHelper.priceNewProducts(product);

    res.render("client/pages/products/index.pug", {
        pageTitle: "Điện thoại",
        products: productFeatured
    });
}

// [GET] /products/detail/:slugProduct
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            slug: req.params.slugProduct,
            status: "active"
        };

        const product = await Product.findOne(find);

        product.priceNew = productHelper.priceNewProduct(product);

        res.render("client/pages/products/detail.pug", {
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        res.redirect("/products");
    };
};