const Product = require("../../models/product.model");
const Order = require("../../models/order.model");
const Account = require("../../models/accounts.model");
const User = require("../../models/user.model");

// [GET] /admin/dashboard
module.exports.dashboard = async (req, res) => {
    const statistic = {
        product: {
            total: 0,
            active: 0,
            inactive: 0
        },
        order: {
            total: 0,
            active: 0,
            inactive: 0
        },
        accounts: {
            total: 0,
            active: 0,
            inactive: 0
        },
        user: {
            total: 0,
            active: 0,
            inactive: 0
        },
    };

    // movie
    statistic.product.total = await Product.countDocuments({
        deleted: false
    });

    statistic.product.active = await Product.countDocuments({
        deleted: false,
        status: "active"
    });
    
    statistic.product.inactive = await Product.countDocuments({
        deleted: false,
        status: "inactive"
    });

    // // movie upcoming
    // statistic.movieUpcoming.total = await MovieUpcoming.countDocuments({
    //     deleted: false
    // });

    // statistic.movieUpcoming.active = await MovieUpcoming.countDocuments({
    //     deleted: false,
    //     status: "active"
    // });
    
    // statistic.movieUpcoming.inactive = await MovieUpcoming.countDocuments({
    //     deleted: false,
    //     status: "inactive"
    // });

    // // popcorn
    // statistic.popcorn.total = await Popcorn.countDocuments({
    //     deleted: false
    // });

    // statistic.popcorn.active = await Popcorn.countDocuments({
    //     deleted: false,
    //     status: "active"
    // });
    
    // statistic.popcorn.inactive = await Popcorn.countDocuments({
    //     deleted: false,
    //     status: "inactive"
    // });

    // // user
    // statistic.user.total = await User.countDocuments({
    //     deleted: false
    // });

    // statistic.user.active = await User.countDocuments({
    //     deleted: false,
    //     status: "active"
    // });
    
    // statistic.user.inactive = await User.countDocuments({
    //     deleted: false,
    //     status: "inactive"
    // });

    res.render("admin/pages/dashboard/index.pug", {
        pageTitle: "Trang tổng quan",
        currentPage: "dashboard",
        statistic: statistic
    });
};