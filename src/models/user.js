import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'L\'email est invalide'
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isStrongPassword(value),
      message: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'
    }
  },
  authTokens: [{
    authToken: {
      type: String,
      required: true
    }
  }]
});

// Supprimer les informations sensibles de l'utilisateur
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.authTokens;
  return user;
};

// Générer un token d'authentification et sauvegarder l'utilisateur
userSchema.methods.generateAuthTokenAndSaveUser = async function () {
  const authToken = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
  this.authTokens.push({ authToken });
  await this.save();
  return authToken;
};

// Trouver un utilisateur par son email et son mot de passe
userSchema.statics.findUser = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Informations de connexion invalides');
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Informations de connexion invalides');
  return user;
};

// Hash le mot de passe avant de le sauvegarder
userSchema.pre('save', async function () {
  if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 8);
});

const User = mongoose.model('User', userSchema);

export default User;