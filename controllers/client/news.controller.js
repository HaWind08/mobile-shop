
// [GET] /news
module.exports.index = (req, res) => {
    res.render("client/pages/news/index.pug", {
        pageTitle: "Tin tức"
    });
}

// [GET] /news/detail/page-1
module.exports.detailOne = (req, res) => {
    res.render("client/pages/news/detailOne.pug", {
        pageTitle: "Tin tức"
    });
}