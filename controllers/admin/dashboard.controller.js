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

    // product
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

    // order
    statistic.order.total = await Order.countDocuments({
        deleted: false
    });

    statistic.order.active = await Order.countDocuments({
        deleted: false,
        status: "active"
    });
    
    statistic.order.inactive = await Order.countDocuments({
        deleted: false,
        status: "inactive"
    });

    // popcorn
    statistic.accounts.total = await Account.countDocuments({
        deleted: false
    });

    statistic.accounts.active = await Account.countDocuments({
        deleted: false,
        status: "active"
    });
    
    statistic.accounts.inactive = await Account.countDocuments({
        deleted: false,
        status: "inactive"
    });

    // user
    statistic.user.total = await User.countDocuments({
        deleted: false
    });

    statistic.user.active = await User.countDocuments({
        deleted: false,
        status: "active"
    });
    
    statistic.user.inactive = await User.countDocuments({
        deleted: false,
        status: "inactive"
    });

    res.render("admin/pages/dashboard/index.pug", {
        pageTitle: "Trang tổng quan",
        currentPage: "dashboard",
        statistic: statistic
    });
};