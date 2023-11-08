import User from '../models/user.js';

// Se connecter avec un utilisateur
async function login(req, res) {
    try {
        const user = await User.findUser(req.body.email, req.body.password);
        const authToken = await user.generateAuthTokenAndSaveUser();
        res.send({ user, authToken });
    } catch (err) {
        res.status(400).send(err);
    }
}

// Se déconnecter avec un utilisateur
async function logout(req, res) {
    try {
        req.user.authTokens = req.user.authTokens.filter((authToken) => {
            return authToken.authToken !== req.authToken;
        });

        await req.user.save();
        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
}

// Se déconnecter de tous les appareils avec un utilisateur
async function logoutAll(req, res) {
    try {
        req.user.authTokens = [];
        await req.user.save();
        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
}

export { login, logout, logoutAll };