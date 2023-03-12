const jwt = require('jsonwebtoken');

class Authorization {

    authorize(req, res, next){
        const token = req.headers["authorization"];
        if(!token){
            return res.status(401).send({
                message: "Login to continue"
            })
        } else {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if(decoded){
                    req.user = decoded.data;
                    next()
                } else {
                    return res.status(401).send({
                        message: "Login to continue"
                    })
                }
            } catch (err) {
                if(err.expiredAt && err.expiredAt < new Date()){
                    return res.status(401).send({
                        message: "Session expired"
                    })
                } else {
                    return res.status(400).send({
                        message: "Login to continue"
                    })
                }
            }
        }
    }
}

module.exports = new Authorization();