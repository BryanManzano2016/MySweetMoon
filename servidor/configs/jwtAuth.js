const jwt = require('jsonwebtoken') 
const keySecret = "myKEY9999....myKEY9999...."
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.token; 
    if (authHeader) { 
        jwt.verify(authHeader, keySecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            } 
            req.user = user;
            next();
        });
        console.log("Auth");
    } else {
        console.log("NO Auth");
        res.sendStatus(401);
	} 
};

module.exports = {authenticateJWT, jwt, keySecret}