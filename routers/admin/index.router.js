const systemConfig = require("../../config/system");
const authMiddleware = require("../../middlewares/admin/auth.middleware");

const dashboardRouter = require("./dashboard.router");
const productRouter = require("./product.router");
const accountRouter = require("./account.router");
const authRouter = require("./auth.router");


module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;

    app.use(PATH_ADMIN + "/dashboard", authMiddleware.requireAuth, dashboardRouter);

    app.use(PATH_ADMIN + "/products", authMiddleware.requireAuth, productRouter);

    app.use(PATH_ADMIN + "/accounts", authMiddleware.requireAuth, accountRouter);

    app.use(PATH_ADMIN + "/auth", authRouter);
}