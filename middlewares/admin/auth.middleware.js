// Tạo router private
const Account = require("../../models/accounts.model");
const systemConfig = require("../../config/system");

module.exports.requireAuth = async (req, res, next) => {
    if (!req.cookies.token) {
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
        const user = await Account.findOne({ token: req.cookies.token }).select("-password"); // kiểm tra token 
        if (!user) {
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        } else {
            res.locals.user = user;
            next();
        };
    };
}