import User from '../models/user.js';

// Récupérer l'utilisateur connecté
async function getMe(req, res) {
    res.send(req.user);
}

// Récupérer tous les utilisateurs
async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(500).send(err);
    }
}

// Récupérer un utilisateur par son id
async function getUserById(req, res) {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).send('User not found');
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
}

// Créer un utilisateur
async function createUser(req, res) {
    const user = new User(req.body);
    try {
        const authToken = await user.generateAuthTokenAndSaveUser();
        res.status(201).send({ user, authToken });
    } catch (err) {
        res.status(400).send(err);
    }
}

// Mettre à jour un utilisateur
async function updateUser(req, res) {
    const updatedInfo = Object.keys(req.body);
    try {
        updatedInfo.forEach(update => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch (err) {
        res.status(500).send(err);
    }
}

// Supprimer un utilisateur
async function deleteUser(req, res) {
    try {
        await req.user.deleteOne();
        res.send(req.user);
    } catch (err) {
        res.status(500).send(err);
    }
}

export { getMe, createUser, updateUser, deleteUser };