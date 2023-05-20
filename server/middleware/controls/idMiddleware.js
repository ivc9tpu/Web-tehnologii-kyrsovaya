module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    if(req.params.id.length != 24) {
        return res.status(400).json({error:{message:'Неверный формат ID'}})
    }
    next()
}