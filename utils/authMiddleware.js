const authMiddleware = (req, res, next) => {
    if(req.session.login) {
        next();
    } else {
        res.send({message: "not logged"})
    }
}

module.exports = authMiddleware;
