const authMiddleware = (req, res, next) => {
    if(req.session.login) {
        next();
    } else {
        res.status(409).send({message: "not logged"})
    }
}

module.exports = authMiddleware;
