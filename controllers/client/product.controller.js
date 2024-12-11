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

// [GET] /products/category/Iphone
module.exports.categoryIphone = async (req, res) => {
    const product = await Product.find({
        deleted: false,
        status: "active",
        product_category_id: "Iphone"
    });

    const productFeatured = productHelper.priceNewProducts(product);

    res.render("client/pages/products/categoryIphone.pug", {
        pageTitle: "Điện thoại Iphone",
        products: productFeatured
    });
}

// [GET] /products/category/Samsung
module.exports.categorySamsung = async (req, res) => {
    const product = await Product.find({
        deleted: false,
        status: "active",
        product_category_id: "Samsung"
    });

    const productFeatured = productHelper.priceNewProducts(product);

    res.render("client/pages/products/categorySamsung.pug", {
        pageTitle: "Điện thoại Samsung",
        products: productFeatured
    });
}

// [GET] /products/category/Oppo
module.exports.categoryOppo = async (req, res) => {
    const product = await Product.find({
        deleted: false,
        status: "active",
        product_category_id: "Oppo"
    });

    const productFeatured = productHelper.priceNewProducts(product);

    res.render("client/pages/products/categoryOppo.pug", {
        pageTitle: "Điện thoại Oppo",
        products: productFeatured
    });
}

// [GET] /products/category/Xiaomi
module.exports.categoryXiaomi = async (req, res) => {
    const product = await Product.find({
        deleted: false,
        status: "active",
        product_category_id: "Xiaomi"
    });

    const productFeatured = productHelper.priceNewProducts(product);

    res.render("client/pages/products/categoryXiaomi.pug", {
        pageTitle: "Điện thoại Xiaomi",
        products: productFeatured
    });
}

// [GET] /products/category/Tecno
module.exports.categoryTecno = async (req, res) => {
    const product = await Product.find({
        deleted: false,
        status: "active",
        product_category_id: "Tecno"
    });

    const productFeatured = productHelper.priceNewProducts(product);

    res.render("client/pages/products/categoryTecno.pug", {
        pageTitle: "Điện thoại Tecno",
        products: productFeatured
    });
}

// [GET] /products/category/Realme
module.exports.categoryRealme = async (req, res) => {
    const product = await Product.find({
        deleted: false,
        status: "active",
        product_category_id: "Realme"
    });

    const productFeatured = productHelper.priceNewProducts(product);

    res.render("client/pages/products/categoryRealme.pug", {
        pageTitle: "Điện thoại Realme",
        products: productFeatured
    });
}