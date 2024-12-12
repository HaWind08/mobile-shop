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

    if (req.body.position == "") {
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    };

    const product = new Product(req.body);
    await product.save();

    req.flash("success", "Tạo sản phẩm mới thành công!");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
}

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }

        const product = await Product.findOne(find);

        res.render("admin/pages/products/detail.pug", {
            pageTitle: "Chi tiết sản phẩm",
            product: product
        });
    } catch (error) {
        req.flash("error", "Không tìm thấy sản phẩm!")
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    };
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }

        const product = await Product.findOne(find);

        res.render("admin/pages/products/edit.pug", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product
        });
    } catch (error) {
        req.flash("error", "Không tìm thấy sản phẩm!")
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    };
}

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    try {
        await Product.updateOne({ _id: req.params.id }, {
            ...req.body
        });
        req.flash("success", "Cập nhật thành công!");
    } catch (error) {
        req.flash("error", "Cập nhật thất bại!");
    };

    res.redirect("back");
}