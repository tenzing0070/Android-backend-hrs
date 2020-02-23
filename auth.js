const jwt = require('jsonwebtoken');
const User = require('./models/users');
module.exports.verifyUser = (req, res, next) => {
    console.log(req);
    if(req.path.match('/uploads/')){
        next();
    }
   
    let authHeader = req.headers.authorization;

    if(!authHeader)
    {
        let err = new Error("Bearer token is not set");
        res.setHeader("WWW-Authenticate", "Bearer")
        err.status=401;
        return next(err);
    }

    let token = authHeader.split(' ')[1];
    let data;
    console.log(data);

    try{
        data = jwt.verify(token, process.env.SECRET);
    }
    catch(err){
        throw new Error('Token could not be verified!');
    }
  

    User.findById(data._id)
        .then((user) => {
            req.user = user;
            next();
        })
}

