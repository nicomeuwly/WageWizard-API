import express from 'express';
import User from '../models/user.js';
import authentification from '../middlewares/authentification.js';

const router = express.Router();

// Se connecter
router.post('/login', async function (req, res) {
  try {
    const user = await User.findUser(req.body.email, req.body.password);
    const authToken = await user.generateAuthTokenAndSaveUser();
    res.send({ user, authToken });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Se déconnecter
router.post('/logout', authentification, async function (req, res) {
  try {
    req.user.authTokens = req.user.authTokens.filter((authToken) => {
      return authToken.authToken !== req.authToken;
    });

    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
});

// Se déconnecter de tous les appareils
router.post('/logout/all', authentification, async function (req, res) {
  try {
    req.user.authTokens = [];
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
});

// Récupérer tous les utilisateurs
router.get('/', authentification, async function (req, res) {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Récupérer l'utilisateur connecté
router.get('/me', authentification, async function (req, res) {
  res.send(req.user);
});

// Créer un utilisateur
router.post('/', async function (req, res, next) {
  const user = new User(req.body);
  try {
    const authToken = await user.generateAuthTokenAndSaveUser();
    res.status(201).send({ user, authToken });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Récupérer un utilisateur par son id
router.get('/:id', async function (req, res, next) {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).send('User not found');
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Mettre à jour un utilisateur
router.patch('/me', authentification, async function (req, res, next) {
  const updatedInfo = Object.keys(req.body);
  try {
    updatedInfo.forEach(update => req.user[update] = req.body[update]);
    await req.user.save();
    res.send(req.user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Supprimer un utilisateur
router.delete('/me', authentification, async function (req, res) {
  try {
    await req.user.deleteOne();
    res.send(req.user);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;