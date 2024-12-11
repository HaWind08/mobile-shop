const Product = require("../../models/product.model");

const systemConfig = require("../../config/system");
const paginationHelper = require("../../helpers/admin/pagination");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };

    // Pagination
    const countProducts = await Product.countDocuments(find);

    let objectPagination = paginationHelper(
        {
            limitItems: 4,
            currentPage: 1
        },
        req.query,
        countProducts
    );
    // End Pagination

    const products = await Product.find(find)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);

    res.render("admin/pages/products/index.pug", {
        pageTitle: "Danh sách sản phẩm",
        currentPage: "product",
        products: products,
        pagination: objectPagination
    });
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create.pug", {
        pageTitle: "Tạo sản phẩm",
        currentPage: "product"
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

// [GET] /admin/products/detail/:productId
module.exports.detail = async (req, res) => {

}