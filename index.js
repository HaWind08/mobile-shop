const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require('method-override');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
const moment = require("moment");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

// router
const router = require("./routers/client/index.router");
const routerAdmin = require("./routers/admin/index.router");

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));

// use express flash
app.use(cookieParser("FSDFEWRTRWT"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// db
const database = require("./config/database");
database.connect();

// pug
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// public
app.use(express.static(`${__dirname}/public`));

// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// system config
const systemConfig = require("./config/system");
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

// Call router
router(app);
routerAdmin(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});