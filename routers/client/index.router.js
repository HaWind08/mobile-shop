const homeRouter = require("./home.router");
const productRouter = require("./product.router");
const cartRouter = require("./cart.router");
const checkoutRouter = require("./checkout.router");
const searchRouter = require("./search.router");
const newsRouter = require("./news.router");
const eventsRouter = require("./events.router");

const cartMiddleware = require("../../middlewares/client/cart.middleware");

module.exports = (app) => {
    app.use(cartMiddleware.cartId);

    app.use("/", homeRouter);

    app.use("/products", productRouter);

    app.use("/cart", cartRouter);

    app.use("/checkout", checkoutRouter);

    app.use("/search", searchRouter);

    app.use("/news", newsRouter);

    app.use("/events", eventsRouter);

};