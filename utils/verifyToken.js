import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(new Error('You are not authenticated!'));
    }
    jwt.verify(token, process.env.Jwt, (err, user) => {
        if (err) {
            return next(new Error('Token is not Valid!'));
        }
        req.user = user;
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) {
            return next(err);
        }
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(new Error('You are not authorized!'));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) {
            return next(err);
        }
        if (req.user.isAdmin) {
            next();
        } else {
            return next(new Error('You are not authorized!'));
        }
    });
};
