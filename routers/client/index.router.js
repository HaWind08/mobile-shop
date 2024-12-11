const homeRouter = require("./home.router");
const productRouter = require("./product.router");
const cartRouter = require("./cart.router");
const checkoutRouter = require("./checkout.router");
const searchRouter = require("./search.router");
const newsRouter = require("./news.router");
const eventsRouter = require("./events.router");
const userRouter = require("./user.router");

const cartMiddleware = require("../../middlewares/client/cart.middleware");
const userMiddleware = require("../../middlewares/client/user.middleware");

module.exports = (app) => {
    app.use(cartMiddleware.cartId);
    app.use(userMiddleware.infoUser);

    app.use("/", homeRouter);

    app.use("/products", productRouter);

    app.use("/cart", cartRouter);

    app.use("/checkout", checkoutRouter);

    app.use("/search", searchRouter);

    app.use("/news", newsRouter);

    app.use("/events", eventsRouter);

    app.use("/user", userRouter);

};