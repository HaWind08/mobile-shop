const md5 = require("md5");
const User = require("../../models/user.model");
const Account = require("../../models/accounts.model");

const systemConfig = require("../../config/system");

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
    const accountsUser = await User.find({
        deleted: false,
    }).select("-password -tokenUser");

    const accountsAdmin = await Account.find({
        deleted: false,
    }).select("-password -tokenUser");

    res.render("admin/pages/accounts/index.pug", {
        pageTitle: "Quản lý tài khoản",
        currentPage: "account",
        accountsUser: accountsUser,
        accountsAdmin: accountsAdmin
    });
}

// [GET] /admin/accounts/create 
module.exports.create = async (req, res) => {
    res.render("admin/pages/accounts/create.pug", {
        pageTitle: "Tạo tài khoản",
        currentPage: "account",
    });
};

// [POST] /admin/accounts/createPost 
module.exports.createPost = async (req, res) => {
    const emailExist = await Account.findOne({
        email: req.body.email,
        deleted: false
    });

    if (emailExist) {
        req.flash("success", `Email ${req.body.email} đã tồn tại!`);
        res.redirect("back");
    } else {
        req.body.password = md5(req.body.password);

        const record = new Account(req.body);
        await record.save();

        req.flash("success", "Tạo tài khoản thành công!");
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    };
};

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
    const find = {
        _id: req.params.id,
        deleted: false
    };

    try {
        const data = await Account.findOne(find);
       
        res.render("admin/pages/accounts/edit.pug", {
            pageTitle: "Chỉnh sửa tài khoản",
            currentPage: "account",
            data: data,
        });

    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    };
};

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    const emailExist = await Account.findOne({
        _id: { $ne: id }, //tìm tất cả bản ghi ngoại trừ id này
        email: req.body.email,
        deleted: false
    });

    if (emailExist) {
        req.flash("error", `Email ${req.body.email} đã tồn tại`);
    } else {
        if (req.body.password) { //nếu muốn cập nhật mật khẩu
            req.body.password = md5(req.body.password);
        } else { //nếu không thay đổi mật khẩu
            delete req.body.password;
        };

        await Account.updateOne({ _id: id }, req.body);
        req.flash("success", "Cập nhật tài khoản thành công!");
    };

    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
};

// [GET] /admin/accounts/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }

        const data = await Account.findOne(find);

        res.render("admin/pages/accounts/detail.pug", {
            pageTitle: "Chi tiết tài khoảnkhoản",
            currentPage: "account",
            data: data
        });
    } catch (error) {
        req.flash("error", "Không tìm thấy tài khoản!")
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    };
}

// [DELTE] /admin/accounts/delete/:id
module.exports.delete = async (req, res) => {
    const id = req.params.id;
    await Account.updateOne({ _id: id }, {
        deleted: true,
    });

    await User.updateOne({_id: id}, {
        deleted: true
    });

    req.flash("success", `Đã xóa thành công tài khoản!`);
    res.redirect("back");
};