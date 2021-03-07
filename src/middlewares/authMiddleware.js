import jwt from 'jsonwebtoken';

module.exports = (req,res,next) => {
    const token = req.header('x-access-token');

    if (!token) {
        return res.json({
            res: true,
            auth: false,
            data: 'No Token Provided'            
        })
    }

    const decoded = jwt.decode(token);

    if (!token) {
        return res.json({
            res: true,
            auth: false,
            data: 'The Token Provided Are Invalid'            
        })
    }

    req.user = decoded.id;
    next();
}