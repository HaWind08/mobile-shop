const Product = require("../../models/product.model");

const productHelper = require("../../helpers/client/product");

// [GET] /search 
module.exports.index = async (req, res) => {
    const keyword = req.query.keyword;

    let newProducts = [];
    if(keyword) {
        const regex = new RegExp(keyword, "i");
        const products = await Product.find({
            title: regex,
            deleted: false,
            status: "active"
        });

        newProducts = productHelper.priceNewProducts(products);
    };


    res.render("client/pages/search/index.pug", {
        pageTitle: "Kết quả tìm kiếm",
        keyword: keyword,
        products: newProducts
    });
}