import express from 'express';
const router = express.Router();
import userController from '../controllers/users.controller.js';

router.get('/', (req, res) => {
    res.send("<h1>Bienvenue a mon api de users!</h1>");
});
// Routes pour les utilisateurs
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUser);
router.post('/users', userController.createUser);

export default router;