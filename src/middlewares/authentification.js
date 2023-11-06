import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import 'dotenv/config';

const authentification = async (req, res, next) => {
    try {
        const authToken = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decodedToken._id, 'authTokens.authToken': authToken });

        if (!user) throw new Error();

        req.authToken = authToken;
        req.user = user;
        next();
    } catch (err) {
        res.status(401).send('Please authenticate.');
    }
};

export default authentification;