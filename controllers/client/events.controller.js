
// [GET] /events
module.exports.index = (req, res) => {
    res.render("client/pages/events/index.pug", {
        pageTitle: "Sự kiện"
    });
}

// [GET] /events/detail/page-1
module.exports.detailOne = (req, res) => {
    res.render("client/pages/events/detailOne.pug", {
        pageTitle: "Sự kiện"
    });
}