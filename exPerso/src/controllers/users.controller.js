import userModel from '../models/users.model.js';

// Récupérer tous les utilisateurs
const getUsers = async (req, res) => {
    try {
      const users = await userModel.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Récupérer un utilisateur par son ID
  const getUser = async (req, res) => {
    try {
      const user = await userModel.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Créer un nouvel utilisateur
  const createUser = async (req, res) => {
    try {
      const { username, email } = req.body;
      const newUser = await userModel.createUser(username, email);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export default {
    getUsers,
    getUser,
    createUser,
  };