const authMiddleware = (req, res, next) => {
    if(req.session.login) {
        next();
    } else {
        res.send({login: "not logged"})
    }
}

module.exports = authMiddleware;
